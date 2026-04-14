// ─────────────────────────────────────────────────────────────
// Adaptive placement engine
//
// Difficulty combines word LENGTH and PATTERN TYPE:
//   composite difficulty = length + patternOffset
//
//   patternType offsets (easier → harder):
//     phoneme-grapheme  +0.0   (fully phonetic)
//     orthographic      +0.5
//     vowel-ambiguity   +1.0
//     morphological     +1.5
//     exceptional       +2.0
//
// Correct answer  → increase target difficulty by 1
// Incorrect answer → decrease target difficulty by 1 (floor = 2)
// No word is ever shown twice during the same placement run.
//
// The pool extends down to 2-letter words (level 0) so that
// even very early spellers converge on a useful starting point.
// ─────────────────────────────────────────────────────────────

import { ScaffoldLevel, PlacementItem, PlacementResult } from './types';
import { spellingData, SpellingWord } from '../utils/spellingData';
import { generateScaffold } from './scaffolding';

const PLACEMENT_TOTAL      = 20;
const INITIAL_DIFFICULTY   = 4;    // ~4-letter phoneme-grapheme word
const INITIAL_LEVEL        = 3;    // mid-range lexical level
const MIN_DIFFICULTY       = 2;    // floor: 2-letter phonetic words
const MAX_LEVEL            = 8;
const PLACEMENT_SCAFFOLD: ScaffoldLevel = 4; // no letter hints — audio only
const STABILISATION_WINDOW = 8;    // tail items used for recommendation

// patternType → difficulty offset (easier = lower)
const PATTERN_OFFSET: Record<string, number> = {
  'phoneme-grapheme': 0,
  'orthographic':     0.5,
  'vowel-ambiguity':  1,
  'morphological':    1.5,
  'exceptional':      2,
};

function wordDifficulty(w: SpellingWord): number {
  return w.word.length + (PATTERN_OFFSET[w.patternType] ?? 0);
}

interface TaggedWord {
  word: SpellingWord;
  level: number;
}

interface ResultRecord {
  level: number;
  correct: boolean;
}

// ── Level 0: simple 2-letter words ───────────────────────────
// Used only during placement as the easiest fallback.
const LEVEL_0_WORDS: SpellingWord[] = [
  { word: 'at', difficulty: 0, pattern: 'vc', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'it', difficulty: 0, pattern: 'vc', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'in', difficulty: 0, pattern: 'vc', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'on', difficulty: 0, pattern: 'vc', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'up', difficulty: 0, pattern: 'vc', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'be', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'do', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'go', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'he', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'me', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'we', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'no', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'so', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'my', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
  { word: 'by', difficulty: 0, pattern: 'cv', patternType: 'phoneme-grapheme', frequency: 'high' },
];

// ── Pool building ─────────────────────────────────────────────

function buildPlacementPool(): TaggedWord[] {
  const pool: TaggedWord[] = LEVEL_0_WORDS.map(w => ({ word: w, level: 0 }));
  const stagesToSample = [1, 3, 5, 7, 10];

  for (const [levelStr, stages] of Object.entries(spellingData)) {
    const level = parseInt(levelStr, 10);
    for (const stageNum of stagesToSample) {
      const words = stages[stageNum];
      if (!words || words.length === 0) continue;
      // Sample every other word per stage for variety
      for (let i = 0; i < words.length; i += 2) {
        pool.push({ word: words[i], level });
      }
    }
  }
  return pool;
}

// ── Engine ────────────────────────────────────────────────────

export class PlacementEngine {
  private pool: TaggedWord[];
  private currentDifficulty: number = INITIAL_DIFFICULTY;
  private currentLevel: number      = INITIAL_LEVEL;
  private itemCount: number         = 0;
  private results: ResultRecord[]   = [];
  private currentWord: string       = '';
  private usedWords                 = new Set<string>();

  constructor() {
    this.pool = buildPlacementPool();
  }

  /** Returns the first placement item. */
  start(): PlacementItem {
    return this.buildNextItem();
  }

  /** Submits an answer and returns the result + next item (or recommendation). */
  submit(input: string): PlacementResult {
    const isCorrect = input.trim().toLowerCase() === this.currentWord.toLowerCase();

    this.results.push({ level: this.currentLevel, correct: isCorrect });

    // Adapt composite difficulty and level in tandem
    if (isCorrect) {
      this.currentDifficulty++;
      this.currentLevel = Math.min(this.currentLevel + 1, MAX_LEVEL);
    } else {
      this.currentDifficulty = Math.max(this.currentDifficulty - 1, MIN_DIFFICULTY);
      this.currentLevel = Math.max(this.currentLevel - 1, 0);
    }

    const done = this.results.length >= PLACEMENT_TOTAL;

    return {
      isCorrect,
      correctWord: this.currentWord,
      done,
      nextItem: done ? null : this.buildNextItem(),
      recommendation: done ? this.computeRecommendation() : null,
    };
  }

  // ── Private helpers ───────────────────────────────────────────

  private buildNextItem(): PlacementItem {
    const tagged = this.selectWord();
    this.currentWord = tagged.word.word;
    this.currentLevel = tagged.level; // align level to what was actually served
    this.usedWords.add(this.currentWord);
    this.itemCount++;

    return {
      word: tagged.word.word,
      display: generateScaffold(tagged.word.word, PLACEMENT_SCAFFOLD),
      scaffoldLevel: PLACEMENT_SCAFFOLD,
      itemNumber: this.itemCount,
      total: PLACEMENT_TOTAL,
    };
  }

  /**
   * Selects an unused word as close to the target composite difficulty as possible.
   *
   * Search order:
   * 1. Exact composite difficulty match at current level
   * 2. Closest composite difficulty match at current level
   * 3. Closest composite difficulty match at any level (closest level as tiebreak)
   */
  private selectWord(): TaggedWord {
    const unused = this.pool.filter(t => !this.usedWords.has(t.word.word));

    if (unused.length === 0) {
      // All words exhausted — reuse any
      return this.pool[Math.floor(Math.random() * this.pool.length)];
    }

    const targetDiff = this.currentDifficulty;

    // 1. Exact difficulty match at current level
    const exactBoth = unused.filter(
      t => wordDifficulty(t.word) === targetDiff && t.level === this.currentLevel
    );
    if (exactBoth.length > 0) return pick(exactBoth);

    // 2. Closest difficulty at current level
    const atLevel = unused.filter(t => t.level === this.currentLevel);
    if (atLevel.length > 0) {
      atLevel.sort((a, b) =>
        Math.abs(wordDifficulty(a.word) - targetDiff) -
        Math.abs(wordDifficulty(b.word) - targetDiff)
      );
      // Only use if reasonably close (within 2 difficulty points)
      if (Math.abs(wordDifficulty(atLevel[0].word) - targetDiff) <= 2) {
        return atLevel[0];
      }
    }

    // 3. Closest difficulty across all levels (closest level as tiebreak)
    unused.sort((a, b) => {
      const da = Math.abs(wordDifficulty(a.word) - targetDiff);
      const db = Math.abs(wordDifficulty(b.word) - targetDiff);
      if (da !== db) return da - db;
      return Math.abs(a.level - this.currentLevel) - Math.abs(b.level - this.currentLevel);
    });
    return unused[0];
  }

  /**
   * Recommendation = lowest level in the stabilisation window.
   * Clamped to level 1 minimum (level 0 is placement-only).
   */
  private computeRecommendation(): { level: number; scaffold: ScaffoldLevel } {
    const tail = this.results.slice(-STABILISATION_WINDOW);
    const lowestInTail = Math.min(...tail.map(r => r.level));
    return { level: Math.max(lowestInTail, 1), scaffold: 0 };
  }
}

// ── Utilities ─────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
