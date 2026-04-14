# Figma Prototype vs Project Specification — Divergence Analysis

This document maps every known divergence between the Figma-derived prototype design and the formal project specification. Each item requires a deliberate decision before implementation.

---

## Summary Table

| Feature | Figma Prototype | Project Spec | Alignment |
|---------|----------------|--------------|-----------|
| Login / accounts | Cookie-based login, persistent progress | No accounts, no cross-session persistence | ❌ Conflict |
| Level structure | 8 levels × 10 stages | Extensible levels × 10 stages (count not fixed) | ~ Compatible |
| Level unlock rule | Complete ≥ 5/10 stages in previous level | All 10 stages of current level mastered | ❌ Conflict |
| Scaffolding | Not present | First-class mechanism; drives all difficulty | ❌ Missing |
| Adaptive placement | Not present | ~20 items on first use; no forced start at L1 | ❌ Missing |
| Quiz length | Fixed 5 words per stage | Variable — determined by mastery evidence | ❌ Conflict |
| Near-mastery rule | Not present | Verification item at ≤ best scaffold on ~9/10 | ❌ Missing |
| Points per correct | Flat 10 points | Scales with scaffold level (less help = more pts) | ❌ Conflict |
| Bonus trigger | After each stage completion | After streak of consecutive correct answers | ❌ Conflict |
| Bonus amount | Random 10–59 points | Bounded random (similar intent) | ~ Compatible |
| Stage badge | Silver badge per stage | Stage badge per stage completion | ✅ Aligned |
| Level badge | 10 silver → 1 gold on level complete | Level badge upgrades stage badges on level complete | ✅ Aligned |
| Final mastery badge | Not explicitly mentioned | Awarded on all-levels completion | ~ Compatible |
| Audio | Web Speech API (SpeechSynthesis) | Click-to-hear; implementation not specified | ✅ Compatible |
| Feedback framing | Immediate visual feedback | Immediate, **neutrally framed** feedback | ~ Needs check |
| Error response | Implied: mark wrong, move on | Increase scaffold support; no penalty | ❌ Conflict |
| Colour scheme | Indigo/purple/pink gradients | Child-friendly (specific colours TBD) | ⚠️ Disliked |

---

## Detailed Notes

### 1. Login / Persistence
**Figma:** Cookie-based username login; progress persists across sessions.
**Spec:** Explicitly states no user accounts, no sign-in, no cross-session persistence. All state held in memory for the session duration.
**DECIDED:** Keep username login. On first visit show a child-friendly opt-in prompt ("Save my progress next time?"). If yes: persist to localStorage after each stage. If no: memory-only for the session. Switch from js-cookie to localStorage (cleaner for client-side apps — no HTTP overhead, 5MB limit vs 4KB).

---

### 2. Level Unlock Rule
**Figma:** A level unlocks when the learner completes ≥ 5 of the 10 stages in the previous level.
**Spec:** Level completion requires all 10 stages completed. Progression to the next level follows from full mastery of the current.
**DECIDED:** Middle ground. Next level unlocks to explore after 5/10 stages complete (visual "preview" state). Full level completion credit and gold badge awarded only when all 10 stages are mastered. Dashboard UI should visually distinguish preview-unlocked levels from fully-earned progression.

---

### 3. Scaffolding System
**Figma:** No scaffold mechanism — every word is presented identically (hear + blank input box).
**Spec:** Orthographic scaffolding is the primary difficulty-control mechanism. Correct answers reduce support; errors restore it. Consonant/vowel visibility is controlled deliberately. This is the core adaptive mechanism.
**Decision needed:** Must be implemented per spec. This is not optional — without scaffolding, the system cannot be described as an adaptive tutoring environment.

---

### 4. Adaptive Placement
**Figma:** No placement phase — all learners start at Level 1, Stage 1.
**Spec:** ~20-item placement sequence samples lexical difficulty and scaffold levels to converge on an appropriate starting point. Placement is embedded in early learning activity, not a separate test.
**Decision needed:** Must be implemented per spec for the prototype to meet its stated success criteria.

---

### 5. Quiz / Stage Length
**Figma:** Fixed 5 words per stage.
**Spec:** Stage length is variable and mastery-determined. A stage ends when the learner demonstrates stable, error-free performance under appropriately low scaffold — not after a fixed count.
**DECIDED:** Tiered mastery system:
| Levels | Words per stage | Mastery criterion | Bonus verification |
|--------|----------------|-------------------|--------------------|
| 1–2 | 5 | 3/5 correct (60%) | No |
| 3–5 | 10 | 8/10 correct (80%) | No |
| 6–8 | 10 | 9/10 correct (90%) | Yes — 1 word targeting same pattern as error, at learner's best scaffold level |

Errors trigger scaffold increase throughout. Stage is replayable if mastery not reached.

---

### 6. Near-Mastery Verification Item
**Figma:** No near-mastery rule.
**Spec:** When a learner is near mastery (illustrative example: 9/10 correct), a single verification item is presented targeting the same constraint as the error, at no higher scaffold than the learner's best prior success.
**Decision needed:** Implement per spec. The threshold (is 9/10 literal?) needs to be confirmed.

---

### 7. Points Scaling
**Figma:** Flat 10 points per correct answer regardless of difficulty.
**Spec:** Points scale with scaffold level — less scaffolded or fully blank spellings earn more points. This creates an incentive aligned with the pedagogical goal (independence from support).
**DECIDED:** Scaffold-scaled points. Scaffold 0 (full word) = 5 pts, Scaffold 1 = 10 pts, Scaffold 2 = 15 pts, Scaffold 3 = 20 pts, Scaffold 4 (audio only) = 25 pts.

---

### 8. Bonus Trigger
**Figma:** Bonus button appears after completing each stage; learner clicks to reveal 10–59 random bonus points.
**Spec:** Bonus button appears after a streak of consecutive correct answers during the session; randomised reward within bounded limits.
**DECIDED:** Bonus button always appears after every stage completion (Figma model). Random 10–59 points. Fix the existing bug where bonus points are displayed but never saved to totalPoints.

---

### 9. Error Response
**Figma:** Implied: mark incorrect, move to next item, no adaptive response.
**Spec:** Errors trigger scaffold increase (more support is shown on the next item). Errors never reset progress or penalise the learner. This is central to the dynamic assessment model.
**Decision needed:** Must be implemented per spec. The Figma error model is inconsistent with the stated theoretical grounding.

---

### 10. Feedback Framing
**Figma:** Visual feedback (animated celebrations, error states).
**Spec:** Feedback must be **neutrally framed** — no punishment language for errors.
**Decision needed:** Celebrations on correct answers are fine. Ensure error states are supportive/neutral rather than negative (e.g. "Let's try with a hint" not "Wrong!").
