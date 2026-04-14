// ─────────────────────────────────────────────────────────────
// Motivation system
//
// Responsibilities: total points, streak tracking, bonus mechanism.
// Must never influence learning engine decisions (placement,
// scaffolding, mastery, progression). Points are a reward layer only.
//
// Bonus trigger decision: appears after every stage completion.
// Bonus amount: random integer 10–59 points.
// Bug fix: bonus points are always added to totalPoints on claim.
// ─────────────────────────────────────────────────────────────

import { MotivationState, AttemptMotivationResult, BonusResult } from './types';

const BONUS_MIN = 10;
const BONUS_MAX = 59;

// A streak worth celebrating — used only for display feedback.
const STREAK_MILESTONE = 3;

export class MotivationSystem {
  private state: MotivationState;

  constructor(initial?: Partial<MotivationState>) {
    this.state = {
      totalPoints: 0,
      currentStreak: 0,
      longestStreak: 0,
      bonusAvailable: false,
      lastBonusAmount: null,
      ...initial,
    };
  }

  // ── Public API ────────────────────────────────────────────

  getState(): Readonly<MotivationState> {
    return this.state;
  }

  /**
   * Called after every spelling attempt.
   * Points are only awarded for correct answers (never deducted for errors).
   *
   * @param isCorrect   Whether the learner's answer was correct.
   * @param pointsEarned Points to award — must be 0 if incorrect, >0 if correct.
   *                    The learning engine (via SCAFFOLD_POINTS) determines the value.
   */
  recordAttempt(isCorrect: boolean, pointsEarned: number): AttemptMotivationResult {
    const earned = isCorrect ? pointsEarned : 0;

    let newStreak: number;
    let streakBroken = false;

    if (isCorrect) {
      newStreak = this.state.currentStreak + 1;
    } else {
      streakBroken = this.state.currentStreak >= STREAK_MILESTONE;
      newStreak = 0;
    }

    const newTotal = this.state.totalPoints + earned;
    const newLongest = Math.max(this.state.longestStreak, newStreak);

    this.state = {
      ...this.state,
      totalPoints: newTotal,
      currentStreak: newStreak,
      longestStreak: newLongest,
    };

    return { pointsEarned: earned, newTotal, newStreak, streakBroken };
  }

  /**
   * Called by the learning engine when a stage is completed.
   * Makes the bonus button available.
   */
  onStageComplete(): void {
    this.state = { ...this.state, bonusAvailable: true };
  }

  /**
   * Called when the learner clicks the bonus button.
   * Awards a random 10–59 point bonus and saves it to totalPoints.
   * Returns null if no bonus is currently available.
   */
  claimBonus(): BonusResult | null {
    if (!this.state.bonusAvailable) return null;

    const amount = randomBonusAmount();
    const newTotal = this.state.totalPoints + amount;

    this.state = {
      ...this.state,
      totalPoints: newTotal,
      bonusAvailable: false,
      lastBonusAmount: amount,
    };

    return { amount, newTotal };
  }

  /**
   * Returns true if the current streak has hit a milestone worth
   * showing a celebration in the UI.
   */
  isStreakMilestone(): boolean {
    return (
      this.state.currentStreak > 0 &&
      this.state.currentStreak % STREAK_MILESTONE === 0
    );
  }

  /**
   * Returns a serialisable snapshot of the state for localStorage persistence.
   */
  serialise(): MotivationState {
    return { ...this.state };
  }

  /**
   * Restores state from a deserialised localStorage snapshot.
   */
  static deserialise(saved: MotivationState): MotivationSystem {
    return new MotivationSystem(saved);
  }
}

// ── Private helpers ───────────────────────────────────────────

/**
 * Returns a random integer in the inclusive range [BONUS_MIN, BONUS_MAX].
 */
function randomBonusAmount(): number {
  return Math.floor(Math.random() * (BONUS_MAX - BONUS_MIN + 1)) + BONUS_MIN;
}
