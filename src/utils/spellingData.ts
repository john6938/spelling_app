export type PatternType =
  | 'phoneme-grapheme'   // simple sound-letter mapping, dominant in levels 1-2
  | 'orthographic'       // spelling patterns, digraphs, consonant clusters, levels 2-3
  | 'vowel-ambiguity'    // same sound multiple spellings or vice versa, levels 3-4
  | 'morphological'      // suffixes, prefixes, roots, levels 4-5
  | 'exceptional';       // high-frequency irregulars, levels 6-8

export type FrequencyBand = 'high' | 'medium' | 'low';

export interface SpellingWord {
  word: string;
  difficulty: number;
  pattern: string;
  patternType: PatternType;
  frequency: FrequencyBand;
}

export const spellingData: Record<number, Record<number, SpellingWord[]>> = {

  // ─────────────────────────────────────────────────────────────
  // LEVEL 1 — phoneme-grapheme, 5 words per stage
  // ─────────────────────────────────────────────────────────────
  1: {
    1: [
      { word: 'cat',  difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'dog',  difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'sun',  difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'hat',  difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'pen',  difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
    2: [
      { word: 'book', difficulty: 1, pattern: 'oo_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'tree', difficulty: 1, pattern: 'ee_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'fish', difficulty: 1, pattern: 'sh_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'ball', difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'duck', difficulty: 1, pattern: 'ck_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
    3: [
      { word: 'frog', difficulty: 1, pattern: 'ccvc',       patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'ship', difficulty: 1, pattern: 'sh_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'star', difficulty: 1, pattern: 'ccvc',       patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'moon', difficulty: 1, pattern: 'oo_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'bird', difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
    4: [
      { word: 'hand', difficulty: 1, pattern: 'nd_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'foot', difficulty: 1, pattern: 'oo_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'door', difficulty: 1, pattern: 'oo_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'cake', difficulty: 1, pattern: 'cvce',       patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'rain', difficulty: 1, pattern: 'ai_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
    5: [
      { word: 'blue', difficulty: 1, pattern: 'cvce',       patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'pink', difficulty: 1, pattern: 'nk_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'jump', difficulty: 1, pattern: 'mp_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'play', difficulty: 1, pattern: 'ay_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'help', difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
    6: [
      { word: 'bath', difficulty: 1, pattern: 'th_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'milk', difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'farm', difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'sock', difficulty: 1, pattern: 'ck_digraph', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'drum', difficulty: 1, pattern: 'ccvc',       patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
    7: [
      { word: 'king', difficulty: 1, pattern: 'ng_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'ring', difficulty: 1, pattern: 'ng_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'wing', difficulty: 1, pattern: 'ng_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'sing', difficulty: 1, pattern: 'ng_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'bell', difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
    8: [
      { word: 'lamp', difficulty: 1, pattern: 'mp_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'nest', difficulty: 1, pattern: 'st_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'tent', difficulty: 1, pattern: 'nd_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'desk', difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'mask', difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
    9: [
      { word: 'gift', difficulty: 1, pattern: 'cvc',        patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'list', difficulty: 1, pattern: 'st_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'mist', difficulty: 1, pattern: 'st_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'best', difficulty: 1, pattern: 'st_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'rest', difficulty: 1, pattern: 'st_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
    10: [
      { word: 'wind', difficulty: 1, pattern: 'nd_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'sand', difficulty: 1, pattern: 'nd_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'band', difficulty: 1, pattern: 'nd_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'land', difficulty: 1, pattern: 'nd_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
      { word: 'pond', difficulty: 1, pattern: 'nd_cluster', patternType: 'phoneme-grapheme', frequency: 'high' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 2 — orthographic patterns, digraphs, blends, 5 words per stage
  // ─────────────────────────────────────────────────────────────
  2: {
    1: [
      { word: 'happy',  difficulty: 2, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'high' },
      { word: 'smile',  difficulty: 2, pattern: 'cvce',             patternType: 'orthographic', frequency: 'high' },
      { word: 'plant',  difficulty: 2, pattern: 'ccvc',             patternType: 'orthographic', frequency: 'high' },
      { word: 'snake',  difficulty: 2, pattern: 'cvce',             patternType: 'orthographic', frequency: 'high' },
      { word: 'grape',  difficulty: 2, pattern: 'cvce',             patternType: 'orthographic', frequency: 'high' },
    ],
    2: [
      { word: 'train',  difficulty: 2, pattern: 'ai_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'plane',  difficulty: 2, pattern: 'cvce',             patternType: 'orthographic', frequency: 'high' },
      { word: 'close',  difficulty: 2, pattern: 'cvce',             patternType: 'orthographic', frequency: 'high' },
      { word: 'climb',  difficulty: 2, pattern: 'silent_b',         patternType: 'orthographic', frequency: 'high' },
      { word: 'sleep',  difficulty: 2, pattern: 'ee_digraph',       patternType: 'orthographic', frequency: 'high' },
    ],
    3: [
      { word: 'wheel',  difficulty: 2, pattern: 'ee_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'teeth',  difficulty: 2, pattern: 'ee_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'three',  difficulty: 2, pattern: 'ee_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'sheep',  difficulty: 2, pattern: 'ee_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'sweet',  difficulty: 2, pattern: 'ee_digraph',       patternType: 'orthographic', frequency: 'high' },
    ],
    4: [
      { word: 'beach',  difficulty: 2, pattern: 'ea_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'teach',  difficulty: 2, pattern: 'ea_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'peach',  difficulty: 2, pattern: 'ea_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'reach',  difficulty: 2, pattern: 'ea_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'chain',  difficulty: 2, pattern: 'ai_digraph',       patternType: 'orthographic', frequency: 'high' },
    ],
    5: [
      { word: 'night',  difficulty: 2, pattern: 'ight',             patternType: 'orthographic', frequency: 'high' },
      { word: 'light',  difficulty: 2, pattern: 'ight',             patternType: 'orthographic', frequency: 'high' },
      { word: 'fight',  difficulty: 2, pattern: 'ight',             patternType: 'orthographic', frequency: 'high' },
      { word: 'right',  difficulty: 2, pattern: 'ight',             patternType: 'orthographic', frequency: 'high' },
      { word: 'sight',  difficulty: 2, pattern: 'ight',             patternType: 'orthographic', frequency: 'high' },
    ],
    6: [
      { word: 'bread',  difficulty: 2, pattern: 'ea_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'heart',  difficulty: 2, pattern: 'ea_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'brush',  difficulty: 2, pattern: 'sh_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'truck',  difficulty: 2, pattern: 'ck_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'shelf',  difficulty: 2, pattern: 'sh_digraph',       patternType: 'orthographic', frequency: 'high' },
    ],
    7: [
      { word: 'think',  difficulty: 2, pattern: 'th_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'thank',  difficulty: 2, pattern: 'th_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'thick',  difficulty: 2, pattern: 'th_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'thing',  difficulty: 2, pattern: 'th_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'thumb',  difficulty: 2, pattern: 'th_digraph',       patternType: 'orthographic', frequency: 'high' },
    ],
    8: [
      { word: 'start',  difficulty: 2, pattern: 'st_cluster',       patternType: 'orthographic', frequency: 'high' },
      { word: 'smart',  difficulty: 2, pattern: 'st_cluster',       patternType: 'orthographic', frequency: 'high' },
      { word: 'sport',  difficulty: 2, pattern: 'st_cluster',       patternType: 'orthographic', frequency: 'high' },
      { word: 'short',  difficulty: 2, pattern: 'sh_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'storm',  difficulty: 2, pattern: 'st_cluster',       patternType: 'orthographic', frequency: 'high' },
    ],
    9: [
      { word: 'bring',  difficulty: 2, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'high' },
      { word: 'crown',  difficulty: 2, pattern: 'ou_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'brown',  difficulty: 2, pattern: 'ou_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'clown',  difficulty: 2, pattern: 'ou_digraph',       patternType: 'orthographic', frequency: 'high' },
      { word: 'float',  difficulty: 2, pattern: 'oa_digraph',       patternType: 'orthographic', frequency: 'high' },
    ],
    10: [
      { word: 'frost',  difficulty: 2, pattern: 'st_cluster',       patternType: 'orthographic', frequency: 'high' },
      { word: 'cross',  difficulty: 2, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'high' },
      { word: 'dress',  difficulty: 2, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'high' },
      { word: 'grass',  difficulty: 2, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'high' },
      { word: 'glass',  difficulty: 2, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'high' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 3 — 2-syllable words, 10 words per stage
  // ─────────────────────────────────────────────────────────────
  3: {
    1: [
      // existing 5
      { word: 'garden',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'market',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'pocket',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'rocket',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'medium' },
      { word: 'basket',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      // added 5
      { word: 'carpet',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'medium' },
      { word: 'jacket',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'magnet',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'low' },
      { word: 'planet',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'medium' },
      { word: 'target',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
    ],
    2: [
      // existing 5
      { word: 'pencil',  difficulty: 3, pattern: 'schwa',            patternType: 'orthographic', frequency: 'high' },
      { word: 'carrot',  difficulty: 3, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'low' },
      { word: 'button',  difficulty: 3, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'medium' },
      { word: 'kitten',  difficulty: 3, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'low' },
      { word: 'mitten',  difficulty: 3, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'low' },
      // added 5
      { word: 'cotton',  difficulty: 3, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'high' },
      { word: 'rabbit',  difficulty: 3, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'medium' },
      { word: 'ribbon',  difficulty: 3, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'medium' },
      { word: 'muffin',  difficulty: 3, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'low' },
      { word: 'lesson',  difficulty: 3, pattern: 'double_consonant', patternType: 'orthographic', frequency: 'high' },
    ],
    3: [
      // existing 5
      { word: 'sister',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'winter',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'letter',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'better',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'butter',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      // added 5
      { word: 'bitter',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'center',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'dinner',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'master',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'pepper',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'medium' },
    ],
    4: [
      // existing 5
      { word: 'number',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'lumber',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'medium' },
      { word: 'under',   difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'wonder',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'high' },
      { word: 'thunder', difficulty: 3, pattern: 'th_digraph',       patternType: 'orthographic', frequency: 'medium' },
      // added 5
      { word: 'blunder', difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'low' },
      { word: 'hunter',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'medium' },
      { word: 'plunder', difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'low' },
      { word: 'render',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'medium' },
      { word: 'tender',  difficulty: 3, pattern: 'er_suffix',        patternType: 'orthographic', frequency: 'medium' },
    ],
    5: [
      // existing 5
      { word: 'finger',  difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'high' },
      { word: 'longer',  difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'high' },
      { word: 'singer',  difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'medium' },
      { word: 'hanger',  difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'low' },
      { word: 'danger',  difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'high' },
      // added 5
      { word: 'anger',   difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'high' },
      { word: 'hunger',  difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'medium' },
      { word: 'linger',  difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'medium' },
      { word: 'manger',  difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'low' },
      { word: 'ranger',  difficulty: 3, pattern: 'ng_cluster',       patternType: 'orthographic', frequency: 'low' },
    ],
    6: [
      // existing 5  (mention kept here at L3S6; replaced in L4S3)
      { word: 'station',  difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'nation',   difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'action',   difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'fraction', difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'mention',  difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'high' },
      // added 5
      { word: 'caption',  difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'low' },
      { word: 'fiction',  difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'motion',   difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'option',   difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'low' },
      { word: 'section',  difficulty: 3, pattern: 'tion_suffix',     patternType: 'morphological', frequency: 'high' },
    ],
    7: [
      // existing 5
      { word: 'picture',  difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'capture',  difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'nature',   difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'future',   difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'mixture',  difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'medium' },
      // added 5
      { word: 'culture',  difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'feature',  difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'fixture',  difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'low' },
      { word: 'pasture',  difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'texture',  difficulty: 3, pattern: 'ture_suffix',     patternType: 'morphological', frequency: 'medium' },
    ],
    8: [
      // existing 5
      { word: 'answer',   difficulty: 3, pattern: 'silent_w',        patternType: 'orthographic',  frequency: 'high' },
      { word: 'trouble',  difficulty: 3, pattern: 'schwa',           patternType: 'orthographic',  frequency: 'high' },
      { word: 'double',   difficulty: 3, pattern: 'schwa',           patternType: 'orthographic',  frequency: 'high' },
      { word: 'castle',   difficulty: 3, pattern: 'silent_e',        patternType: 'orthographic',  frequency: 'medium' },
      { word: 'listen',   difficulty: 3, pattern: 'silent_e',        patternType: 'orthographic',  frequency: 'high' },
      // added 5
      { word: 'battle',   difficulty: 3, pattern: 'double_consonant',patternType: 'orthographic',  frequency: 'high' },
      { word: 'bottle',   difficulty: 3, pattern: 'double_consonant',patternType: 'orthographic',  frequency: 'high' },
      { word: 'candle',   difficulty: 3, pattern: 'schwa',           patternType: 'orthographic',  frequency: 'medium' },
      { word: 'gentle',   difficulty: 3, pattern: 'schwa',           patternType: 'orthographic',  frequency: 'high' },
      { word: 'simple',   difficulty: 3, pattern: 'schwa',           patternType: 'orthographic',  frequency: 'high' },
    ],
    9: [
      // existing 5
      { word: 'circus',   difficulty: 3, pattern: 'schwa',           patternType: 'orthographic',  frequency: 'medium' },
      { word: 'fancy',    difficulty: 3, pattern: 'schwa',           patternType: 'orthographic',  frequency: 'medium' },
      { word: 'balance',  difficulty: 3, pattern: 'ance_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'palace',   difficulty: 3, pattern: 'schwa',           patternType: 'orthographic',  frequency: 'high' },
      { word: 'surface',  difficulty: 3, pattern: 'schwa',           patternType: 'orthographic',  frequency: 'high' },
      // added 5
      { word: 'advance',   difficulty: 3, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'chance',    difficulty: 3, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'distance',  difficulty: 3, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'finance',   difficulty: 3, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'entrance',  difficulty: 3, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'high' },
    ],
    10: [
      // existing 5
      { word: 'machine',   difficulty: 3, pattern: 'schwa',          patternType: 'orthographic',  frequency: 'high' },
      { word: 'adventure', difficulty: 3, pattern: 'ture_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'measure',   difficulty: 3, pattern: 'schwa',          patternType: 'orthographic',  frequency: 'high' },
      { word: 'treasure',  difficulty: 3, pattern: 'schwa',          patternType: 'orthographic',  frequency: 'low' },
      { word: 'pleasure',  difficulty: 3, pattern: 'schwa',          patternType: 'orthographic',  frequency: 'high' },
      // added 5
      { word: 'closure',   difficulty: 3, pattern: 'schwa',          patternType: 'orthographic',  frequency: 'low' },
      { word: 'creature',  difficulty: 3, pattern: 'ture_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'gesture',   difficulty: 3, pattern: 'ture_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'leisure',   difficulty: 3, pattern: 'schwa',          patternType: 'orthographic',  frequency: 'medium' },
      { word: 'posture',   difficulty: 3, pattern: 'ture_suffix',    patternType: 'morphological', frequency: 'medium' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 4 — longer words with tricky patterns, 10 words per stage
  // ─────────────────────────────────────────────────────────────
  4: {
    1: [
      // existing 5  (excellent kept here; replaced in L5S6)
      { word: 'beautiful',  difficulty: 4, pattern: 'ie_pattern',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'excellent',  difficulty: 4, pattern: 'ence_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'important',  difficulty: 4, pattern: 'ance_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'different',  difficulty: 4, pattern: 'ence_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'interest',   difficulty: 4, pattern: 'unstressed_vowel', patternType: 'vowel-ambiguity', frequency: 'high' },
      // added 5
      { word: 'confident',  difficulty: 4, pattern: 'ence_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'continent',  difficulty: 4, pattern: 'ence_suffix',   patternType: 'morphological',   frequency: 'medium' },
      { word: 'frequent',   difficulty: 4, pattern: 'ence_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'innocent',   difficulty: 4, pattern: 'ence_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'proficient', difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'low' },
    ],
    2: [
      // existing 5
      { word: 'remember',   difficulty: 4, pattern: 'er_suffix',     patternType: 'morphological',   frequency: 'high' },
      { word: 'December',   difficulty: 4, pattern: 'er_suffix',     patternType: 'morphological',   frequency: 'high' },
      { word: 'September',  difficulty: 4, pattern: 'er_suffix',     patternType: 'morphological',   frequency: 'high' },
      { word: 'November',   difficulty: 4, pattern: 'er_suffix',     patternType: 'morphological',   frequency: 'high' },
      { word: 'temperature',difficulty: 4, pattern: 'ture_suffix',   patternType: 'morphological',   frequency: 'high' },
      // added 5
      { word: 'encounter',  difficulty: 4, pattern: 'er_suffix',     patternType: 'morphological',   frequency: 'high' },
      { word: 'follower',   difficulty: 4, pattern: 'er_suffix',     patternType: 'morphological',   frequency: 'low' },
      { word: 'October',    difficulty: 4, pattern: 'er_suffix',     patternType: 'morphological',   frequency: 'medium' },
      { word: 'together',   difficulty: 4, pattern: 'er_suffix',     patternType: 'morphological',   frequency: 'high' },
      { word: 'volunteer',  difficulty: 4, pattern: 'er_suffix',     patternType: 'morphological',   frequency: 'medium' },
    ],
    3: [
      // existing 5  (mention replaced — already at L3S6; conscience kept here, replaced in L5S3)
      { word: 'question',   difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'collection', difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'attention',  difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'invention',  difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'medium' },
      { word: 'direction',  difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'high' },
      // added 5
      { word: 'election',   difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'high' },
      { word: 'infection',  difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'medium' },
      { word: 'injection',  difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'medium' },
      { word: 'objection',  difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'medium' },
      { word: 'selection',  difficulty: 4, pattern: 'tion_suffix',   patternType: 'morphological',   frequency: 'high' },
    ],
    4: [
      // existing 5
      { word: 'straight',   difficulty: 4, pattern: 'silent_gh',     patternType: 'exceptional',     frequency: 'high' },
      { word: 'through',    difficulty: 4, pattern: 'ough_oo',       patternType: 'exceptional',     frequency: 'high' },
      { word: 'thought',    difficulty: 4, pattern: 'ough_aw',       patternType: 'exceptional',     frequency: 'high' },
      { word: 'brought',    difficulty: 4, pattern: 'ough_aw',       patternType: 'exceptional',     frequency: 'high' },
      { word: 'although',   difficulty: 4, pattern: 'ough_o',        patternType: 'exceptional',     frequency: 'high' },
      // added 5
      { word: 'caught',     difficulty: 4, pattern: 'silent_gh',     patternType: 'exceptional',     frequency: 'high' },
      { word: 'daughter',   difficulty: 4, pattern: 'silent_gh',     patternType: 'exceptional',     frequency: 'high' },
      { word: 'fought',     difficulty: 4, pattern: 'ough_aw',       patternType: 'exceptional',     frequency: 'high' },
      { word: 'naughty',    difficulty: 4, pattern: 'silent_gh',     patternType: 'exceptional',     frequency: 'low' },
      { word: 'taught',     difficulty: 4, pattern: 'silent_gh',     patternType: 'exceptional',     frequency: 'high' },
    ],
    5: [
      // existing 5
      { word: 'enough',     difficulty: 4, pattern: 'ough_f',        patternType: 'exceptional',     frequency: 'high' },
      { word: 'rough',      difficulty: 4, pattern: 'ough_f',        patternType: 'exceptional',     frequency: 'high' },
      { word: 'tough',      difficulty: 4, pattern: 'ough_f',        patternType: 'exceptional',     frequency: 'high' },
      { word: 'cough',      difficulty: 4, pattern: 'ough_f',        patternType: 'exceptional',     frequency: 'medium' },
      { word: 'laugh',      difficulty: 4, pattern: 'ough_f',        patternType: 'exceptional',     frequency: 'high' },
      // added 5
      { word: 'borough',    difficulty: 4, pattern: 'ough_o',        patternType: 'exceptional',     frequency: 'low' },
      { word: 'dough',      difficulty: 4, pattern: 'ough_o',        patternType: 'exceptional',     frequency: 'medium' },
      { word: 'plough',     difficulty: 4, pattern: 'ough_f',        patternType: 'exceptional',     frequency: 'low' },
      { word: 'slough',     difficulty: 4, pattern: 'ough_f',        patternType: 'exceptional',     frequency: 'low' },
      { word: 'thorough',   difficulty: 4, pattern: 'ough_o',        patternType: 'exceptional',     frequency: 'medium' },
    ],
    6: [
      // existing 5
      { word: 'explain',    difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'complain',   difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'medium' },
      { word: 'certain',    difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'mountain',   difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'fountain',   difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'medium' },
      // added 5
      { word: 'bargain',    difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'medium' },
      { word: 'captain',    difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'curtain',    difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'medium' },
      { word: 'obtain',     difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'sustain',    difficulty: 4, pattern: 'ai_digraph',    patternType: 'vowel-ambiguity', frequency: 'medium' },
    ],
    7: [
      // existing 5
      { word: 'believe',    difficulty: 4, pattern: 'ie_pattern',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'receive',    difficulty: 4, pattern: 'ei_pattern',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'achieve',    difficulty: 4, pattern: 'ie_pattern',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'deceive',    difficulty: 4, pattern: 'ei_pattern',    patternType: 'vowel-ambiguity', frequency: 'low' },
      { word: 'ceiling',    difficulty: 4, pattern: 'ei_pattern',    patternType: 'vowel-ambiguity', frequency: 'high' },
      // added 5
      { word: 'grief',      difficulty: 4, pattern: 'ie_pattern',    patternType: 'vowel-ambiguity', frequency: 'medium' },
      { word: 'niece',      difficulty: 4, pattern: 'ie_pattern',    patternType: 'vowel-ambiguity', frequency: 'medium' },
      { word: 'perceive',   difficulty: 4, pattern: 'ei_pattern',    patternType: 'vowel-ambiguity', frequency: 'medium' },
      { word: 'relief',     difficulty: 4, pattern: 'ie_pattern',    patternType: 'vowel-ambiguity', frequency: 'high' },
      { word: 'shriek',     difficulty: 4, pattern: 'ie_pattern',    patternType: 'vowel-ambiguity', frequency: 'low' },
    ],
    8: [
      // existing 5
      { word: 'foreign',    difficulty: 4, pattern: 'ei_pattern',    patternType: 'exceptional',     frequency: 'high' },
      { word: 'neighbor',   difficulty: 4, pattern: 'ei_pattern',    patternType: 'exceptional',     frequency: 'medium' },
      { word: 'science',    difficulty: 4, pattern: 'ie_pattern',    patternType: 'exceptional',     frequency: 'high' },
      { word: 'conscience', difficulty: 4, pattern: 'ie_pattern',    patternType: 'exceptional',     frequency: 'high' },
      { word: 'ancient',    difficulty: 4, pattern: 'ie_pattern',    patternType: 'exceptional',     frequency: 'high' },
      // added 5
      { word: 'efficient',  difficulty: 4, pattern: 'ie_pattern',    patternType: 'exceptional',     frequency: 'high' },
      { word: 'glacier',    difficulty: 4, pattern: 'ie_pattern',    patternType: 'exceptional',     frequency: 'low' },
      { word: 'omniscient', difficulty: 4, pattern: 'ie_pattern',    patternType: 'exceptional',     frequency: 'low' },
      { word: 'proficiency',difficulty: 4, pattern: 'ie_pattern',    patternType: 'exceptional',     frequency: 'low' },
      { word: 'quotient',   difficulty: 4, pattern: 'ie_pattern',    patternType: 'exceptional',     frequency: 'low' },
    ],
    9: [
      // existing 5  (restaurant kept here; replaced in L6S3 and L8S5)
      { word: 'restaurant', difficulty: 4, pattern: 'unstressed_vowel', patternType: 'exceptional', frequency: 'high' },
      { word: 'beginning',  difficulty: 4, pattern: 'double_consonant', patternType: 'morphological', frequency: 'high' },
      { word: 'separate',   difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'desperate',  difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'February',   difficulty: 4, pattern: 'unstressed_vowel', patternType: 'exceptional', frequency: 'high' },
      // added 5
      { word: 'broccoli',   difficulty: 4, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'calendar',   difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'grammar',    difficulty: 4, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'diameter',   difficulty: 4, pattern: 'er_suffix',      patternType: 'exceptional',   frequency: 'high' },
      { word: 'syllable',   difficulty: 4, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
    ],
    10: [
      // existing 5  (necessary kept here; replaced in L5S9)
      { word: 'necessary',  difficulty: 4, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'high' },
      { word: 'library',    difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'dictionary', difficulty: 4, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'ordinary',   difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'boundary',   difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      // added 5
      { word: 'commentary', difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'elementary', difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'imaginary',  difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'military',   difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'voluntary',  difficulty: 4, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 5 — complex multisyllabic, 10 words per stage
  // ─────────────────────────────────────────────────────────────
  5: {
    1: [
      // existing 5  (accommodate kept here; replaced in L7S1)
      { word: 'accommodate',  difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'accompany',    difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'accomplish',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'high' },
      { word: 'according',    difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'high' },
      { word: 'accurate',     difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'high' },
      // added 5
      { word: 'accumulate',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'acknowledge',  difficulty: 5, pattern: 'silent_k',        patternType: 'morphological', frequency: 'medium' },
      { word: 'accountable',  difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'accidental',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'accessible',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
    ],
    2: [
      // existing 5  (appreciate kept here; replaced in L6S8)
      { word: 'appreciate',   difficulty: 5, pattern: 'ie_pattern',      patternType: 'morphological', frequency: 'medium' },
      { word: 'appropriate',  difficulty: 5, pattern: 'ie_pattern',      patternType: 'morphological', frequency: 'high' },
      { word: 'approximate',  difficulty: 5, pattern: 'schwa',           patternType: 'morphological', frequency: 'medium' },
      { word: 'argument',     difficulty: 5, pattern: 'ment_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'arrangement',  difficulty: 5, pattern: 'ment_suffix',     patternType: 'morphological', frequency: 'high' },
      // added 5
      { word: 'assessment',   difficulty: 5, pattern: 'ment_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'assignment',   difficulty: 5, pattern: 'ment_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'attachment',   difficulty: 5, pattern: 'ment_suffix',     patternType: 'morphological', frequency: 'low' },
      { word: 'commitment',   difficulty: 5, pattern: 'ment_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'department',   difficulty: 5, pattern: 'ment_suffix',     patternType: 'morphological', frequency: 'high' },
    ],
    3: [
      // existing 5  (conscience already at L4S8 — replaced with 'conscientious'; conscious kept)
      { word: 'conscientious', difficulty: 5, pattern: 'ie_pattern',    patternType: 'morphological', frequency: 'medium' },
      { word: 'conscious',     difficulty: 5, pattern: 'ie_pattern',    patternType: 'morphological', frequency: 'high' },
      { word: 'consequence',   difficulty: 5, pattern: 'ence_suffix',   patternType: 'morphological', frequency: 'high' },
      { word: 'convenient',    difficulty: 5, pattern: 'ie_pattern',    patternType: 'morphological', frequency: 'medium' },
      { word: 'correspondence',difficulty: 5, pattern: 'ence_suffix',   patternType: 'morphological', frequency: 'medium' },
      // added 5
      { word: 'competence',    difficulty: 5, pattern: 'ence_suffix',   patternType: 'morphological', frequency: 'medium' },
      { word: 'conference',    difficulty: 5, pattern: 'ence_suffix',   patternType: 'morphological', frequency: 'high' },
      { word: 'confidence',    difficulty: 5, pattern: 'ence_suffix',   patternType: 'morphological', frequency: 'high' },
      { word: 'turbulence',    difficulty: 5, pattern: 'ence_suffix',   patternType: 'morphological', frequency: 'low' },
      { word: 'evidence',      difficulty: 5, pattern: 'ence_suffix',   patternType: 'morphological', frequency: 'high' },
    ],
    4: [
      // existing 5
      { word: 'definitely',   difficulty: 5, pattern: 'ite_pattern',    patternType: 'morphological', frequency: 'medium' },
      { word: 'deliberate',   difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
      { word: 'describe',     difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'description',  difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'development',  difficulty: 5, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'high' },
      // added 5
      { word: 'declaration',  difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'demonstrate',  difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'determination',difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'distinguish',  difficulty: 5, pattern: 'silent_gh',      patternType: 'morphological', frequency: 'medium' },
      { word: 'distribution', difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
    ],
    5: [
      // existing 5  (environment kept here; replaced in L7S6; disappear/disappoint/discipline/embarrass kept)
      { word: 'disappear',    difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'disappoint',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'discipline',   difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'embarrass',    difficulty: 5, pattern: 'double_consonant', patternType: 'exceptional',  frequency: 'low' },
      { word: 'environment',  difficulty: 5, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'high' },
      // added 5
      { word: 'disapproval',  difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'disastrous',   difficulty: 5, pattern: 'ous_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'discontent',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'discovery',    difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'discussion',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'high' },
    ],
    6: [
      // existing 5  (excellent replaced — already at L4S1; exercise/experience/experiment/exaggerate kept)
      { word: 'exaggerate',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'exhilarate',   difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'low' },
      { word: 'exercise',     difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'experience',   difficulty: 5, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'experiment',   difficulty: 5, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'high' },
      // added 5
      { word: 'explanation',  difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'exploration',  difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'expression',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'high' },
      { word: 'extension',    difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'exuberant',    difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
    ],
    7: [
      // existing 5  (guarantee kept here — replaced in L7S7; government kept here — replaced in L7S7; favorite/familiar/fascinate kept)
      { word: 'familiar',     difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'fascinate',    difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'low' },
      { word: 'favorite',     difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'guarantee',    difficulty: 5, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'government',   difficulty: 5, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'high' },
      // added 5
      { word: 'furthermore',  difficulty: 5, pattern: 'er_suffix',      patternType: 'morphological', frequency: 'high' },
      { word: 'generation',   difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'geography',    difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'low' },
      { word: 'gradual',      difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
      { word: 'grateful',     difficulty: 5, pattern: 'ful_suffix',     patternType: 'morphological', frequency: 'medium' },
    ],
    8: [
      // existing 5  (intelligence kept here — replaced in L7S8; independent kept here — replaced in L7S8; immediate/interrupt/knowledge kept)
      { word: 'immediate',    difficulty: 5, pattern: 'ie_pattern',     patternType: 'morphological', frequency: 'high' },
      { word: 'independent',  difficulty: 5, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'intelligence', difficulty: 5, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'interrupt',    difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'knowledge',    difficulty: 5, pattern: 'silent_k',       patternType: 'exceptional',   frequency: 'high' },
      // added 5
      { word: 'imagination',  difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'improvement',  difficulty: 5, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'indication',   difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'innovation',   difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'inspiration',  difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
    ],
    9: [
      // existing 5  (necessary replaced — already at L4S10; miniature replaced — already at L5S9; maintenance kept here — replaced in L7S9)
      { word: 'maintenance',  difficulty: 5, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'manufacture',  difficulty: 5, pattern: 'ture_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'miniature',    difficulty: 5, pattern: 'unstressed_vowel', patternType: 'exceptional', frequency: 'medium' },
      { word: 'mysterious',   difficulty: 5, pattern: 'ous_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'substantial',  difficulty: 5, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'high' },
      // added 5
      { word: 'manageable',   difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'low' },
      { word: 'measurement',  difficulty: 5, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'mechanism',    difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
      { word: 'medication',   difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'merchandise',  difficulty: 5, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
    ],
    10: [
      // existing 5
      { word: 'occasionally', difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'high' },
      { word: 'occurred',     difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'high' },
      { word: 'occurrence',   difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'opportunity',  difficulty: 5, pattern: 'double_consonant', patternType: 'morphological', frequency: 'high' },
      { word: 'parliament',   difficulty: 5, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'medium' },
      // added 5
      { word: 'obligation',   difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'observation',  difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'occupation',   difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'opposition',   difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'pagination',   difficulty: 5, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 6 — advanced, 10 words per stage
  // ─────────────────────────────────────────────────────────────
  6: {
    1: [
      // existing 5  (privilege kept here; replaced in L8S3)
      { word: 'particularly', difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'permanent',    difficulty: 6, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'persuade',     difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'physical',     difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'possess',      difficulty: 6, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
      // added 5
      { word: 'passionate',   difficulty: 6, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'perception',   difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'performance',  difficulty: 6, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'permeate',     difficulty: 6, pattern: 'schwa',          patternType: 'morphological', frequency: 'low' },
      { word: 'privilege',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
    ],
    2: [
      // existing 5  (pronunciation kept here; replaced in L8S3)
      { word: 'probably',     difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'profession',   difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'pronunciation',difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'queue',        difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'proliferate',  difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'procedure',    difficulty: 6, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'proportion',   difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'proposition',  difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'prosecution',  difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'protection',   difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
    ],
    3: [
      // existing 5  (restaurant replaced — already at L4S9)
      { word: 'reconcile',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'reference',    difficulty: 6, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'reluctant',    difficulty: 6, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'resilience',   difficulty: 6, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'rhyme',        difficulty: 6, pattern: 'silent_h',       patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'reasonable',   difficulty: 6, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'recognition',  difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'reformation',  difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'rehearsal',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'reinforcement',difficulty: 6, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'low' },
    ],
    4: [
      // existing 5  (rhythm kept here; replaced in L8S6)
      { word: 'rhythm',       difficulty: 6, pattern: 'silent_h',       patternType: 'exceptional',   frequency: 'medium' },
      { word: 'sacrifice',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'signature',    difficulty: 6, pattern: 'ture_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'sincerely',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'sophisticated',difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      // added 5
      { word: 'simultaneous', difficulty: 6, pattern: 'ous_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'sarcastic',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'satellite',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'scenario',     difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'scientific',   difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
    ],
    5: [
      // existing 5
      { word: 'sufficient',   difficulty: 6, pattern: 'ie_pattern',     patternType: 'exceptional',   frequency: 'high' },
      { word: 'suggest',      difficulty: 6, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'high' },
      { word: 'suspicious',   difficulty: 6, pattern: 'ous_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'symbol',       difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'sympathy',     difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      // added 5
      { word: 'subservient',  difficulty: 6, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'substitute',   difficulty: 6, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
      { word: 'succession',   difficulty: 6, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'sufficiency',  difficulty: 6, pattern: 'ie_pattern',     patternType: 'morphological', frequency: 'low' },
      { word: 'symmetrical',  difficulty: 6, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
    ],
    6: [
      // existing 5  (twelfth kept here; replaced in L8S8; vacuum kept here; replaced in L8S9)
      { word: 'testimonial',  difficulty: 6, pattern: 'schwa',          patternType: 'morphological', frequency: 'low' },
      { word: 'theoretical',  difficulty: 6, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
      { word: 'thoroughfare', difficulty: 6, pattern: 'ough_o',         patternType: 'exceptional',   frequency: 'low' },
      { word: 'twelfth',      difficulty: 6, pattern: 'silent_e',       patternType: 'exceptional',   frequency: 'low' },
      { word: 'unnecessary',  difficulty: 6, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
      // added 5
      { word: 'transparent',  difficulty: 6, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'tremendous',   difficulty: 6, pattern: 'ous_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'tolerance',    difficulty: 6, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'transcendent', difficulty: 6, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'transmission', difficulty: 6, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
    ],
    7: [
      // existing 5  (achieve replaced — already at L4S7; vacuum kept here — replaced in L8S9)
      { word: 'vacuum',       difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'vegetable',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'vehicle',      difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'yacht',        difficulty: 6, pattern: 'silent_ch',      patternType: 'exceptional',   frequency: 'low' },
      { word: 'vulnerable',   difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      // added 5
      { word: 'valiant',      difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'variation',    difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'velocity',     difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'versatile',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'virtually',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
    ],
    8: [
      // existing 5  (appreciate replaced — already at L5S2; achieve replaced — already at L4S7; committee kept here — replaced in L7S3; amateur/anonymous kept)
      { word: 'amateur',      difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'anonymous',    difficulty: 6, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'medium' },
      { word: 'apparent',     difficulty: 6, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'high' },
      { word: 'committee',    difficulty: 6, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'high' },
      { word: 'accreditation',difficulty: 6, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      // added 5
      { word: 'ambiguous',    difficulty: 6, pattern: 'ous_suffix',     patternType: 'morphological', frequency: 'medium' },
      { word: 'ambivalent',   difficulty: 6, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'ammunition',   difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'amphibious',   difficulty: 6, pattern: 'ous_suffix',     patternType: 'morphological', frequency: 'low' },
      { word: 'analytical',   difficulty: 6, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
    ],
    9: [
      // existing 5  (curiosity kept here — replaced in L7S4)
      { word: 'communication',difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'competition',  difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'controversial',difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'curiosity',    difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'enthusiasm',   difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      // added 5
      { word: 'coexistence',  difficulty: 6, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'coherence',    difficulty: 6, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'commiserate',  difficulty: 6, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'compassionate',difficulty: 6, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'comprehensive',difficulty: 6, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'medium' },
    ],
    10: [
      // existing 5  (immediately — kept here at L6S10, using the L5S8 entry for 'immediately' is at L5S8 so this occurrence is the duplicate; intelligence replaced — already at L5S8; independence kept here since L5S8 has 'independent')
      { word: 'inevitably',   difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'responsibility',difficulty: 6, pattern: 'schwa',        patternType: 'morphological', frequency: 'high' },
      { word: 'articulate',   difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'indispensable',difficulty: 6, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'inexplicable', difficulty: 6, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'infrastructure',difficulty: 6, pattern: 'ture_suffix',   patternType: 'morphological', frequency: 'low' },
      { word: 'integration',  difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'intellectual', difficulty: 6, pattern: 'schwa',          patternType: 'morphological', frequency: 'high' },
      { word: 'intervention', difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'investigation',difficulty: 6, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 7 — sophisticated, 10 words per stage
  // ─────────────────────────────────────────────────────────────
  7: {
    1: [
      // existing 5  (accommodate replaced — already at L5S1)
      { word: 'acrimonious',  difficulty: 7, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'acknowledgment',difficulty: 7, pattern: 'silent_k',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'acquaintance', difficulty: 7, pattern: 'silent_c',       patternType: 'exceptional',   frequency: 'medium' },
      { word: 'acquisition',  difficulty: 7, pattern: 'tion_suffix',    patternType: 'exceptional',   frequency: 'medium' },
      { word: 'anachronism',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'abbreviation', difficulty: 7, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'aberration',   difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional',  frequency: 'low' },
      { word: 'abstraction',  difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'acceleration', difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'accentuate',   difficulty: 7, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
    ],
    2: [
      // existing 5
      { word: 'bureaucracy',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'category',     difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'cemetery',     difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'changeable',   difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'collateral',   difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      // added 5
      { word: 'catastrophe',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'centenary',    difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'choreography', difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'circumference',difficulty: 7, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'clandestine',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
    ],
    3: [
      // existing 5  (committee replaced — already at L6S8)
      { word: 'commensurate', difficulty: 7, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'comparative',  difficulty: 7, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
      { word: 'concurrent',   difficulty: 7, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'consensus',    difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
      { word: 'controversy',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      // added 5
      { word: 'coincidence',  difficulty: 7, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'colloquial',   difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'compassion',   difficulty: 7, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'complimentary',difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'condescending',difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
    ],
    4: [
      // existing 5  (curiosity replaced — already at L6S9)
      { word: 'correlation',  difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'corroborate',  difficulty: 7, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
      { word: 'defendant',    difficulty: 7, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'descendant',   difficulty: 7, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'deteriorate',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'counterpart',  difficulty: 7, pattern: 'er_suffix',      patternType: 'morphological', frequency: 'medium' },
      { word: 'credibility',  difficulty: 7, pattern: 'schwa',          patternType: 'morphological', frequency: 'low' },
      { word: 'criterion',    difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'culmination',  difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'curriculum',   difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
    ],
    5: [
      // existing 5
      { word: 'dilemma',      difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
      { word: 'discrepancy',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'dumbbell',     difficulty: 7, pattern: 'silent_b',       patternType: 'exceptional',   frequency: 'low' },
      { word: 'ecstasy',      difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'embarrassment',difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
      // added 5
      { word: 'delinquent',   difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'denomination', difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'deprivation',  difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'despondent',   difficulty: 7, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'devastation',  difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
    ],
    6: [
      // existing 5  (environment replaced — already at L5S5)
      { word: 'entrepreneur', difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'ephemeral',    difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'equivocate',   difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'fluorescent',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'exacerbate',   difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'equilibrium',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'euphemism',    difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'exasperate',   difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'exploitation', difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'extravagant',  difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
    ],
    7: [
      // existing 5  (guarantee replaced — already at L5S7; government replaced — already at L5S7; genealogy/harass/hierarchy kept)
      { word: 'genealogy',    difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'harass',       difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'hierarchy',    difficulty: 7, pattern: 'ie_pattern',     patternType: 'exceptional',   frequency: 'medium' },
      { word: 'idiosyncratic',difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'ignominious',  difficulty: 7, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'hallucinate',  difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'humanitarian', difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'hypocritical', difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'hypothetical', difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'illegitimate', difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
    ],
    8: [
      // existing 5  (intelligence replaced — already at L5S8; independent replaced — already at L5S8; hypocrisy/inoculate/irrelevant kept)
      { word: 'hypocrisy',    difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'inoculate',    difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'irrelevant',   difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
      { word: 'impeccable',   difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'inadvertent',  difficulty: 7, pattern: 'ence_suffix',    patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'immaculate',   difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'impartial',    difficulty: 7, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'implication',  difficulty: 7, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'improvisation',difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'indefensible', difficulty: 7, pattern: 'double_consonant', patternType: 'morphological', frequency: 'low' },
    ],
    9: [
      // existing 5  (maintenance replaced — already at L5S9; millennium kept here — replaced in L8S1)
      { word: 'liaison',      difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'maneuver',     difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'medieval',     difficulty: 7, pattern: 'ie_pattern',     patternType: 'exceptional',   frequency: 'medium' },
      { word: 'millennium',   difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'labyrinth',    difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'legislation',  difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'high' },
      { word: 'legitimate',   difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'malevolent',   difficulty: 7, pattern: 'ence_suffix',    patternType: 'exceptional',   frequency: 'low' },
      { word: 'manipulation', difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'manifestation',difficulty: 7, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
    ],
    10: [
      // existing 5  (miniature replaced — already at L5S9; millennium replaced — already at L7S9)
      { word: 'mischievous',  difficulty: 7, pattern: 'ie_pattern',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'misspell',     difficulty: 7, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'mortgage',     difficulty: 7, pattern: 'silent_t',       patternType: 'exceptional',   frequency: 'medium' },
      { word: 'noticeable',   difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'miscellaneous',difficulty: 7, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'medium' },
      // added 5
      { word: 'nonchalant',   difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'obsolescence', difficulty: 7, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'omnipotent',   difficulty: 7, pattern: 'ence_suffix',    patternType: 'exceptional',   frequency: 'low' },
      { word: 'onomatopoeia', difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'ostracize',    difficulty: 7, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // LEVEL 8 — most complex, 10 words per stage
  // ─────────────────────────────────────────────────────────────
  8: {
    1: [
      // existing 5  (millennium replaced — already at L7S9; occurrence/occasionally/perseverance/persistence kept)
      { word: 'omnivorous',   difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'orchestrate',  difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'perseverance', difficulty: 8, pattern: 'ance_suffix',    patternType: 'morphological', frequency: 'low' },
      { word: 'persistence',  difficulty: 8, pattern: 'ence_suffix',    patternType: 'morphological', frequency: 'medium' },
      { word: 'perpetuate',   difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'paraphernalia',difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'parliamentary',difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'parsimonious', difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'pathogens',    difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'peculiarity',  difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
    ],
    2: [
      // existing 5
      { word: 'pharmaceutical',difficulty: 8, pattern: 'schwa',         patternType: 'exceptional',   frequency: 'low' },
      { word: 'playwright',   difficulty: 8, pattern: 'silent_gh',      patternType: 'exceptional',   frequency: 'low' },
      { word: 'pneumonia',    difficulty: 8, pattern: 'silent_p',       patternType: 'exceptional',   frequency: 'low' },
      { word: 'possession',   difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
      { word: 'precede',      difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'phenomenon',   difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'philanthropy', difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'philosophical',difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'phlegmatic',   difficulty: 8, pattern: 'silent_gh',      patternType: 'exceptional',   frequency: 'low' },
      { word: 'photosynthesis',difficulty: 8, pattern: 'schwa',         patternType: 'exceptional',   frequency: 'low' },
    ],
    3: [
      // existing 5  (privilege replaced — already at L6S1; pronunciation replaced — already at L6S2)
      { word: 'predecessor',  difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'propagate',    difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'psychology',   difficulty: 8, pattern: 'silent_p',       patternType: 'exceptional',   frequency: 'medium' },
      { word: 'preposterous', difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'presumptuous', difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'prerogative',  difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'prerequisite', difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'prestigious',  difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'predominantly',difficulty: 8, pattern: 'schwa',          patternType: 'morphological', frequency: 'medium' },
      { word: 'proliferation',difficulty: 8, pattern: 'tion_suffix',    patternType: 'morphological', frequency: 'low' },
    ],
    4: [
      // existing 5
      { word: 'questionnaire',difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'reconnaissance',difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
      { word: 'referred',     difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'high' },
      { word: 'reverberate',  difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'revocable',    difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'quarantine',   difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'quintessential',difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'recalcitrant', difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'reciprocate',  difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'reconciliation',difficulty: 8, pattern: 'tion_suffix',   patternType: 'morphological', frequency: 'low' },
    ],
    5: [
      // existing 5  (restaurant replaced — already at L4S9)
      { word: 'recalculate',  difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'religious',    difficulty: 8, pattern: 'ous_suffix',     patternType: 'morphological', frequency: 'high' },
      { word: 'renaissance',  difficulty: 8, pattern: 'ance_suffix',    patternType: 'exceptional',   frequency: 'medium' },
      { word: 'reservoir',    difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'reminiscent',  difficulty: 8, pattern: 'ence_suffix',    patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'rehabilitation',difficulty: 8, pattern: 'tion_suffix',   patternType: 'morphological', frequency: 'medium' },
      { word: 'relinquish',   difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'reminiscence', difficulty: 8, pattern: 'ence_suffix',    patternType: 'exceptional',   frequency: 'low' },
      { word: 'rendezvous',   difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'repercussion', difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
    ],
    6: [
      // existing 5  (rhythm replaced — already at L6S4)
      { word: 'righteous',    difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'sacrilegious', difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'schedule',     difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'high' },
      { word: 'scissors',     difficulty: 8, pattern: 'silent_c',       patternType: 'exceptional',   frequency: 'low' },
      { word: 'scrupulous',   difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'rambunctious', difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'rapturous',    difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'ravenous',     difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'reciprocal',   difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'reckless',     difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
    ],
    7: [
      // existing 5
      { word: 'sanctimonious',difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'seize',        difficulty: 8, pattern: 'ei_pattern',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'soliloquy',    difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'sergeant',     difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'supersede',    difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'sanguine',     difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'scintillate',  difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'scrupulously', difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'medium' },
      { word: 'semiannual',   difficulty: 8, pattern: 'double_consonant', patternType: 'morphological', frequency: 'medium' },
      { word: 'sequester',    difficulty: 8, pattern: 'er_suffix',      patternType: 'exceptional',   frequency: 'low' },
    ],
    8: [
      // existing 5  (twelfth replaced — already at L6S6)
      { word: 'surveillance', difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'surreptitious',difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'threshold',    difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'medium' },
      { word: 'tyranny',      difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'medium' },
      { word: 'tangential',   difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'superfluous',  difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'supercilious', difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'synchronize',  difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'synonymous',   difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'temperamental',difficulty: 8, pattern: 'ment_suffix',    patternType: 'morphological', frequency: 'low' },
    ],
    9: [
      // existing 5  (vacuum replaced — already at L6S7)
      { word: 'utilitarian',  difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'vicious',      difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'medium' },
      { word: 'warranty',     difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'Wednesday',    difficulty: 8, pattern: 'silent_d',       patternType: 'exceptional',   frequency: 'medium' },
      { word: 'vicarious',    difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'ubiquitous',   difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'unconscionable',difficulty: 8, pattern: 'schwa',         patternType: 'exceptional',   frequency: 'low' },
      { word: 'unequivocal',  difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'unprecedented',difficulty: 8, pattern: 'ence_suffix',    patternType: 'exceptional',   frequency: 'medium' },
      { word: 'unscrupulous', difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
    ],
    10: [
      // existing 5
      { word: 'weird',        difficulty: 8, pattern: 'ei_pattern',     patternType: 'exceptional',   frequency: 'medium' },
      { word: 'withhold',     difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'zealous',      difficulty: 8, pattern: 'ous_suffix',     patternType: 'exceptional',   frequency: 'low' },
      { word: 'zucchini',     difficulty: 8, pattern: 'double_consonant', patternType: 'exceptional', frequency: 'low' },
      { word: 'zoological',   difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      // added 5
      { word: 'wherewithal',  difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'whimsical',    difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'wrought',      difficulty: 8, pattern: 'ough_aw',        patternType: 'exceptional',   frequency: 'low' },
      { word: 'xenophobia',   difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
      { word: 'xylophone',    difficulty: 8, pattern: 'schwa',          patternType: 'exceptional',   frequency: 'low' },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// Utility exports
// ─────────────────────────────────────────────────────────────

export function getWordsForStage(level: number, stage: number): SpellingWord[] {
  return spellingData[level]?.[stage] || [];
}

export function getWordsByPattern(pattern: string): SpellingWord[] {
  const results: SpellingWord[] = [];
  for (const level of Object.values(spellingData)) {
    for (const stage of Object.values(level)) {
      results.push(...stage.filter(w => w.pattern === pattern));
    }
  }
  return results;
}

export function getWordsForPlacement(): SpellingWord[] {
  // Returns a sample of words across levels and stages for adaptive placement
  const sample: SpellingWord[] = [];
  const levelsToSample = [1, 2, 3, 4, 5, 6, 7, 8];
  const stagesToSample = [1, 5, 10];
  for (const level of levelsToSample) {
    for (const stage of stagesToSample) {
      const words = spellingData[level]?.[stage] || [];
      if (words.length > 0) sample.push(words[0]);
    }
  }
  return sample;
}
