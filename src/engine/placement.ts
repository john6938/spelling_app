// ─────────────────────────────────────────────────────────────
// Adaptive placement engine
// Runs a ~20-item sequence that converges on a recommended
// starting level and scaffold for a new learner.
// ─────────────────────────────────────────────────────────────

import { ScaffoldLevel, PlacementItem, PlacementResult } from './types';
import { spellingData, SpellingWord } from '../utils/spellingData';
import { generateScaffold, stepUp, stepDown } from './scaffolding';

const PLACEMENT_TOTAL = 20;

// Start in the middle of the difficulty space
const INITIAL_LEVEL = 4;
const INITIAL_SCAFFOLD: ScaffoldLevel = 2;

interface TaggedWord {
  word: SpellingWord;
  level: number;
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
      // Take up to 2 words per sampled stage to keep the pool balanced
      pool.push({ word: words[0], level });
      if (words.length > 5) pool.push({ word: words[5], level });
    }
  }
  return pool;
}

interface ResultRecord {
  level: number;
  scaffold: ScaffoldLevel;
  correct: boolean;
}

export class PlacementEngine {
  private pool: TaggedWord[];
  private currentLevel: number = INITIAL_LEVEL;
  private currentScaffold: ScaffoldLevel = INITIAL_SCAFFOLD;
  private itemCount: number = 0;
  private results: ResultRecord[] = [];
  private currentWord: string = '';

  constructor() {
    this.pool = buildPlacementPool();
  }

  /**
   * Returns the first placement item.
   * Call this to kick off the placement sequence.
   */
  start(): PlacementItem {
    return this.buildNextItem();
  }

  /**
   * Submits an answer for the current item.
   * Returns the result and (if not done) the next item.
   */
  submit(input: string): PlacementResult {
    const isCorrect = input.trim().toLowerCase() === this.currentWord.toLowerCase();

    this.results.push({
      level: this.currentLevel,
      scaffold: this.currentScaffold,
      correct: isCorrect,
    });

    // Adapt: correct → harder, incorrect → easier
    if (isCorrect) {
      if (this.currentScaffold < 4) {
        this.currentScaffold = stepUp(this.currentScaffold);
      } else {
        this.currentLevel = Math.min(this.currentLevel + 1, 8);
        this.currentScaffold = INITIAL_SCAFFOLD;
      }
    } else {
      if (this.currentScaffold > 0) {
        this.currentScaffold = stepDown(this.currentScaffold);
      } else {
        this.currentLevel = Math.max(this.currentLevel - 1, 1);
        this.currentScaffold = INITIAL_SCAFFOLD;
      }
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

  // ── Private helpers ──────────────────────────────────────────

  private buildNextItem(): PlacementItem {
    const tagged = this.selectWord();
    this.currentWord = tagged.word.word;
    this.itemCount++;

    return {
      word: tagged.word.word,
      display: generateScaffold(tagged.word.word, this.currentScaffold),
      scaffoldLevel: this.currentScaffold,
      itemNumber: this.itemCount,
      total: PLACEMENT_TOTAL,
    };
  }

  /**
   * Picks a word from the pool close to the current target level.
   * Falls back to any word if no exact-level match is available.
   */
  private selectWord(): TaggedWord {
    const candidates = this.pool.filter(t => t.level === this.currentLevel);
    const pool = candidates.length > 0 ? candidates : this.pool;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  /**
   * After 20 items, identifies the level/scaffold band where
   * the learner achieved ≥70% accuracy (their "sweet spot").
   * Returns the hardest such level, and within that level the
   * hardest scaffold where accuracy was ≥70%.
   */
  private computeRecommendation(): { level: number; scaffold: ScaffoldLevel } {
    // Aggregate by level
    const byLevel: Record<number, { correct: number; total: number }> = {};
    for (const r of this.results) {
      if (!byLevel[r.level]) byLevel[r.level] = { correct: 0, total: 0 };
      byLevel[r.level].total++;
      if (r.correct) byLevel[r.level].correct++;
    }

    // Find the highest level where accuracy ≥ 70%
    let recommendedLevel = 1;
    for (const [lvlStr, stats] of Object.entries(byLevel)) {
      const lvl = parseInt(lvlStr, 10);
      if (stats.correct / stats.total >= 0.7) {
        recommendedLevel = Math.max(recommendedLevel, lvl);
      }
    }

    // Within that level, find the hardest scaffold with ≥70% accuracy
    const byScaffold: Record<number, { correct: number; total: number }> = {};
    for (const r of this.results.filter(r => r.level === recommendedLevel)) {
      if (!byScaffold[r.scaffold]) byScaffold[r.scaffold] = { correct: 0, total: 0 };
      byScaffold[r.scaffold].total++;
      if (r.correct) byScaffold[r.scaffold].correct++;
    }

    let recommendedScaffold: ScaffoldLevel = 0;
    for (let s = 4; s >= 0; s--) {
      const stats = byScaffold[s];
      if (stats && stats.correct / stats.total >= 0.7) {
        recommendedScaffold = s as ScaffoldLevel;
        break;
      }
    }

    return { level: recommendedLevel, scaffold: recommendedScaffold };
  }
}
