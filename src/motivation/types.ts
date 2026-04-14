// ─────────────────────────────────────────────────────────────
// Motivation system — shared types
// Points, streaks, and bonus mechanism.
// Structurally separate from the learning engine and badge system.
// ─────────────────────────────────────────────────────────────

export interface MotivationState {
  totalPoints: number;

  // Consecutive correct answers in the current session.
  // Displayed to the learner for encouragement; does not influence
  // pedagogical decisions (placement, scaffolding, progression).
  currentStreak: number;
  longestStreak: number;    // session high-water mark

  // Bonus button state
  bonusAvailable: boolean;
  lastBonusAmount: number | null;  // shown in UI after claiming
}

export interface AttemptMotivationResult {
  pointsEarned: number;       // 0 if incorrect
  newTotal: number;
  newStreak: number;
  streakBroken: boolean;      // true if this attempt ended a streak ≥ 3
}

export interface BonusResult {
  amount: number;
  newTotal: number;
}
