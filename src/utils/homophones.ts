// ─────────────────────────────────────────────────────────────
// Homophone lookup
// Maps each word to the other valid spellings of the same sound.
// When a learner types a homophone of the target word they are
// praised and redirected to the target spelling.
// ─────────────────────────────────────────────────────────────

// Each entry lists ALL spellings of a given sound together.
// The lookup is built bidirectionally so every word points to
// its siblings.
const HOMOPHONE_SETS: string[][] = [
  // Level 1–2 range
  ['sun', 'son'],
  ['rain', 'reign', 'rein'],
  ['flower', 'flour'],
  ['ball', 'bawl'],
  ['tail', 'tale'],
  ['mail', 'male'],
  ['sail', 'sale'],
  ['hair', 'hare'],
  ['bear', 'bare'],
  ['pear', 'pair', 'pare'],
  ['meat', 'meet'],
  ['feet', 'feat'],
  ['week', 'weak'],
  ['sea', 'see'],
  ['bee', 'be'],
  ['blue', 'blew'],
  ['knew', 'new'],
  ['night', 'knight'],
  ['write', 'right', 'rite'],
  ['plain', 'plane'],
  ['steal', 'steel'],
  ['heel', 'heal'],
  ['dear', 'deer'],
  ['hear', 'here'],
  ['hole', 'whole'],
  ['knot', 'not'],
  ['know', 'no'],
  ['made', 'maid'],
  ['main', 'mane'],
  ['peace', 'piece'],
  ['road', 'rode'],
  ['scene', 'seen'],
  ['threw', 'through'],
  ['wait', 'weight'],
  ['way', 'weigh'],
  ['wood', 'would'],
  ['flour', 'flower'],
  ['steak', 'stake'],
  ['cereal', 'serial'],
  ['medal', 'meddle'],
  ['profit', 'prophet'],
  ['stationary', 'stationery'],
  ['principal', 'principle'],
  ['complement', 'compliment'],
  ['affect', 'effect'],
  ['board', 'bored'],
  ['chord', 'cord'],
  ['coarse', 'course'],
  ['desert', 'dessert'],
  ['dual', 'duel'],
  ['fair', 'fare'],
  ['flair', 'flare'],
  ['forth', 'fourth'],
  ['guessed', 'guest'],
  ['heard', 'herd'],
  ['higher', 'hire'],
  ['him', 'hymn'],
  ['knave', 'nave'],
  ['lessen', 'lesson'],
  ['loan', 'lone'],
  ['morning', 'mourning'],
  ['muscle', 'mussel'],
  ['naval', 'navel'],
  ['none', 'nun'],
  ['ore', 'oar'],
  ['pail', 'pale'],
  ['pain', 'pane'],
  ['passed', 'past'],
  ['patience', 'patients'],
  ['pier', 'peer'],
  ['pole', 'poll'],
  ['pray', 'prey'],
  ['presence', 'presents'],
  ['profit', 'prophet'],
  ['read', 'reed'],
  ['real', 'reel'],
  ['role', 'roll'],
  ['root', 'route'],
  ['rows', 'rose'],
  ['soar', 'sore'],
  ['sole', 'soul'],
  ['some', 'sum'],
  ['sort', 'sought'],
  ['stairs', 'stares'],
  ['stake', 'steak'],
  ['stationary', 'stationery'],
  ['suite', 'sweet'],
  ['taut', 'taught'],
  ['team', 'teem'],
  ['their', 'there'],
  ['tide', 'tied'],
  ['toe', 'tow'],
  ['told', 'tolled'],
  ['vain', 'vane', 'vein'],
  ['waist', 'waste'],
  ['wave', 'waive'],
  ['wear', 'where'],
  ['weather', 'whether'],
  ['which', 'witch'],
  ['while', 'wile'],
  ['whine', 'wine'],
  ['who\'s', 'whose'],
  ['you\'re', 'your'],
];

// Build the bidirectional lookup map once at module load.
const LOOKUP = new Map<string, string[]>();

for (const group of HOMOPHONE_SETS) {
  for (const word of group) {
    // Siblings = all other members of the group
    LOOKUP.set(word.toLowerCase(), group.filter(w => w !== word).map(w => w.toLowerCase()));
  }
}

/**
 * Returns true if `input` is a known homophone of `target`
 * (i.e. a different valid spelling of the same sound).
 */
export function isHomophoneOf(input: string, target: string): boolean {
  const siblings = LOOKUP.get(target.toLowerCase()) ?? [];
  return siblings.includes(input.toLowerCase());
}

/**
 * Returns the other spellings of the same sound as `word`.
 * Empty array if no homophones are registered.
 */
export function getHomophones(word: string): string[] {
  return LOOKUP.get(word.toLowerCase()) ?? [];
}
