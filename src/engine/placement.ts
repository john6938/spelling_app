// ─────────────────────────────────────────────────────────────
// Adaptive placement engine
//
// No scaffolding during placement — every word is audio-only
// (all blanks shown). Difficulty is varied by changing the
// lexical level of the target word.
//
// Correct answer  → move up one level (harder words)
// Incorrect answer → move down one level (easier words)
//
// After 20 items the learner typically oscillates between two
// adjacent levels. The recommendation is the LOWEST level
// visited in the final stabilisation window.
// ─────────────────────────────────────────────────────────────

import { ScaffoldLevel, PlacementItem, PlacementResult } from './types';
import { spellingData, SpellingWord } from '../utils/spellingData';
import { generateScaffold } from './scaffolding';

const PLACEMENT_TOTAL = 20;
const INITIAL_LEVEL   = 3;           // start at mid-low difficulty
const PLACEMENT_SCAFFOLD: ScaffoldLevel = 4; // audio only — no letter hints

// How many tail items to inspect when computing the recommendation.
// The learner's level usually stabilises within the last third of the test.
const STABILISATION_WINDOW = 8;

interface TaggedWord {
  word: SpellingWord;
  level: number;
}

interface ResultRecord {
  level: number;
  correct: boolean;
}

/**
 * Builds a pool of words tagged with their lexical level,
 * sampling from early, mid, and late stages of each level.
 */
function buildPlacementPool(): TaggedWord[] {
  const pool: TaggedWord[] = [];
  const stagesToSample = [1, 5, 10];

  for (const [levelStr, stages] of Object.entries(spellingData)) {
    const level = parseInt(levelStr, 10);
    for (const stageNum of stagesToSample) {
      const words = stages[stageNum];
      if (!words || words.length === 0) continue;
      pool.push({ word: words[0], level });
      if (words.length > 5) pool.push({ word: words[5], level });
    }
  }
  return pool;
}

export class PlacementEngine {
  private pool: TaggedWord[];
  private currentLevel: number = INITIAL_LEVEL;
  private itemCount: number = 0;
  private results: ResultRecord[] = [];
  private currentWord: string = '';

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

    // Adapt difficulty by level only — no scaffold changes
    if (isCorrect) {
      this.currentLevel = Math.min(this.currentLevel + 1, 8);
    } else {
      this.currentLevel = Math.max(this.currentLevel - 1, 1);
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
    this.itemCount++;

    return {
      word: tagged.word.word,
      // Always audio-only display — no letter hints during placement
      display: generateScaffold(tagged.word.word, PLACEMENT_SCAFFOLD),
      scaffoldLevel: PLACEMENT_SCAFFOLD,
      itemNumber: this.itemCount,
      total: PLACEMENT_TOTAL,
    };
  }

  /** Picks a word from the pool at the current target level. */
  private selectWord(): TaggedWord {
    const candidates = this.pool.filter(t => t.level === this.currentLevel);
    const pool = candidates.length > 0 ? candidates : this.pool;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /**
   * Recommendation = the LOWEST level visited in the stabilisation window
   * (the last STABILISATION_WINDOW results). This captures the lower bound
   * of the level band the learner oscillated within.
   * Scaffold recommendation is always S0 (full support) — the learning
   * engine will adapt scaffold from there.
   */
  private computeRecommendation(): { level: number; scaffold: ScaffoldLevel } {
    const tail = this.results.slice(-STABILISATION_WINDOW);
    const recommendedLevel = Math.min(...tail.map(r => r.level));
    return { level: recommendedLevel, scaffold: 0 };
  }
}
