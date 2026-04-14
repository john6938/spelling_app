// ─────────────────────────────────────────────────────────────
// Spelling Stars — App entry point
// Wires the learning engine, motivation system, and recognition
// system together and drives screen transitions.
// ─────────────────────────────────────────────────────────────

import { LearningEngine } from './engine/learningEngine';
import { MotivationSystem } from './motivation/motivationSystem';
import { RecognitionSystem, countCompleteLevels } from './recognition/recognitionSystem';
import { getMasteryThreshold } from './engine/mastery';

import {
  hasConsent, setConsent, saveSession, loadSession, getSavedUsername,
} from './persistence/localStorage';

import {
  renderLogin,
  renderDashboard,
  renderPlacement,
  renderPlacementFeedback,
  renderPlacementResult,
  renderQuiz,
  showQuizFeedback,
  showHomophoneFeedback,
  renderStageComplete,
  showBonusResult,
  renderLevelComplete,
} from './ui/screens';

// ─────────────────────────────────────────────────────────────
// App state
// ─────────────────────────────────────────────────────────────

let engine:     LearningEngine;
let motivation: MotivationSystem;
let recognition: RecognitionSystem;

// Transient quiz state (not persisted — rebuilt on each stage)
let quizCorrect = 0;
let pendingStageResult: {
  passed: boolean;
  levelComplete: boolean;
  newBadges: Array<{ type: string }>;
} | null = null;

// ─────────────────────────────────────────────────────────────
// Persistence helpers
// ─────────────────────────────────────────────────────────────

function persist(): void {
  saveSession({
    learner:     engine.getState() as ReturnType<typeof engine.getState>,
    motivation:  motivation.serialise(),
    recognition: recognition.serialise(),
  });
}

// ─────────────────────────────────────────────────────────────
// Screen: Login
// ─────────────────────────────────────────────────────────────

function showLogin(): void {
  const savedName = hasConsent() ? (getSavedUsername() ?? null) : null;

  renderLogin(savedName, {
    onLogin(username, saveProgress) {
      setConsent(saveProgress);

      const saved = saveProgress ? loadSession() : null;

      if (saved && saved.learner.username === username) {
        // Restore saved session
        engine      = new LearningEngine(username, saved.learner);
        motivation  = MotivationSystem.deserialise(saved.motivation);
        recognition = RecognitionSystem.deserialise(saved.recognition);
      } else {
        // Fresh start
        engine      = new LearningEngine(username);
        motivation  = new MotivationSystem();
        recognition = new RecognitionSystem();
      }

      showDashboard();
    },
  });
}

// ─────────────────────────────────────────────────────────────
// Screen: Dashboard
// ─────────────────────────────────────────────────────────────

function showDashboard(): void {
  const state = engine.getState();
  const mstate = motivation.getState();
  const rstate = recognition.getState();

  renderDashboard(
    {
      username:               state.username,
      totalPoints:            mstate.totalPoints,
      badges:                 rstate.badges,
      levels:                 state.levels,
      placementDone:          state.placementDone,
      placementRecommendation: state.placementRecommendation,
    },
    {
      onStartPlacement: startPlacement,
      onGoToLevel(level) {
        engine.navigateTo(level, 1);
        quizCorrect = 0;
        showQuiz();
      },
    }
  );
}

// ─────────────────────────────────────────────────────────────
// Placement
// ─────────────────────────────────────────────────────────────

function startPlacement(): void {
  const firstItem = engine.startPlacement();
  renderPlacementScreen(firstItem);
}

function renderPlacementScreen(item: Parameters<typeof renderPlacement>[0]): void {
  renderPlacement(item, {
    onAnswer(input) {
      const result = engine.submitPlacementAttempt(input);

      renderPlacementFeedback(result.isCorrect, result.correctWord, () => {
        if (result.done && result.recommendation) {
          persist();
          renderPlacementResult(result.recommendation, {
            onAccept:       showQuiz,
            onStartAtLevel1() {
              engine.navigateTo(1, 1);
              quizCorrect = 0;
              showQuiz();
            },
          });
        } else if (result.nextItem) {
          renderPlacementScreen(result.nextItem);
        }
      });
    },
    onSkip() {
      engine.skipPlacement();
      quizCorrect = 0;
      persist();
      showQuiz();
    },
  });
}

// ─────────────────────────────────────────────────────────────
// Screen: Quiz
// ─────────────────────────────────────────────────────────────

function showQuiz(): void {
  const state  = engine.getState();
  const mstate = motivation.getState();
  const word   = engine.getCurrentWord();
  const threshold = getMasteryThreshold(state.currentLevel);

  // quizCorrect is local to the current stage run
  const stageProgress = state.levels[state.currentLevel]?.stages[state.currentStage];
  const attemptsThisRun = stageProgress?.attempts ?? 0;

  renderQuiz(
    {
      level:              state.currentLevel,
      stage:              state.currentStage,
      scaffoldLevel:      word.scaffoldLevel,
      display:            word.display,
      word:               word.word,
      pointValue:         word.pointValue,
      totalPoints:        mstate.totalPoints,
      currentStreak:      mstate.currentStreak,
      quizCorrect:        stageProgress?.correct ?? 0,
      quizTotal:          attemptsThisRun,
      quizLength:         threshold.quizLength,
      isNearMasteryItem:  word.isNearMasteryItem,
    },
    {
      onAnswer(input) {
        const result = engine.submitAttempt(input);

        // Homophone: valid alternative spelling — praise and redirect, don't advance
        if (result.isHomophoneAttempt) {
          showHomophoneFeedback(result.correctWord, showQuiz);
          return;
        }

        const motResult = motivation.recordAttempt(result.isCorrect, result.pointsEarned);

        if (result.isCorrect) quizCorrect++;

        // Check for new badges
        const lvlComplete = countCompleteLevels(engine.getState().levels);
        const newBadges   = recognition.checkMilestone(
          result,
          engine.getState().currentLevel,
          engine.getState().currentStage,
          lvlComplete
        );

        persist();

        showQuizFeedback(result.isCorrect, motResult.pointsEarned, result.correctWord, () => {
          if (result.stageComplete || result.quizComplete) {
            if (result.stageComplete) {
              motivation.onStageComplete();
              persist();
            }

            if (result.levelComplete) {
              pendingStageResult = {
                passed: result.stagePassed,
                levelComplete: true,
                newBadges,
              };
            } else {
              pendingStageResult = {
                passed: result.stagePassed,
                levelComplete: false,
                newBadges,
              };
            }

            const mst = motivation.getState();
            renderStageComplete(
              {
                level:          engine.getState().currentLevel,
                stage:          engine.getState().currentStage,
                passed:         result.stagePassed,
                totalPoints:    mst.totalPoints,
                bonusAvailable: mst.bonusAvailable,
                newBadges,
              },
              {
                onClaimBonus() {
                  const bonus = motivation.claimBonus();
                  if (bonus) {
                    persist();
                    showBonusResult(bonus.amount, bonus.newTotal);
                  }
                },
                onContinue() {
                  quizCorrect = 0;
                  if (pendingStageResult?.levelComplete) {
                    const lvl = engine.getState().currentLevel;
                    const pts = motivation.getState().totalPoints;
                    renderLevelComplete(lvl, pts, {
                      onContinue: showDashboard,
                    });
                  } else {
                    showQuiz();
                  }
                },
              }
            );
          } else {
            // Quiz still in progress — next word
            showQuiz();
          }
        });
      },
    }
  );
}

// ─────────────────────────────────────────────────────────────
// Boot
// ─────────────────────────────────────────────────────────────

showLogin();
