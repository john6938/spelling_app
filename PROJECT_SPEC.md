# Spelling App — Project Specification

## Purpose

Develop an initial prototype of a web-based spelling learning application for young learners. The prototype demonstrates and validates the core pedagogical model, adaptive sequencing logic, and motivational framework. It is not intended as a production-ready product.

**Delivery format:** Single-page web app using standard web technologies (no build tools required for prototype).
**No requirement for:** user accounts, sign-in, cross-session persistence, backend services, or analytics.
**Learner state:** held in memory for the duration of a session only.
**Priority:** clarity and inspectability of logic over optimisation or scalability.

---

## Theoretical Grounding

The system is grounded in established research on:
- **Spelling acquisition** — proficiency as an emergent skill, not rote memorisation
- **Dynamic assessment** — errors are diagnostically meaningful, not punishable failures
- **Mastery learning** — time and attempts may vary; progression requires stable, independent performance

### Developmental model of spelling
Spelling proficiency develops through the interaction of:
1. **Phonological encoding** — sound-driven strategies dominate early spelling
2. **Orthographic pattern learning** — necessary as vowel ambiguity, silent letters, and orthographic constraints emerge
3. **Morphological awareness** — required at later stages for morphologically motivated spellings

Errors trigger increased support, not penalties. The system stabilises the learner's internal representations rather than exposing gaps.

---

## Lexical Content Organisation

### Lexical Levels
Content is organised into **conceptual levels** representing dominant linguistic difficulties (not age or grade):

| Level | Primary Challenge |
|-------|-------------------|
| 1 | Simple phoneme–grapheme mapping |
| 2 | Orthographic pattern sensitivity |
| 3 | Vowel ambiguity |
| 4 | Morphological consistency |
| 5 | Lexical exceptionality |
| … | (extensible) |

- Each level contains **10 internal mastery stages** for fine-grained progress and smooth adaptive sequencing.
- Lexical levels and their contents are treated as **data, not hard-coded logic** — the architecture must support extension.

---

## Scaffolding System

Difficulty within a lexical level is controlled by **orthographic scaffolding** — how much letter information is visually presented.

### Scaffold spectrum (easier → harder)
- Full word visible
- Partially revealed form
- Consonants only
- Minimal letters
- Blank (audio only)

### Rules
- **Correct response** → reduce scaffold (withdraw support)
- **Incorrect response** → reintroduce scaffold (increase support)
- Scaffolding operates **within words and within stages** — never bypasses levels or mastery requirements
- **Consonantal information** is generally easier than vowel information, but graphemically ambiguous consonants (c, s, k) are treated as harder and introduced cautiously
- Scaffolding is a **first-class mechanism** — implemented explicitly and declaratively

---

## Adaptive Placement

When a learner first opens the app:
- The system **does not force start at the lowest level**
- Instead, it conducts **adaptive placement** over approximately **20 spelling attempts**
- Placement is **integral to early learning activity**, not a separate test
- Items vary in lexical difficulty and scaffold level
- Success → increase difficulty; failure → increase support
- Rapidly converges on an appropriate starting level and scaffold dependency
- Avoids extended trivial or demoralising sequences

---

## Mastery and Progression Logic

### Within-stage progression
- Correct attempts → positive evidence toward mastery
- Incorrect attempts → adaptive support triggered; **no progress reset, no penalty**
- **Near-mastery rule (e.g. 9/10 correct):** one bonus verification item is presented
  - Targets the same underlying linguistic constraint as the error
  - Attempted at no higher scaffold level than the learner's best prior success
- **Stage complete** when: stable, error-free performance under appropriately low scaffold

### Level progression
- **Level complete** when: all stages within that level are completed
- Level completion is treated as a **meaningful learning milestone**, not a cosmetic threshold

---

## Motivational Layer

The motivational system must **never override pedagogical decision-making**.

### Points
- Awarded only for **correct spellings**
- Scale with difficulty: less scaffolded / blank spellings earn more points
- **Never deducted** — errors yield zero points, not negative
- **Bonus mechanism:** after a streak of consecutive correct answers, a bonus button appears; learner clicks it for a randomised point reward within bounded limits
  - Purely motivational — no influence on placement, scaffolding, or progression

### Badges
- **Stage badge** — awarded on stage completion
- **Level badge** — upgrades stage badges on level completion
- **Final mastery badge** — awarded on completion of all available levels
- Badges reflect **learning milestones**, not effort alone
- Badges are **structurally and visually separate** from the points system in code and interface

---

## Functional Requirements (Prototype)

The learner should be able to:
1. Hear a spoken target word (audio playback)
2. See a scaffolded visual representation of the word
3. Input a spelling attempt
4. Receive immediate, neutrally framed feedback

The interface should display:
- Current points total
- Available bonus button (when earned)
- Earned badges
- Clear indicators of stage and level progress

**UX targets:** simple, child-friendly, deterministic enough to observe and debug adaptive logic

---

## Technical Architecture

### Separation of concerns (mandatory)
| Layer | Responsibility |
|-------|---------------|
| **Learning engine** | Placement, scaffolding, mastery, progression |
| **Motivation system** | Points, streaks, bonus mechanism |
| **Recognition system** | Badge awards — depends solely on learning engine milestones |
| **Lexical data layer** | Words, scaffold rules, level/stage definitions — declarative |
| **Learner state** | Explicit in-memory representation, inspectable |

### Data representation
- Lexical data, scaffold rules, and learner state must be **explicit and declarative**
- Logic must not be embedded implicitly in UI code

### Conflict resolution
If ambiguities arise: **pedagogical integrity, explainability, and mastery learning alignment take priority** over convenience or engagement.

---

## Success Criteria

The prototype is successful if a learner can:
1. Start the app and be adaptively placed
2. Progress through at least one lexical level via mastery-based stages
3. Experience coherent scaffold adjustment in response to performance
4. Receive motivating feedback through points and badges that does not compromise learning decisions

The system must clearly behave as an **adaptive tutoring environment**, not as a quiz or testing interface. Its logic must be sufficiently transparent to support future research, refinement, and extension.
