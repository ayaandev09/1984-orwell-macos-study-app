"use client";

import React, { useEffect, useRef } from "react";

export function AmbientAuroraCanvas() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let mouseX = window.innerWidth * 0.5;
    let mouseY = window.innerHeight * 0.25;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          if (spotlightRef.current) {
            spotlightRef.current.style.background = `radial-gradient(680px circle at ${mouseX}px ${mouseY}px, rgba(6, 182, 212, 0.085), rgba(220, 38, 38, 0.04) 45%, transparent 75%)`;
          }
          rafId = null;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ contain: "strict" }}
    >
      {/* Interactive Cursor-Tracking Liquid Specular Light */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(680px circle at 50% 25%, rgba(6, 182, 212, 0.085), rgba(220, 38, 38, 0.04) 45%, transparent 75%)",
          willChange: "background",
        }}
      />

      {/* Slow-Breathing GPU Aurora Orbs */}
      <div
        className="absolute -top-36 -left-36 w-[34rem] h-[34rem] rounded-full opacity-25 blur-[110px] animate-aurora-slow-1"
        style={{
          background: "radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, rgba(2, 132, 199, 0.12) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-1/4 -right-36 w-[32rem] h-[32rem] rounded-full opacity-20 blur-[120px] animate-aurora-slow-2"
        style={{
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.38) 0%, rgba(153, 27, 27, 0.1) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute -bottom-44 left-1/3 w-[38rem] h-[38rem] rounded-full opacity-20 blur-[130px] animate-aurora-slow-3"
        style={{
          background: "radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(8, 145, 178, 0.12) 65%, transparent 100%)",
        }}
      />
    </div>
  );
}
