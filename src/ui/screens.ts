// ─────────────────────────────────────────────────────────────
// UI Screens
// Each screen renders into #app and calls back into App
// for state transitions.
// ─────────────────────────────────────────────────────────────

import { speakWord } from './audio';
import { PlacementItem } from '../engine/types';

// Level descriptions shown on the dashboard
const LEVEL_NAMES: Record<number, string> = {
  1: 'Simple sounds',
  2: 'Spelling patterns',
  3: 'Tricky vowels',
  4: 'Word families',
  5: 'Long words',
  6: 'Word experts',
  7: 'Sophisticated',
  8: 'Master level',
};

// ── Helpers ───────────────────────────────────────────────────

function el(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html.trim();
  return div.firstElementChild as HTMLElement;
}

function setApp(html: string): HTMLElement {
  const app = document.getElementById('app')!;
  app.innerHTML = html;
  return app;
}

function letterSlotsHTML(display: string[]): string {
  return display.map(ch =>
    ch === '_'
      ? `<span class="letter-slot blank">_</span>`
      : `<span class="letter-slot revealed">${ch}</span>`
  ).join('');
}

// ── Login Screen ──────────────────────────────────────────────

export interface LoginCallbacks {
  onLogin: (username: string, saveProgress: boolean) => void;
}

export function renderLogin(savedUsername: string | null, cb: LoginCallbacks): void {
  const greeting = savedUsername
    ? `<p class="app-tagline">Welcome back, <strong>${savedUsername}</strong>!</p>`
    : `<p class="app-tagline">Learn to spell, one star at a time</p>`;

  setApp(`
    <div class="app-logo">⭐</div>
    <div class="app-name">Spelling Stars</div>
    ${greeting}
    <div class="card">
      <div class="card-title">What's your name?</div>
      <input
        type="text"
        id="username-input"
        placeholder="Type your name…"
        value="${savedUsername ?? ''}"
        maxlength="30"
        autocomplete="off"
      />
      <label class="checkbox-row mt-12">
        <input type="checkbox" id="save-progress" ${savedUsername ? 'checked' : ''} />
        Save my progress for next time
      </label>
      <div class="mt-16">
        <button class="btn-primary" id="login-btn">Let's go! →</button>
      </div>
    </div>
  `);

  const input  = document.getElementById('username-input') as HTMLInputElement;
  const saveEl = document.getElementById('save-progress') as HTMLInputElement;
  const btn    = document.getElementById('login-btn')!;

  input.focus();

  const submit = () => {
    const name = input.value.trim();
    if (!name) { input.focus(); return; }
    cb.onLogin(name, saveEl.checked);
  };

  btn.addEventListener('click', submit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
}

// ── Dashboard Screen ──────────────────────────────────────────

export interface DashboardCallbacks {
  onStartPlacement: () => void;
  onGoToLevel: (level: number) => void;
}

export interface DashboardData {
  username: string;
  totalPoints: number;
  badges: Array<{ type: string; level: number; stage: number | null }>;
  levels: Record<number, { stagesComplete: number; preview: boolean; complete: boolean }>;
  placementDone: boolean;
  placementRecommendation: { level: number } | null;
}

export function renderDashboard(data: DashboardData, cb: DashboardCallbacks): void {
  const totalLevels = 8;

  const levelRows = Array.from({ length: totalLevels }, (_, i) => {
    const lvl  = i + 1;
    const prog = data.levels[lvl];
    const isLevel1 = lvl === 1;
    const isUnlocked = isLevel1 || prog?.preview || prog?.complete;
    const isComplete = prog?.complete ?? false;
    const isPreview  = (prog?.preview ?? false) && !isComplete;
    const stages     = prog?.stagesComplete ?? 0;
    const isRecommended = data.placementRecommendation?.level === lvl;

    let status = '🔒';
    if (isComplete)  status = '🏅';
    else if (isPreview) status = '🔓';
    else if (isUnlocked) status = '▶️';

    const lockedClass = isUnlocked ? '' : 'locked';
    const highlight   = isRecommended ? 'style="border: 2px solid var(--gold);"' : '';

    return `
      <div class="level-row ${lockedClass}" data-level="${lvl}" ${highlight}>
        <div class="level-num">${lvl}</div>
        <div class="level-info">
          <div class="level-name">${LEVEL_NAMES[lvl] ?? `Level ${lvl}`}${isRecommended ? ' ⭐ Recommended' : ''}</div>
          <div class="level-sub">${isUnlocked ? `${stages}/10 stages` : 'Locked'}</div>
        </div>
        <div class="level-status">${status}</div>
      </div>
    `;
  }).join('');

  const masteryBadge = data.badges.find(b => b.type === 'mastery');
  const badgeCount   = data.badges.length;

  const placementBtn = !data.placementDone
    ? `<button class="btn-secondary" id="placement-btn">🔍 Find my level</button>`
    : '';

  setApp(`
    <div class="card">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
        <div class="card-title">Hi, ${data.username}! ${masteryBadge ? '🏆' : '⭐'}</div>
        <div class="stat-chip gold">⭐ ${data.totalPoints} pts</div>
      </div>
      ${badgeCount > 0 ? `<div class="muted">${badgeCount} badge${badgeCount !== 1 ? 's' : ''} earned</div>` : ''}
      ${placementBtn}
      <div class="divider"></div>
      <div class="level-grid">${levelRows}</div>
    </div>
  `);

  document.getElementById('placement-btn')?.addEventListener('click', cb.onStartPlacement);

  document.querySelectorAll('.level-row:not(.locked)').forEach(row => {
    row.addEventListener('click', () => {
      const lvl = parseInt((row as HTMLElement).dataset['level'] ?? '1', 10);
      cb.onGoToLevel(lvl);
    });
  });
}

// ── Placement Screen ──────────────────────────────────────────

export interface PlacementCallbacks {
  onAnswer: (input: string) => void;
  onSkip: () => void;
}

export function renderPlacement(item: PlacementItem, cb: PlacementCallbacks): void {
  const pct = Math.round((item.itemNumber / item.total) * 100);

  setApp(`
    <div class="card">
      <div class="card-title">Finding your level…</div>
      <div class="card-subtitle">Item ${item.itemNumber} of ${item.total}</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
      <div class="mt-16 text-center">
        <button class="btn-audio" id="audio-btn">🔊 Say the word</button>
      </div>
      <div class="letter-display mt-16">${letterSlotsHTML(item.display)}</div>
      <input
        type="text"
        id="answer-input"
        placeholder="Type the word…"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
      />
      <div class="mt-12" style="display:flex; gap:8px;">
        <button class="btn-primary" id="check-btn">Check ✓</button>
        <button class="btn-secondary btn-sm" id="skip-btn">Skip placement</button>
      </div>
    </div>
  `);

  const input = document.getElementById('answer-input') as HTMLInputElement;
  input.focus();
  speakWord(item.word);

  document.getElementById('audio-btn')!.addEventListener('click', () => speakWord(item.word));

  const submit = () => {
    const val = input.value.trim();
    if (!val) { input.focus(); return; }
    cb.onAnswer(val);
  };

  document.getElementById('check-btn')!.addEventListener('click', submit);
  document.getElementById('skip-btn')!.addEventListener('click', cb.onSkip);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
}

export function renderPlacementFeedback(
  isCorrect: boolean,
  correctWord: string,
  onNext: () => void
): void {
  const feedback = document.querySelector('.card');
  if (!feedback) return;

  // Append feedback below the input
  const msg = el(`
    <div class="feedback ${isCorrect ? 'correct' : 'incorrect'} mt-12">
      ${isCorrect ? `✓ Great! "${correctWord}"` : `The word was: "${correctWord}"`}
    </div>
  `);
  feedback.appendChild(msg);

  setTimeout(() => onNext(), 1200);
}

// ── Quiz Screen ───────────────────────────────────────────────

export interface QuizCallbacks {
  onAnswer: (input: string) => void;
}

export interface QuizData {
  level: number;
  stage: number;
  scaffoldLevel: number;
  display: string[];
  word: string;
  pointValue: number;
  totalPoints: number;
  currentStreak: number;
  quizCorrect: number;
  quizTotal: number;       // words presented so far
  quizLength: number;      // total words in this quiz
  isNearMasteryItem: boolean;
}

export function renderQuiz(data: QuizData, cb: QuizCallbacks): void {
  const progressPct = data.quizLength > 0
    ? Math.round((data.quizTotal / data.quizLength) * 100)
    : 0;

  const streakChip = data.currentStreak >= 3
    ? `<div class="stat-chip orange">🔥 ${data.currentStreak}</div>`
    : '';

  const nearMasteryNote = data.isNearMasteryItem
    ? `<div class="muted text-center mt-8">⭐ Bonus word — same pattern</div>`
    : '';

  setApp(`
    <div class="card">
      <div class="stats-row">
        <div class="stat-chip">Level ${data.level} · Stage ${data.stage}</div>
        <div class="stat-chip gold">⭐ ${data.totalPoints}</div>
        ${streakChip}
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-bar-fill" style="width:${progressPct}%"></div>
      </div>
      <div class="muted text-center mt-8">${data.quizCorrect} correct so far</div>
      ${nearMasteryNote}
      <div class="mt-16 text-center">
        <button class="btn-audio" id="audio-btn">🔊 Say the word</button>
      </div>
      <div class="letter-display">${letterSlotsHTML(data.display)}</div>
      <div class="muted text-center" style="font-size:0.8rem;">
        +${data.pointValue} pts if correct
      </div>
      <input
        type="text"
        id="answer-input"
        placeholder="Type the spelling…"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        class="mt-12"
      />
      <div id="feedback" class="feedback empty"></div>
      <button class="btn-primary mt-12" id="check-btn">Check ✓</button>
    </div>
  `);

  const input = document.getElementById('answer-input') as HTMLInputElement;
  input.focus();
  speakWord(data.word);

  document.getElementById('audio-btn')!.addEventListener('click', () => speakWord(data.word));

  const submit = () => {
    const val = input.value.trim();
    if (!val) { input.focus(); return; }
    // Disable input while feedback shows
    input.disabled = true;
    (document.getElementById('check-btn') as HTMLButtonElement).disabled = true;
    cb.onAnswer(val);
  };

  document.getElementById('check-btn')!.addEventListener('click', submit);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
}

export function showQuizFeedback(
  isCorrect: boolean,
  pointsEarned: number,
  correctWord: string,
  onNext: () => void
): void {
  const feedback = document.getElementById('feedback');
  if (!feedback) return;

  if (isCorrect) {
    feedback.className = 'feedback correct';
    feedback.textContent = `✓ +${pointsEarned} points!`;
  } else {
    feedback.className = 'feedback incorrect';
    feedback.textContent = `The word is: "${correctWord}" — let's try with a hint`;
  }

  setTimeout(onNext, 1500);
}

// ── Stage Complete Screen ─────────────────────────────────────

export interface StageCompleteCallbacks {
  onClaimBonus: () => void;
  onContinue: () => void;
}

export interface StageCompleteData {
  level: number;
  stage: number;
  passed: boolean;
  totalPoints: number;
  bonusAvailable: boolean;
  newBadges: Array<{ type: string }>;
}

export function renderStageComplete(data: StageCompleteData, cb: StageCompleteCallbacks): void {
  const hasBadge = data.newBadges.length > 0;
  const badge    = data.newBadges[0];

  const badgeSection = hasBadge ? `
    <div class="celebrate">${badge?.type === 'level' ? '🏅' : '🥈'}</div>
    <div class="text-center mt-8" style="font-weight:700; color:var(--green-dark);">
      ${badge?.type === 'level' ? 'Level badge earned!' : 'Stage badge earned!'}
    </div>
  ` : '';

  const resultMsg = data.passed
    ? `Stage ${data.stage} complete!`
    : `Stage ${data.stage} — keep practising!`;

  setApp(`
    <div class="card text-center">
      <div class="celebrate">${data.passed ? '🎉' : '💪'}</div>
      <div class="card-title mt-12">${resultMsg}</div>
      <div class="stat-chip gold" style="margin: 8px auto; width:fit-content;">
        ⭐ ${data.totalPoints} pts total
      </div>
      ${badgeSection}
      ${data.bonusAvailable ? `
        <div class="divider"></div>
        <div class="muted">You earned a bonus!</div>
        <button class="btn-gold mt-12" id="bonus-btn">🎁 Collect bonus points!</button>
      ` : ''}
      <button class="btn-primary mt-16" id="continue-btn">
        ${data.passed ? 'Next stage →' : 'Try again →'}
      </button>
    </div>
  `);

  document.getElementById('bonus-btn')?.addEventListener('click', () => {
    cb.onClaimBonus();
  });

  document.getElementById('continue-btn')!.addEventListener('click', cb.onContinue);
}

export function showBonusResult(amount: number, newTotal: number): void {
  const btn = document.getElementById('bonus-btn');
  if (!btn) return;
  btn.textContent = `🎉 +${amount} bonus points! (${newTotal} total)`;
  (btn as HTMLButtonElement).disabled = true;
  btn.className = 'btn-secondary mt-12';
}

// ── Level Complete Screen ─────────────────────────────────────

export interface LevelCompleteCallbacks {
  onContinue: () => void;
}

export function renderLevelComplete(
  level: number,
  totalPoints: number,
  cb: LevelCompleteCallbacks
): void {
  setApp(`
    <div class="card text-center">
      <div class="celebrate">🏅</div>
      <div class="app-name mt-12">Level ${level} Complete!</div>
      <div class="card-subtitle mt-8">
        You mastered all 10 stages — gold badge earned!
      </div>
      <div class="stat-chip gold" style="margin: 12px auto; width:fit-content;">
        ⭐ ${totalPoints} pts total
      </div>
      <button class="btn-primary mt-20" id="continue-btn">Next level →</button>
    </div>
  `);

  document.getElementById('continue-btn')!.addEventListener('click', cb.onContinue);
}

// ── Placement Result Screen ───────────────────────────────────

export interface PlacementResultCallbacks {
  onAccept: () => void;
  onStartAtLevel1: () => void;
}

export function renderPlacementResult(
  recommendation: { level: number; scaffold: number },
  cb: PlacementResultCallbacks
): void {
  setApp(`
    <div class="card text-center">
      <div class="celebrate">🔍</div>
      <div class="card-title mt-12">Your starting level</div>
      <div class="card-subtitle">Based on your answers, we recommend:</div>
      <div style="font-size:2rem; font-weight:800; color:var(--green-dark); margin:16px 0;">
        Level ${recommendation.level}
      </div>
      <div class="muted">${LEVEL_NAMES[recommendation.level] ?? ''}</div>
      <button class="btn-primary mt-20" id="accept-btn">
        Start at Level ${recommendation.level} →
      </button>
      <button class="btn-secondary mt-8" id="level1-btn">
        Start at Level 1 instead
      </button>
    </div>
  `);

  document.getElementById('accept-btn')!.addEventListener('click', cb.onAccept);
  document.getElementById('level1-btn')!.addEventListener('click', cb.onStartAtLevel1);
}
