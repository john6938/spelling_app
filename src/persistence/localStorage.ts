// ─────────────────────────────────────────────────────────────
// localStorage persistence
// Saves and restores all three system states.
// Only active if the learner opted in at login.
// ─────────────────────────────────────────────────────────────

import { LearnerState } from '../engine/types';
import { MotivationState } from '../motivation/types';
import { RecognitionState } from '../recognition/types';

const KEYS = {
  consent:     'spelling_consent',
  learner:     'spelling_learner',
  motivation:  'spelling_motivation',
  recognition: 'spelling_recognition',
};

export interface SavedSession {
  learner:     LearnerState;
  motivation:  MotivationState;
  recognition: RecognitionState;
}

export function hasConsent(): boolean {
  return localStorage.getItem(KEYS.consent) === 'true';
}

export function setConsent(value: boolean): void {
  localStorage.setItem(KEYS.consent, String(value));
}

export function saveSession(session: SavedSession): void {
  if (!hasConsent()) return;
  localStorage.setItem(KEYS.learner,     JSON.stringify(session.learner));
  localStorage.setItem(KEYS.motivation,  JSON.stringify(session.motivation));
  localStorage.setItem(KEYS.recognition, JSON.stringify(session.recognition));
}

export function loadSession(): SavedSession | null {
  if (!hasConsent()) return null;
  try {
    const learner     = localStorage.getItem(KEYS.learner);
    const motivation  = localStorage.getItem(KEYS.motivation);
    const recognition = localStorage.getItem(KEYS.recognition);
    if (!learner || !motivation || !recognition) return null;
    return {
      learner:     JSON.parse(learner),
      motivation:  JSON.parse(motivation),
      recognition: JSON.parse(recognition),
    };
  } catch {
    return null;
  }
}

export function clearSession(): void {
  localStorage.removeItem(KEYS.learner);
  localStorage.removeItem(KEYS.motivation);
  localStorage.removeItem(KEYS.recognition);
}

export function getSavedUsername(): string | null {
  try {
    const learner = localStorage.getItem(KEYS.learner);
    if (!learner) return null;
    const parsed: LearnerState = JSON.parse(learner);
    return parsed.username ?? null;
  } catch {
    return null;
  }
}
