// ─────────────────────────────────────────────────────────────
// Learning Engine — shared types
// ─────────────────────────────────────────────────────────────

export type ScaffoldLevel = 0 | 1 | 2 | 3 | 4;
// S0 = full word visible  (easiest, 5 pts)
// S1 = vowels blanked     (10 pts)
// S2 = consonants only, ambiguous consonants also blanked  (15 pts)
// S3 = first letter only  (20 pts)
// S4 = audio only / all blank  (25 pts)

// ── Stage-level progress ─────────────────────────────────────

export interface StageProgress {
  attempts: number;                   // words presented so far this quiz
  correct: number;                    // correct answers this quiz
  bestScaffold: ScaffoldLevel;        // hardest scaffold at which a correct answer was given
  complete: boolean;                  // stage fully passed
  nearMasteryTriggered: boolean;      // L6-8: bonus verification item triggered
  nearMasteryPassed: boolean | null;  // null = not yet attempted
}

// ── Level-level progress ─────────────────────────────────────

export interface LevelProgress {
  stages: Record<number, StageProgress>;
  stagesComplete: number;
  preview: boolean;   // 5+ stages complete → next level unlocked for exploration
  complete: boolean;  // all 10 stages complete → gold badge
}

// ── Full learner state ────────────────────────────────────────

export interface LearnerState {
  username: string;
  currentLevel: number;
  currentStage: number;
  currentScaffold: ScaffoldLevel;
  inPlacement: boolean;
  placementDone: boolean;
  placementRecommendation: { level: number; scaffold: ScaffoldLevel } | null;
  levels: Record<number, LevelProgress>;
}

// ── What the UI receives when asking for the current word ────

export interface WordPresentation {
  word: string;           // target word (never shown directly — for audio + answer checking)
  display: string[];      // character array, '_' for blanked slots
  scaffoldLevel: ScaffoldLevel;
  pointValue: number;
  pattern: string;        // for near-mastery item selection
  patternType: string;
  isNearMasteryItem: boolean;
}

// ── Result of a spelling attempt ─────────────────────────────

export interface AttemptResult {
  isCorrect: boolean;
  isHomophoneAttempt: boolean;      // user typed a valid homophone — praise and redirect
  pointsEarned: number;
  correctWord: string;              // always returned so UI can show it after an error
  newScaffold: ScaffoldLevel;       // scaffold to use for the next word
  quizComplete: boolean;            // this quiz (stage attempt) has ended
  stagePassed: boolean;             // met the mastery threshold
  stageComplete: boolean;           // stage fully done (including near-mastery if applicable)
  nearMasteryTriggered: boolean;    // bonus verification item is next
  levelPreviewUnlocked: boolean;    // next level now accessible for exploration
  levelComplete: boolean;           // all 10 stages done
}

// ── Placement ─────────────────────────────────────────────────

export interface PlacementItem {
  word: string;
  display: string[];
  scaffoldLevel: ScaffoldLevel;
  itemNumber: number;   // 1-based
  total: number;        // always 20
}

export interface PlacementResult {
  isCorrect: boolean;
  correctWord: string;
  nextItem: PlacementItem | null;
  done: boolean;
  recommendation: { level: number; scaffold: ScaffoldLevel } | null;
}

// ── Mastery threshold ─────────────────────────────────────────

export interface MasteryThreshold {
  quizLength: number;           // total words to present
  requiredCorrect: number;      // minimum correct to pass
  nearMasteryAt: number | null; // triggers bonus item if exactly this many correct (L6-8)
}
