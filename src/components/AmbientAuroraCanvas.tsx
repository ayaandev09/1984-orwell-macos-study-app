"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
  phase: number;
}

const PALETTE = [
  "6, 182, 212",   // Telescreen Cyan
  "56, 189, 248",  // Ministry Sky
  "239, 68, 68",   // Surveillance Crimson
  "168, 85, 247",  // Inner Party Violet
];

export function AmbientAuroraCanvas() {
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rafId: number;
    let width = typeof window !== "undefined" ? window.innerWidth : 1440;
    let height = typeof window !== "undefined" ? window.innerHeight : 900;
    let targetX = width * 0.5;
    let targetY = height * 0.35;
    let currentX = targetX;
    let currentY = targetY;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;

    const setCanvasSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };
    setCanvasSize();

    const particles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.16,
      vy: -0.07 - Math.random() * 0.16,
      radius: 1.0 + Math.random() * 1.6,
      alpha: 0.12 + Math.random() * 0.28,
      color: PALETTE[i % PALETTE.length],
      phase: Math.random() * Math.PI * 2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      const targetEl = e.target as HTMLElement | null;
      if (targetEl) {
        const card = targetEl.closest(
          ".liquid-glass-bento, .liquid-card-flagship, .ultraThinMaterial"
        ) as HTMLElement | null;
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--card-mouse-x", `${e.clientX - rect.left}px`);
          card.style.setProperty("--card-mouse-y", `${e.clientY - rect.top}px`);
        }
      }
    };

    const tick = (time: number) => {
      currentX += (targetX - currentX) * 0.085;
      currentY += (targetY - currentY) * 0.085;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX - 420}px, ${currentY - 420}px, 0)`;
      }

      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx + Math.sin(time * 0.0008 + p.phase) * 0.14;
          p.y += p.vy;

          const dx = p.x - currentX;
          const dy = p.y - currentY;
          const distSq = dx * dx + dy * dy;
          if (distSq < 32400 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (180 - dist) / 180;
            p.x += (dx / dist) * force * 0.55;
            p.y += (dy / dist) * force * 0.55;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(currentX, currentY);
            ctx.strokeStyle = `rgba(${p.color}, ${force * 0.15})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }

          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;

          const pulseAlpha =
            p.alpha * (0.7 + 0.3 * Math.sin(time * 0.0022 + p.phase));

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${pulseAlpha * 0.22})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color}, ${pulseAlpha})`;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const cdx = p.x - p2.x;
            const cdy = p.y - p2.y;
            const cDistSq = cdx * cdx + cdy * cdy;
            if (cDistSq < 14400) {
              const cAlpha = (1 - cDistSq / 14400) * 0.05;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${cAlpha})`;
              ctx.lineWidth = 0.55;
              ctx.stroke();
            }
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", setCanvasSize, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Interactive Cursor-Tracking Soft Ambient Glow */}
      <div
        ref={glowRef}
        className="w-[720px] h-[720px] rounded-full will-change-transform opacity-45 blur-[40px] transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(239, 68, 68, 0.04) 38%, transparent 70%)",
        }}
      />

      {/* Ambient Breathing Aurora Orbs */}
      <div
        className="absolute -top-44 -left-32 w-[620px] h-[620px] rounded-full blur-[120px] opacity-35 animate-aurora-slow-1"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.25), transparent 72%)",
        }}
      />
      <div
        className="absolute top-[28%] -right-44 w-[560px] h-[560px] rounded-full blur-[130px] opacity-30 animate-aurora-slow-2"
        style={{
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.22), transparent 72%)",
        }}
      />
      <div
        className="absolute -bottom-48 left-[24%] w-[680px] h-[680px] rounded-full blur-[140px] opacity-25 animate-aurora-slow-3"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.19), transparent 72%)",
        }}
      />

      {/* 120 FPS Serene Literary Telemetry Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />
    </div>
  );
}
