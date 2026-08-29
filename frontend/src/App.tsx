import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Gauge, Mic, Radio, Settings, UserRound, Vibrate, Volume2, Play, Pause, CircleStop, Activity } from "lucide-react";
import { Logo } from "./components/Logo";
import { Toggle } from "./components/Toggle";
import { analyzeImage, checkBackend } from "./services/api";
import { speak, stopSpeaking } from "./services/ttsService";
import { useCamera } from "./hooks/useCamera";

type Screen = "welcome" | "active" | "settings";
type Speed = "slow" | "normal" | "fast";

const speedRate: Record<Speed, number> = { slow: 0.78, normal: 1, fast: 1.25 };

export default function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [hapticAlerts, setHapticAlerts] = useState(true);
  const [speed, setSpeed] = useState<Speed>("normal");
  const [listening, setListening] = useState(false);
  const [narration, setNarration] = useState("Clear path ahead.");
  const [backend, setBackend] = useState<"unknown" | "ok" | "error">("unknown");
  const [lastLatency, setLastLatency] = useState<number | null>(null);
  const [lastAnalyzed, setLastAnalyzed] = useState<string>("");
  const camera = useCamera();
  const timerRef = useRef<number | null>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    checkBackend().then(() => setBackend("ok")).catch(() => setBackend("error"));
  }, []);

  const narrateOnce = async () => {
    if (busyRef.current) return;
    const image = camera.capture();
    if (!image) {
      setNarration("Camera is not ready. Please start the camera.");
      speak("Camera is not ready. Please start the camera.", speedRate[speed]);
      return;
    }
    busyRef.current = true;
    const started = performance.now();
    try {
      const result = await analyzeImage(image, "Describe the scene and mention important obstacles, especially what is directly ahead and anything on the left or right.");
      const latency = Math.round(performance.now() - started);
      setLastLatency(latency);
      setLastAnalyzed(new Date().toLocaleTimeString());
      setNarration(result.text);
      if (voiceGuidance) speak(result.text, speedRate[speed]);
    } catch {
      setNarration("I couldn't analyze the scene right now.");
      if (voiceGuidance) speak("I couldn't analyze the scene right now.", speedRate[speed]);
    } finally {
      busyRef.current = false;
    }
  };

  const startActive = async () => {
    setScreen("active");
    if (camera.status !== "ready") await camera.start();
  };

  const toggleListening = async () => {
    if (listening) {
      setListening(false);
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
      stopSpeaking();
      return;
    }
    if (camera.status !== "ready") await camera.start();
    setListening(true);
    await narrateOnce();
    timerRef.current = window.setInterval(narrateOnce, 3500);
  };

  useEffect(() => () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    stopSpeaking();
  }, []);

  if (screen === "welcome") {
    return (
      <main className="app-shell">
        <section className="phone welcome-screen">
          <div className="welcome-inner">
            <Logo />
            <div className="welcome-mic" aria-hidden="true"><Mic size={70} strokeWidth={2} /></div>
            <div className="ready-label">READY</div>
            <div className="welcome-card">
              <UserRound size={22} className="cyan-icon" />
              <p>Welcome to Sense IT.<br />Your intelligent<br />navigation assistant. I<br />am ready to assist you.<br />Say 'Start' when you are<br />ready.</p>
            </div>
            <button className="primary-button" onClick={startActive} aria-label="Start Sense IT">
              <Play size={18} fill="currentColor" /> START
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (screen === "settings") {
    return (
      <main className="app-shell">
        <section className="phone settings-screen">
          <header className="topbar">
            <button className="icon-button" onClick={() => setScreen("active")} aria-label="Back to Sense IT"><ArrowLeft /></button>
            <Logo />
          </header>
          <div className="settings-list">
            <div className="setting-row">
              <div className="setting-label"><UserRound /><span>Voice Guidance</span></div>
              <Toggle checked={voiceGuidance} onChange={setVoiceGuidance} label="Voice Guidance" />
            </div>
            <div className="setting-row">
              <div className="setting-label"><Vibrate /><span>Haptic Alerts</span></div>
              <Toggle checked={hapticAlerts} onChange={setHapticAlerts} label="Haptic Alerts" />
            </div>
            <div className="speed-card">
              <div className="setting-label"><Gauge /><span>Voice Speed</span></div>
              <div className="speed-options">
                {(["slow", "normal", "fast"] as Speed[]).map(item => (
                  <button key={item} className={speed === item ? "speed selected" : "speed"} onClick={() => setSpeed(item)}>{item.toUpperCase()}</button>
                ))}
              </div>
            </div>
          </div>
          <button className="back-button" onClick={() => setScreen("active")}><ArrowLeft size={17} /> BACK TO SENSE IT</button>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <section className="phone active-screen">
        <header className="topbar">
          <button className="icon-button" onClick={() => { setListening(false); setScreen("welcome"); }} aria-label="Back"><ArrowLeft /></button>
          <Logo />
          <button className="icon-button" onClick={() => setScreen("settings")} aria-label="Settings"><Settings /></button>
        </header>

        <div className="active-status">
          <span className={`status-dot ${listening ? "pulse" : ""}`} />
          <span>{listening ? "SENSE IT LISTENING" : "SENSE IT ACTIVE"}</span>
        </div>

        <div className="camera-card">
          <video ref={camera.videoRef} className="camera-video" muted playsInline aria-label="Live camera view" />
          {camera.status !== "ready" && <div className="camera-placeholder"><Radio size={32} /><span>{camera.status === "error" ? "Camera unavailable" : "Camera ready"}</span></div>}
          <div className="scene-overlay">
            <span className="obstacle left" />
            <span className="obstacle center" />
            <span className="obstacle right" />
            <div className="narration">{narration}</div>
          </div>
        </div>

        <div className="hint">LONG PRESS ANYWHERE ON SCREEN<br />TO SPEAK</div>
        <div className="micro-hint">ENTIRE SCREEN SUPPORTS LONG-PRESS FOR VOICE COMMANDS</div>

        <div className="controls">
          <button className="control-button secondary" onClick={() => camera.status === "ready" ? camera.stop() : camera.start()}>
            {camera.status === "ready" ? <CircleStop /> : <Radio />}
            {camera.status === "ready" ? "STOP CAMERA" : "START CAMERA"}
          </button>
          <button className={`control-button ${listening ? "active-control" : ""}`} onClick={toggleListening}>
            {listening ? <Pause /> : <Volume2 />}
            {listening ? "PAUSE NARRATION" : "START NARRATION"}
          </button>
        </div>

        <div className="dev-status" aria-live="polite">
          <span><Activity size={13} /> {backend === "ok" ? "BACKEND ONLINE" : backend === "error" ? "BACKEND OFFLINE" : "CHECKING BACKEND"}</span>
          {lastLatency !== null && <span>{lastLatency}ms · {lastAnalyzed}</span>}
        </div>
      </section>
    </main>
  );
}