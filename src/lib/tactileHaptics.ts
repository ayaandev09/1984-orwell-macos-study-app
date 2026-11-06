"use client";

// Ultra-fast zero-latency mechanical tactile feedback for macOS
let sharedAudioCtx: AudioContext | null = null;

export function playTactileClick(type: "click" | "soft" | "pop" = "click") {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume().catch(() => {});
    }

    const now = sharedAudioCtx.currentTime;
    const osc = sharedAudioCtx.createOscillator();
    const gain = sharedAudioCtx.createGain();

    if (type === "click") {
      // Crisp mechanical trackpad click impulse (subtle 110Hz -> 36Hz decay)
      osc.type = "sine";
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(36, now + 0.014);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.018);
    } else if (type === "pop") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.018);
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.022);
    } else {
      osc.type = "sine";
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.012);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.016);
    }
  } catch {}
}

export function initGlobalTactileListener() {
  if (typeof window === "undefined") return () => {};

  const handlePointerDown = (e: PointerEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const interactive = target.closest(
      "button, [role='button'], a[role='button'], .liquid-glass-pill, input[type='button'], input[type='submit'], summary, .soft-button, .soft-tick-btn"
    );
    if (interactive) {
      playTactileClick("click");
    }
  };

  window.addEventListener("pointerdown", handlePointerDown, { passive: true, capture: true });
  return () => {
    window.removeEventListener("pointerdown", handlePointerDown, { capture: true });
  };
}
