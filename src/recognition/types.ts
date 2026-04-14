// ─────────────────────────────────────────────────────────────
// Recognition system — shared types
// Badges reflect learning milestones only.
// Structurally separate from the points/motivation system.
// ─────────────────────────────────────────────────────────────

export type BadgeType = 'stage' | 'level' | 'mastery';

export interface Badge {
  type: BadgeType;
  level: number;
  stage: number | null;  // set for stage badges, null for level/mastery badges
  earnedAt: number;      // Unix timestamp (Date.now())
}

export interface RecognitionState {
  badges: Badge[];
}

/**
 * Returned after each call to checkMilestone().
 * Contains any badges newly awarded — empty array if none.
 */
export type NewBadges = Badge[];
