// ─────────────────────────────────────────────────────────────
// Mastery and progression logic
// Determines quiz lengths, pass thresholds, and level unlock rules.
// ─────────────────────────────────────────────────────────────

import { MasteryThreshold, StageProgress, LevelProgress } from './types';

const TOTAL_STAGES = 10;
const PREVIEW_THRESHOLD = 5;  // stages needed to unlock next level for exploration

/**
 * Returns the mastery requirements for a given lexical level.
 * Decided:
 *   L1-2  → 5 words, 3 correct
 *   L3-5  → 10 words, 8 correct
 *   L6-8  → 10 words, 9 correct + bonus verification item at exactly 9/10
 */
export function getMasteryThreshold(level: number): MasteryThreshold {
  if (level <= 2) {
    return { quizLength: 5, requiredCorrect: 3, nearMasteryAt: null };
  }
  if (level <= 5) {
    return { quizLength: 10, requiredCorrect: 8, nearMasteryAt: null };
  }
  // L6-8
  return { quizLength: 10, requiredCorrect: 9, nearMasteryAt: 9 };
}

/**
 * A stage is definitively complete when:
 * - It has been marked complete (met or exceeded threshold), AND
 * - For L6-8: the near-mastery verification item has been passed.
 */
export function isStageComplete(progress: StageProgress, level: number): boolean {
  if (!progress.complete) return false;
  const threshold = getMasteryThreshold(level);
  if (threshold.nearMasteryAt !== null) {
    // L6-8: bonus verification must have been passed
    return progress.nearMasteryPassed === true;
  }
  return true;
}

/**
 * Near-mastery is triggered when the learner has answered exactly
 * `nearMasteryAt` correct out of `quizLength` attempts, before
 * the bonus item has been triggered.
 * Only applies to L6-8.
 */
export function isNearMastery(progress: StageProgress, level: number): boolean {
  const threshold = getMasteryThreshold(level);
  if (threshold.nearMasteryAt === null) return false;
  return (
    progress.attempts >= threshold.quizLength &&
    progress.correct === threshold.nearMasteryAt &&
    !progress.nearMasteryTriggered
  );
}

/**
 * Derives aggregate level progress from individual stage records.
 * Returns the number of complete stages, and whether preview / full
 * completion thresholds have been reached.
 */
export function computeLevelSummary(
  stages: Record<number, StageProgress>,
  level: number
): Pick<LevelProgress, 'stagesComplete' | 'preview' | 'complete'> {
  let stagesComplete = 0;
  for (const progress of Object.values(stages)) {
    if (isStageComplete(progress, level)) stagesComplete++;
  }
  return {
    stagesComplete,
    preview: stagesComplete >= PREVIEW_THRESHOLD,
    complete: stagesComplete >= TOTAL_STAGES,
  };
}

/**
 * Returns a fresh StageProgress object for a stage that has not yet been started.
 */
export function emptyStageProgress(): StageProgress {
  return {
    attempts: 0,
    correct: 0,
    bestScaffold: 0,
    complete: false,
    nearMasteryTriggered: false,
    nearMasteryPassed: null,
  };
}

/**
 * Returns a fresh LevelProgress object.
 */
export function emptyLevelProgress(): LevelProgress {
  return {
    stages: {},
    stagesComplete: 0,
    preview: false,
    complete: false,
  };
}
