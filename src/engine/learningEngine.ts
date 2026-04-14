// ─────────────────────────────────────────────────────────────
// Learning Engine — main orchestrator
//
// Responsibilities: placement, scaffolding, mastery, progression.
// Motivation (points, streaks, badges) is handled by a separate layer.
// ─────────────────────────────────────────────────────────────

import {
  ScaffoldLevel,
  LearnerState,
  LevelProgress,
  StageProgress,
  WordPresentation,
  AttemptResult,
  PlacementItem,
  PlacementResult,
} from './types';

import { spellingData, SpellingWord } from '../utils/spellingData';
import { generateScaffold, stepUp, stepDown, SCAFFOLD_POINTS } from './scaffolding';
import {
  getMasteryThreshold,
  isNearMastery,
  computeLevelSummary,
  emptyStageProgress,
  emptyLevelProgress,
} from './mastery';
import { PlacementEngine } from './placement';

// ─────────────────────────────────────────────────────────────

const TOTAL_STAGES = 10;

// ── Word queue helpers ────────────────────────────────────────

/**
 * Shuffles an array in place using Fisher-Yates.
 */
function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Builds a word queue for a stage quiz.
 * If the stage has fewer words than the required quiz length, words are
 * repeated (shuffled) until the queue is long enough.
 */
function buildWordQueue(level: number, stage: number, quizLength: number): SpellingWord[] {
  const stageWords = spellingData[level]?.[stage] ?? [];
  if (stageWords.length === 0) return [];

  const queue: SpellingWord[] = [];
  while (queue.length < quizLength) {
    queue.push(...shuffle([...stageWords]));
  }
  return queue.slice(0, quizLength);
}

/**
 * Selects a bonus near-mastery verification word.
 * Targets the same pattern as the word that was answered incorrectly,
 * chosen from other stages/levels that share that pattern.
 * Falls back to a different word from the same stage if no match found.
 */
function selectNearMasteryWord(
  incorrectWord: SpellingWord,
  level: number,
  stage: number
): SpellingWord {
  const targetPattern = incorrectWord.pattern;
  const candidates: SpellingWord[] = [];

  for (const [lvlStr, stages] of Object.entries(spellingData)) {
    for (const [stgStr, words] of Object.entries(stages)) {
      // Don't pick from the exact same stage
      if (parseInt(lvlStr, 10) === level && parseInt(stgStr, 10) === stage) continue;
      for (const w of words) {
        if (w.pattern === targetPattern && w.word !== incorrectWord.word) {
          candidates.push(w);
        }
      }
    }
  }

  if (candidates.length > 0) {
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  // Fallback: a different word from the same stage
  const stageWords = spellingData[level]?.[stage] ?? [];
  const fallback = stageWords.find(w => w.word !== incorrectWord.word);
  return fallback ?? incorrectWord;
}

// ─────────────────────────────────────────────────────────────
// LearningEngine
// ─────────────────────────────────────────────────────────────

export class LearningEngine {
  private state: LearnerState;
  private placementEngine: PlacementEngine | null = null;

  // Current quiz state (active word queue for the current stage)
  private wordQueue: SpellingWord[] = [];
  private wordIndex: number = 0;
  private lastIncorrectWord: SpellingWord | null = null;
  private nearMasteryWord: SpellingWord | null = null;
  private inNearMasteryItem: boolean = false;

  constructor(username: string, savedState?: LearnerState) {
    this.state = savedState ?? this.initialState(username);
    this.loadWordQueue();
  }

  // ── Public API: state ─────────────────────────────────────

  getState(): Readonly<LearnerState> {
    return this.state;
  }

  // ── Public API: placement ─────────────────────────────────

  /**
   * Returns true if the learner has not yet completed placement
   * and has not skipped it.
   */
  needsPlacement(): boolean {
    return !this.state.placementDone;
  }

  /**
   * Starts the adaptive placement sequence.
   * Returns the first placement item.
   */
  startPlacement(): PlacementItem {
    this.placementEngine = new PlacementEngine();
    this.state = { ...this.state, inPlacement: true };
    return this.placementEngine.start();
  }

  /**
   * Submits an answer during placement.
   * When done, applies the recommendation to the learner state.
   */
  submitPlacementAttempt(input: string): PlacementResult {
    if (!this.placementEngine) throw new Error('Placement not started');

    const result = this.placementEngine.submit(input);

    if (result.done && result.recommendation) {
      const { level, scaffold } = result.recommendation;
      this.state = {
        ...this.state,
        inPlacement: false,
        placementDone: true,
        placementRecommendation: result.recommendation,
        currentLevel: level,
        currentStage: 1,
        currentScaffold: scaffold,
      };
      this.ensureLevelExists(level);
      this.loadWordQueue();
    }

    return result;
  }

  /**
   * Skips placement. Learner starts at Level 1, S0.
   */
  skipPlacement(): void {
    this.state = {
      ...this.state,
      inPlacement: false,
      placementDone: true,
      placementRecommendation: null,
      currentLevel: 1,
      currentStage: 1,
      currentScaffold: 0,
    };
    this.ensureLevelExists(1);
    this.loadWordQueue();
  }

  // ── Public API: normal learning ───────────────────────────

  /**
   * Returns the current word presentation for the UI to render.
   */
  getCurrentWord(): WordPresentation {
    const word = this.inNearMasteryItem && this.nearMasteryWord
      ? this.nearMasteryWord
      : this.wordQueue[this.wordIndex];

    const scaffold = this.state.currentScaffold;

    return {
      word: word.word,
      display: generateScaffold(word.word, scaffold),
      scaffoldLevel: scaffold,
      pointValue: SCAFFOLD_POINTS[scaffold],
      pattern: word.pattern,
      patternType: word.patternType,
      isNearMasteryItem: this.inNearMasteryItem,
    };
  }

  /**
   * Submits a spelling attempt for the current word.
   * Returns a full AttemptResult describing what happened and what changed.
   */
  submitAttempt(input: string): AttemptResult {
    const { currentLevel: level, currentStage: stage, currentScaffold: scaffold } = this.state;
    const targetWord = this.inNearMasteryItem && this.nearMasteryWord
      ? this.nearMasteryWord
      : this.wordQueue[this.wordIndex];

    const isCorrect = input.trim().toLowerCase() === targetWord.word.toLowerCase();
    const pointsEarned = isCorrect ? SCAFFOLD_POINTS[scaffold] : 0;

    // Scaffold adapts after every response
    const newScaffold: ScaffoldLevel = isCorrect ? stepUp(scaffold) : stepDown(scaffold);

    // ── Handle near-mastery verification item ──────────────
    if (this.inNearMasteryItem) {
      return this.resolveNearMasteryAttempt(isCorrect, pointsEarned, newScaffold, targetWord);
    }

    // ── Normal attempt ─────────────────────────────────────
    const stageProgress = this.getOrCreateStageProgress(level, stage);

    stageProgress.attempts++;
    if (isCorrect) {
      stageProgress.correct++;
      if (scaffold > stageProgress.bestScaffold) {
        stageProgress.bestScaffold = scaffold;
      }
    } else {
      this.lastIncorrectWord = targetWord;
    }

    this.updateStageProgress(level, stage, stageProgress);
    this.state = { ...this.state, currentScaffold: newScaffold };

    // Advance word index
    this.wordIndex++;

    const threshold = getMasteryThreshold(level);
    const quizComplete = stageProgress.attempts >= threshold.quizLength;

    let stagePassed = false;
    let stageComplete = false;
    let nearMasteryTriggered = false;
    let levelPreviewUnlocked = false;
    let levelComplete = false;

    if (quizComplete) {
      stagePassed = stageProgress.correct >= threshold.requiredCorrect;

      // Check near-mastery (L6-8 only)
      if (isNearMastery(stageProgress, level)) {
        nearMasteryTriggered = true;
        stageProgress.nearMasteryTriggered = true;
        // Select bonus word targeting the same pattern as the error
        const errorWord = this.lastIncorrectWord ?? targetWord;
        this.nearMasteryWord = selectNearMasteryWord(errorWord, level, stage);
        // Bonus item is attempted at best prior scaffold (not harder)
        this.state = { ...this.state, currentScaffold: stageProgress.bestScaffold };
        this.inNearMasteryItem = true;
        this.updateStageProgress(level, stage, stageProgress);
      } else if (stagePassed) {
        // Immediate pass (10/10 or threshold without near-mastery rule)
        stageProgress.complete = true;
        this.updateStageProgress(level, stage, stageProgress);
        stageComplete = true;
        const unlock = this.advanceStage(level, stage);
        levelPreviewUnlocked = unlock.levelPreviewUnlocked;
        levelComplete = unlock.levelComplete;
      }
      // If quiz complete but not passed and not near-mastery: stage fails,
      // reset quiz (no progress reset — attempts tracked but stage not complete).
      if (!stagePassed && !nearMasteryTriggered) {
        this.resetQuiz(level, stage);
      }
    }

    return {
      isCorrect,
      pointsEarned,
      correctWord: targetWord.word,
      newScaffold,
      quizComplete,
      stagePassed,
      stageComplete,
      nearMasteryTriggered,
      levelPreviewUnlocked,
      levelComplete,
    };
  }

  /**
   * Navigates to a specific level/stage (e.g. from the dashboard).
   * Only allowed if the level is unlocked (preview or complete).
   */
  navigateTo(level: number, stage: number): void {
    const levelProg = this.state.levels[level];
    if (!levelProg?.preview && level !== 1) return; // not unlocked

    this.state = {
      ...this.state,
      currentLevel: level,
      currentStage: stage,
      currentScaffold: 0, // restart scaffold for new content
    };
    this.resetQuiz(level, stage);
  }

  // ── Private: state management ─────────────────────────────

  private initialState(username: string): LearnerState {
    const state: LearnerState = {
      username,
      currentLevel: 1,
      currentStage: 1,
      currentScaffold: 0,
      inPlacement: false,
      placementDone: false,
      placementRecommendation: null,
      levels: {},
    };
    return state;
  }

  private ensureLevelExists(level: number): void {
    if (!this.state.levels[level]) {
      this.state = {
        ...this.state,
        levels: { ...this.state.levels, [level]: emptyLevelProgress() },
      };
    }
  }

  private getOrCreateStageProgress(level: number, stage: number): StageProgress {
    this.ensureLevelExists(level);
    const levelProg = this.state.levels[level];
    return levelProg.stages[stage] ?? emptyStageProgress();
  }

  private updateStageProgress(level: number, stage: number, progress: StageProgress): void {
    const levelProg = this.state.levels[level];
    const updatedStages = { ...levelProg.stages, [stage]: progress };
    const summary = computeLevelSummary(updatedStages, level);
    const updatedLevel: LevelProgress = {
      stages: updatedStages,
      ...summary,
    };
    this.state = {
      ...this.state,
      levels: { ...this.state.levels, [level]: updatedLevel },
    };
  }

  private loadWordQueue(): void {
    const { currentLevel: level, currentStage: stage } = this.state;
    const threshold = getMasteryThreshold(level);
    this.wordQueue = buildWordQueue(level, stage, threshold.quizLength);
    this.wordIndex = 0;
    this.inNearMasteryItem = false;
    this.nearMasteryWord = null;
    this.lastIncorrectWord = null;
  }

  private resetQuiz(level: number, stage: number): void {
    const threshold = getMasteryThreshold(level);
    this.wordQueue = buildWordQueue(level, stage, threshold.quizLength);
    this.wordIndex = 0;
    this.inNearMasteryItem = false;
    this.nearMasteryWord = null;
    this.lastIncorrectWord = null;

    // Reset the in-progress attempt counters but preserve `complete` and best scaffold
    const existing = this.getOrCreateStageProgress(level, stage);
    const fresh = emptyStageProgress();
    fresh.bestScaffold = existing.bestScaffold; // carry over best scaffold
    this.updateStageProgress(level, stage, fresh);
  }

  /**
   * Advances to the next stage (or wraps level).
   * Returns flags for UI notification.
   */
  private advanceStage(
    level: number,
    stage: number
  ): { levelPreviewUnlocked: boolean; levelComplete: boolean } {
    let levelPreviewUnlocked = false;
    let levelComplete = false;

    const levelProg = this.state.levels[level];

    // Check if the next level was just unlocked for preview
    const wasPreview = levelProg.preview;
    const isNowPreview = levelProg.stagesComplete >= 5;
    if (!wasPreview && isNowPreview) {
      levelPreviewUnlocked = true;
      // Ensure next level record exists
      this.ensureLevelExists(level + 1);
      const nextLevel = this.state.levels[level + 1];
      if (nextLevel && !nextLevel.preview) {
        this.state = {
          ...this.state,
          levels: {
            ...this.state.levels,
            [level + 1]: { ...nextLevel, preview: true },
          },
        };
      }
    }

    levelComplete = levelProg.complete;

    // Advance to next stage
    if (stage < TOTAL_STAGES) {
      const nextStage = stage + 1;
      this.state = { ...this.state, currentStage: nextStage, currentScaffold: 0 };
      this.loadWordQueue();
    } else if (!levelComplete) {
      // All stages done — level just completed
      levelComplete = true;
    }

    return { levelPreviewUnlocked, levelComplete };
  }

  /**
   * Handles the result of the near-mastery bonus verification item.
   */
  private resolveNearMasteryAttempt(
    isCorrect: boolean,
    pointsEarned: number,
    newScaffold: ScaffoldLevel,
    targetWord: SpellingWord
  ): AttemptResult {
    const { currentLevel: level, currentStage: stage } = this.state;
    const stageProgress = this.getOrCreateStageProgress(level, stage);

    stageProgress.nearMasteryPassed = isCorrect;
    this.updateStageProgress(level, stage, stageProgress);
    this.inNearMasteryItem = false;
    this.nearMasteryWord = null;

    let stageComplete = false;
    let levelPreviewUnlocked = false;
    let levelComplete = false;

    if (isCorrect) {
      stageProgress.complete = true;
      this.updateStageProgress(level, stage, stageProgress);
      stageComplete = true;
      const unlock = this.advanceStage(level, stage);
      levelPreviewUnlocked = unlock.levelPreviewUnlocked;
      levelComplete = unlock.levelComplete;
    } else {
      // Bonus failed → stage not complete; reset for retry
      this.resetQuiz(level, stage);
    }

    this.state = { ...this.state, currentScaffold: newScaffold };

    return {
      isCorrect,
      pointsEarned,
      correctWord: targetWord.word,
      newScaffold,
      quizComplete: true,
      stagePassed: isCorrect,
      stageComplete,
      nearMasteryTriggered: false,
      levelPreviewUnlocked,
      levelComplete,
    };
  }
}
