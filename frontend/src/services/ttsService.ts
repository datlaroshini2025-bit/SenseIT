let activeUtterance: SpeechSynthesisUtterance | null = null;

export function speak(text: string, rate = 1) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1;
  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  activeUtterance = null;
}

export function pauseSpeaking() {
  if ("speechSynthesis" in window) window.speechSynthesis.pause();
}

export function resumeSpeaking() {
  if ("speechSynthesis" in window) window.speechSynthesis.resume();
}

export function isSpeaking() {
  return "speechSynthesis" in window && window.speechSynthesis.speaking;
}