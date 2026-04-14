// ─────────────────────────────────────────────────────────────
// Audio — Web Speech API (SpeechSynthesis)
// ─────────────────────────────────────────────────────────────

/**
 * Speaks a word aloud using the browser's SpeechSynthesis API.
 * Rate is slightly reduced for clarity with young learners.
 */
export function speakWord(word: string): void {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // stop any in-progress speech
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate  = 0.85;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

export function isSpeechAvailable(): boolean {
  return 'speechSynthesis' in window;
}
