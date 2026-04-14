// ─────────────────────────────────────────────────────────────
// Recognition system
//
// Responsibilities: badge awards tied solely to learning milestones.
// Input: AttemptResult from the learning engine.
// Output: newly earned Badge objects for the UI to display.
//
// Badge hierarchy:
//   Stage badge (silver) — awarded on each stage completion.
//   Level badge (gold)   — awarded when all 10 stages in a level
//                          are complete. Upgrades the stage badges
//                          for that level (UI concern — both records
//                          are kept here for auditability).
//   Mastery badge        — awarded when every level is complete.
//
// The recognition system has no knowledge of points or streaks.
// ─────────────────────────────────────────────────────────────

import { Badge, BadgeType, NewBadges, RecognitionState } from './types';
import { AttemptResult } from '../engine/types';
import { spellingData } from '../utils/spellingData';

// Total levels is derived from the data layer — stays correct if levels are added.
const TOTAL_LEVELS = Object.keys(spellingData).length;

export class RecognitionSystem {
  private state: RecognitionState;

  constructor(initial?: Partial<RecognitionState>) {
    this.state = {
      badges: [],
      ...initial,
    };
  }

  // ── Public API ────────────────────────────────────────────

  getState(): Readonly<RecognitionState> {
    return this.state;
  }

  getBadges(): Badge[] {
    return [...this.state.badges];
  }

  /**
   * Call this after every submitAttempt() on the learning engine.
   * Examines the AttemptResult and awards any newly earned badges.
   *
   * @param result       The AttemptResult from LearningEngine.submitAttempt().
   * @param level        The level the attempt was made in.
   * @param stage        The stage the attempt was made in.
   * @param levelsComplete  How many levels are fully complete (all 10 stages).
   *                        Pass LearnerState.levels and count from there, or
   *                        use the helper countCompleteLevels() below.
   * @returns Array of badges newly awarded (empty if none).
   */
  checkMilestone(
    result: AttemptResult,
    level: number,
    stage: number,
    levelsComplete: number
  ): NewBadges {
    const awarded: Badge[] = [];

    if (result.stageComplete && !this.hasStageBadge(level, stage)) {
      awarded.push(this.award('stage', level, stage));
    }

    if (result.levelComplete && !this.hasLevelBadge(level)) {
      awarded.push(this.award('level', level, null));
    }

    if (
      result.levelComplete &&
      levelsComplete >= TOTAL_LEVELS &&
      !this.hasMasteryBadge()
    ) {
      awarded.push(this.award('mastery', level, null));
    }

    return awarded;
  }

  // ── Query helpers ─────────────────────────────────────────

  hasStageBadge(level: number, stage: number): boolean {
    return this.state.badges.some(
      b => b.type === 'stage' && b.level === level && b.stage === stage
    );
  }

  hasLevelBadge(level: number): boolean {
    return this.state.badges.some(b => b.type === 'level' && b.level === level);
  }

  hasMasteryBadge(): boolean {
    return this.state.badges.some(b => b.type === 'mastery');
  }

  /**
   * Returns all stage badges for a given level, sorted by stage number.
   * Useful for the dashboard — show silver badges per stage until gold arrives.
   */
  getStageBadgesForLevel(level: number): Badge[] {
    return this.state.badges
      .filter(b => b.type === 'stage' && b.level === level)
      .sort((a, b) => (a.stage ?? 0) - (b.stage ?? 0));
  }

  // ── Persistence ───────────────────────────────────────────

  serialise(): RecognitionState {
    return { badges: [...this.state.badges] };
  }

  static deserialise(saved: RecognitionState): RecognitionSystem {
    return new RecognitionSystem(saved);
  }

  // ── Private helpers ───────────────────────────────────────

  private award(type: BadgeType, level: number, stage: number | null): Badge {
    const badge: Badge = { type, level, stage, earnedAt: Date.now() };
    this.state = { badges: [...this.state.badges, badge] };
    return badge;
  }
}

// ── Standalone utility ────────────────────────────────────────

/**
 * Counts how many levels are fully complete from a LearnerState.levels record.
 * Import and use this alongside checkMilestone() to compute levelsComplete.
 */
export function countCompleteLevels(
  levels: Record<number, { complete: boolean }>
): number {
  return Object.values(levels).filter(l => l.complete).length;
}
