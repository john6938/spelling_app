// ─────────────────────────────────────────────────────────────
// Scaffolding system
// Controls how much orthographic information is visible to the learner.
// ─────────────────────────────────────────────────────────────

import { ScaffoldLevel } from './types';

// Vowels are always blanked at S1+
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

// Graphemically ambiguous consonants — blanked at S2+ because their
// sound-to-letter mapping is non-transparent (c=/k/ or /s/, s=/s/ or /z/, etc.)
const AMBIGUOUS_CONSONANTS = new Set(['c', 's', 'k', 'g', 'x', 'q']);

export const SCAFFOLD_POINTS: Record<ScaffoldLevel, number> = {
  0: 5,
  1: 10,
  2: 15,
  3: 20,
  4: 25,
};

/**
 * Returns a character array representing the scaffolded display of a word.
 * Blanked positions are represented as '_'.
 * The word itself is never returned (S4 = all blanks).
 */
export function generateScaffold(word: string, level: ScaffoldLevel): string[] {
  const letters = word.toLowerCase().split('');

  switch (level) {
    case 0:
      // Full word visible
      return letters;

    case 1:
      // Vowels blanked; consonants shown
      return letters.map(l => (VOWELS.has(l) ? '_' : l));

    case 2:
      // Consonants only — but ambiguous consonants are also blanked
      return letters.map(l => {
        if (VOWELS.has(l)) return '_';
        if (AMBIGUOUS_CONSONANTS.has(l)) return '_';
        return l;
      });

    case 3:
      // First letter only
      return letters.map((l, i) => (i === 0 ? l : '_'));

    case 4:
      // Audio only — all positions blank
      return letters.map(() => '_');
  }
}

/**
 * Move to a harder scaffold (withdraw support).
 * Correct response → call this.
 * S0 → S1 → S2 → S3 → S4  (S4 is the hardest)
 */
export function stepUp(current: ScaffoldLevel): ScaffoldLevel {
  return Math.min(current + 1, 4) as ScaffoldLevel;
}

/**
 * Move to an easier scaffold (reintroduce support).
 * Incorrect response → call this.
 * S4 → S3 → S2 → S1 → S0  (S0 is the easiest)
 */
export function stepDown(current: ScaffoldLevel): ScaffoldLevel {
  return Math.max(current - 1, 0) as ScaffoldLevel;
}
