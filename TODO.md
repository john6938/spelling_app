# Spelling App — TODO

## Design & UX
- [ ] Improve colour scheme — replace indigo/purple/pink gradients with something more appropriate for young learners (current scheme noted as disliked)
- [ ] Replace placeholder icons (XCircle, Trophy, etc.) with bespoke images — deferred to later phase

## Architecture Decisions Needed
See FIGMA_VS_SPEC.md for full breakdown of divergences between the Figma prototype and the project spec. The following require explicit decisions before implementation begins:

- [x] **Login / persistence** — Keep username login. Opt-in localStorage consent prompt on first visit. Switch from js-cookie to localStorage.
- [x] **Level unlock rule** — Unlock next level for exploration at 5/10 stages (preview state). Full completion credit + gold badge only at 10/10 mastered. Dashboard must visually distinguish preview vs fully earned.
- [x] **Points scaling** — Scaffold-scaled: S0=5pts, S1=10pts, S2=15pts, S3=20pts, S4=25pts.
- [x] **Bonus trigger** — Always shown after stage completion. Fix bug: bonus points must be saved to totalPoints.
- [x] **Quiz length** — Tiered mastery: L1-2 = 5 words/3 correct, L3-5 = 10 words/8 correct, L6-8 = 10 words/9 correct + bonus verification word.
- [x] **Scaffolding system** — 5 levels: S0=full word, S1=vowels blanked, S2=consonants only (ambiguous consonants also blanked), S3=first letter only, S4=audio only. Points scale S0–S4: 5/10/15/20/25pts.
- [x] **Adaptive placement** — Optional. Dashboard shows "Find my level" button on first visit. Runs ~20-item placement sequence sampling across levels and scaffold levels, then highlights recommended starting level. Level 1 always accessible if skipped.
- [x] **Near-mastery verification item** — Implemented at L6-8 only (9/10 triggers 1 bonus word targeting same pattern, at learner's best scaffold level). See quiz length decision.
- [x] **Error response** — Both: reveal correct spelling and move on after 1.5s (Figma) AND increase scaffold level for the next word (spec). No progress reset, no penalty.

## Implementation (post-decisions)
- [ ] Define scaffold levels formally (exact steps per word, step-up/step-down rules)
- [ ] Define within-stage mastery threshold (e.g. is 9/10 the actual threshold or illustrative?)
- [x] Build lexical data layer (words organised by level, stage, and linguistic challenge type)
- [x] Build learning engine (placement, scaffolding, mastery, progression) — separate from motivation
- [ ] Build motivation system (points, streaks, bonus) — separate from learning engine
- [ ] Build recognition system (badge awards tied to learning milestones only)
- [ ] Build UI (child-friendly, revised colour scheme)
- [ ] Wire audio (Web Speech API / SpeechSynthesis)
- [ ] End-to-end test: adaptive placement → level completion → badge award
