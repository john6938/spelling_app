// ─────────────────────────────────────────────────────────────
// Audio — Web Speech API (SpeechSynthesis)
// ─────────────────────────────────────────────────────────────

let cachedVoice: SpeechSynthesisVoice | null | undefined = undefined;

function selectGBFemaleVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find(v => v.name === 'Google UK English Female') ??
    voices.find(v => v.lang === 'en-GB' && v.name.toLowerCase().includes('female')) ??
    voices.find(v => v.lang === 'en-GB') ??
    null
  );
}

/**
 * Call once at app boot. Listens for voiceschanged and caches the preferred
 * GB Female voice so it is ready before the learner first hears a word.
 */
export function primeVoices(): void {
  if (!('speechSynthesis' in window)) return;
  const tryCache = () => {
    const v = selectGBFemaleVoice();
    if (v) cachedVoice = v;
  };
  window.speechSynthesis.addEventListener('voiceschanged', tryCache);
  tryCache(); // works immediately on Firefox; no-op on Chrome until event fires
}

function getGBFemaleVoice(): SpeechSynthesisVoice | null {
  return cachedVoice !== undefined ? cachedVoice : selectGBFemaleVoice();
}

function makeUtterance(word: string): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate  = 0.85;
  utterance.pitch = 1.1;
  const voice = getGBFemaleVoice();
  if (voice) utterance.voice = voice;
  return utterance;
}

/**
 * Speaks a word aloud twice with a short pause, using GB English Female voice.
 */
export function speakWord(word: string): void {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  const first = makeUtterance(word);
  first.onend = () => {
    setTimeout(() => {
      window.speechSynthesis.speak(makeUtterance(word));
    }, 600);
  };

  window.speechSynthesis.speak(first);
}

export function isSpeechAvailable(): boolean {
  return 'speechSynthesis' in window;
}
