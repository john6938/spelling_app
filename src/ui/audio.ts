// ─────────────────────────────────────────────────────────────
// Audio — Web Speech API (SpeechSynthesis)
// ─────────────────────────────────────────────────────────────

function getGBFemaleVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find(v => v.name === 'Google UK English Female') ??
    voices.find(v => v.lang === 'en-GB' && v.name.toLowerCase().includes('female')) ??
    voices.find(v => v.lang === 'en-GB') ??
    null
  );
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
