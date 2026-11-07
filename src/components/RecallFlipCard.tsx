"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Sparkles, CheckCircle2, Flame, Zap } from "lucide-react";
import { syncWidgetSnapshot } from "@/lib/widgetBridge";

export interface RecallFlipCardProps {
  moduleCode: string;
  title: string;
  prompt: string;
  answer: string;
  accent?: string;
  secondary?: string;
  meta?: string;
}

export function RecallFlipCard({
  moduleCode,
  title,
  prompt,
  answer,
  accent = "#06b6d4",
  secondary = "#0284c7",
  meta = "ACTIVE RECALL",
}: RecallFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [confidence, setConfidence] = useState<"review" | "good" | "mastered" | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const cardRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setFlipped((value) => !value);
    syncWidgetSnapshot("flip");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5.5;
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 4.5;
    setTilt({ rotateX, rotateY, glareX: pctX, glareY: pctY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full cursor-pointer select-none group"
      style={{ perspective: "1400px" }}
      data-recall-module={moduleCode}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${flipped ? "Hide" : "Reveal"} active recall answer for ${title}`}
      onClick={toggle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!flipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: -80, opacity: 0, scale: 0.97 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: 80, opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="ultraThinMaterial relative min-h-[176px] w-full flex flex-col justify-between overflow-hidden rounded-3xl p-5 shadow-2xl border border-white/15 group-hover:border-amber-400/45 transition-colors"
              style={{
                backgroundImage: `radial-gradient(120% 140% at ${tilt.glareX}% ${tilt.glareY}%, ${accent}38, transparent 58%), linear-gradient(145deg, rgba(255,255,255,0.07), rgba(6,10,18,0.88))`,
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(360px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.11), transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] shadow-sm"
                    style={{
                      borderColor: `${accent}88`,
                      color: "#a5f3fc",
                      backgroundColor: `${accent}26`,
                    }}
                  >
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    {meta} · {moduleCode}
                  </span>
                  {confidence === "mastered" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" /> Locked In
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-amber-300 transition-colors flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> Interactive 3D Flip
                </span>
              </div>

              <div className="relative z-10 mt-3">
                <h4 className="mb-1.5 text-sm sm:text-base font-bold leading-snug text-white">
                  {title}
                </h4>
                <p className="line-clamp-3 text-xs sm:text-sm leading-relaxed text-slate-200/95">
                  {prompt}
                </p>
              </div>

              <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-amber-200/90 group-hover:text-white transition-colors">
                  <RotateCcw className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-500" style={{ color: accent }} />
                  Click or press Space to reveal examiner synthesis
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold border border-white/15"
                  style={{ backgroundColor: `${secondary}44`, color: "#e0f2fe" }}
                >
                  IB AO1 / AO2
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -80, opacity: 0, scale: 0.97 }}
              animate={{ rotateY: 0, opacity: 1, scale: 1 }}
              exit={{ rotateY: 80, opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="ultraThinMaterial relative min-h-[176px] w-full flex flex-col justify-between overflow-hidden rounded-3xl p-5 shadow-2xl border border-amber-400/50"
              style={{
                backgroundImage: `radial-gradient(120% 140% at ${tilt.glareX}% ${tilt.glareY}%, ${secondary}44, transparent 60%), linear-gradient(145deg, rgba(255,255,255,0.07), rgba(4,10,18,0.92))`,
              }}
            >
              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-amber-200">
                  <Flame className="w-3 h-3 text-amber-400" /> Examiner Model Synthesis · {moduleCode}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300">
                  Click to flip back
                </span>
              </div>

              <p className="relative z-10 mt-3 text-xs sm:text-sm leading-relaxed text-white font-medium">
                {answer}
              </p>

              <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                <span className="font-mono text-[10px] text-slate-300">
                  Rate your recall confidence:
                </span>
                <div
                  className="flex items-center gap-1.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setConfidence("review")}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                      confidence === "review"
                        ? "bg-rose-500/30 border-rose-400 text-rose-200"
                        : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    Needs Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfidence("good")}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                      confidence === "good"
                        ? "bg-amber-500/30 border-amber-400 text-amber-200"
                        : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    Solid
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfidence("mastered")}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border transition-all cursor-pointer ${
                      confidence === "mastered"
                        ? "bg-emerald-500/30 border-emerald-400 text-emerald-200 shadow-sm"
                        : "bg-white/5 border-white/10 text-slate-300 hover:text-white"
                    }`}
                  >
                    Mastered ⚡
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
