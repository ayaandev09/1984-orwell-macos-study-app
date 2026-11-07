"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Zap,
  TrendingUp,
  X,
  Layers,
  Eye
} from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";
import { ALL_CHAPTERS } from "@/data";
import { OrwellAppLogo } from "./OrwellAppLogo";

/**
 * 1984 Dedicated Vector Logo Emblem
 */
const OrwellLogoSVG: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="100%"
    height="100%"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    fill="none"
  >
    <defs>
      <radialGradient id="orwellGlow" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
        <stop offset="45%" stopColor="#ef4444" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="cyanNeon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a5f3fc" />
        <stop offset="40%" stopColor="#06b6d4" />
        <stop offset="80%" stopColor="#0891b2" />
        <stop offset="100%" stopColor="#164e63" />
      </linearGradient>
      <linearGradient id="partyRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fca5a5" />
        <stop offset="50%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>
    </defs>

    {/* Telescreen Surveillance Shield */}
    <circle cx="256" cy="256" r="236" fill="url(#orwellGlow)" />
    <circle cx="256" cy="256" r="220" fill="#040910" stroke="url(#cyanNeon)" strokeWidth="4" strokeOpacity="0.9" />
    <circle cx="256" cy="256" r="206" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6 6" strokeOpacity="0.45" />

    {/* Eye Geometry */}
    <path
      d="M 120 256 C 180 170, 332 170, 392 256 C 332 342, 180 342, 120 256 Z"
      fill="#080e18"
      stroke="url(#cyanNeon)"
      strokeWidth="5"
      strokeLinejoin="round"
    />
    <circle cx="256" cy="256" r="48" fill="url(#partyRed)" />
    <circle cx="256" cy="256" r="20" fill="#000000" />
    <circle cx="264" cy="248" r="6" fill="#ffffff" />
  </svg>
);

interface CinematicStartupIntroProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const CinematicStartupIntro: React.FC<CinematicStartupIntroProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [currentTime, setCurrentTime] = useState("");
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [countdown, setCountdown] = useState(4);
  const [isDismissing, setIsDismissing] = useState(false);
  const isDismissingRef = useRef(false);

  const { completedChapters, activeChapterId, setActiveChapter } = useStudyStore();

  // 1. Live real-time digital clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Study Session Stop-Watch
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Unified dismiss logic - instantly trigger unmount so exit animation dissolves into main UI
  const handleDismiss = useCallback(() => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;
    setIsDismissing(true);
    onClose();
    onComplete?.();
  }, [onClose, onComplete]);

  // 3. Fast Auto-Advance Countdown (4 seconds)
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleDismiss();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, handleDismiss]);

  // Keyboard shortcut listener (Space, Enter, Esc)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDismiss]);

  // Calculate live study metrics
  const totalChaptersCount = ALL_CHAPTERS.length;
  const completedCount = useMemo(() => {
    return Object.values(completedChapters).filter(Boolean).length;
  }, [completedChapters]);

  const masteryPercent =
    totalChaptersCount > 0
      ? Math.round((completedCount / totalChaptersCount) * 100)
      : 0;

  // Find the exact next chapter STILL TO DO
  const nextTodoChapter = useMemo(() => {
    const uncompleted = ALL_CHAPTERS.find((c) => !completedChapters[c.id]);
    if (uncompleted) return uncompleted;
    return ALL_CHAPTERS.find((c) => c.id === activeChapterId) || ALL_CHAPTERS[0];
  }, [completedChapters, activeChapterId]);

  const remainingChaptersCount = totalChaptersCount - completedCount;
  const estimatedMins = remainingChaptersCount * 12;

  const formattedSessionTime = useMemo(() => {
    const mins = Math.floor(sessionSeconds / 60);
    const secs = sessionSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [sessionSeconds]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleDismiss}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-none bg-[#030712] backdrop-blur-2xl overflow-hidden cursor-pointer"
    >
      {/* Static GPU-composited Ambient Aura Blobs (Zero CPU overhead) */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/15 blur-[80px] pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-red-500/12 blur-[80px] pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      />

      {/* Central Liquid Glass Briefing HUD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: -10, opacity: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg p-6 sm:p-7 rounded-[2rem] border border-white/12 ring-1 ring-inset ring-white/10 bg-white/[0.04] dark:bg-black/55 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_0_24px_rgba(255,255,255,0.03)] flex flex-col text-left overflow-hidden cursor-default"
      >
        {/* Specular Ambient Reflection Sheen */}
        <div className="absolute inset-x-0 top-0 h-32 rounded-t-[2rem] bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent pointer-events-none" />

        {/* Authentic Liquid Glass Logo Showcase — 120 FPS Metal Accelerated */}
        <div className="w-full h-40 sm:h-48 rounded-2xl overflow-hidden relative mb-4 bg-gradient-to-b from-black/90 via-black/75 to-[#04101e] border border-amber-400/40 shadow-2xl flex items-center justify-center p-4 relative">
          {/* Rotating Ambient Caustic Liquid Halo */}
          <div
            className="absolute w-60 h-60 rounded-full pointer-events-none liquid-caustic-halo"
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(30,58,138,0.22) 45%, transparent 70%)",
            }}
          />

          {/* Liquid Glass Breathing Emblem */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 relative z-10 flex items-center justify-center liquid-logo-float">
            <OrwellAppLogo className="w-full h-full object-contain filter drop-shadow-[0_0_32px_rgba(6,182,212,0.65)]" />

            {/* Slow Sweeping Liquid Glass Refraction Sheen Beam */}
            <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
              <div
                className="w-full h-full liquid-glass-sheen"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%)",
                }}
              />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 animate-ping pointer-events-none" />
          </div>
        </div>

        {/* App Title & Status Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
                1984 // OCEANIA CODEX
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[9px] font-mono text-amber-200">
                MINITRUE
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2 mt-0.5">
              <span>George Orwell&apos;s 1984</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h1>
          </div>
          <div className="text-right font-mono">
            <span className="text-[10px] text-slate-400 block">SYSTEM TIME</span>
            <span className="text-xs font-bold text-slate-200">
              {currentTime || "00:00:00"}
            </span>
          </div>
        </div>

        {/* Dynamic Focus Milestone Card (Up Next • Still To Do) */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
              <Compass className="w-3 h-3 text-amber-400" /> Up Next • Still To Do
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {remainingChaptersCount} chapters remaining
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-1">
            {nextTodoChapter?.displayCode}: {nextTodoChapter?.title}
          </h2>
          <p className="text-xs text-amber-100/70 line-clamp-2 font-sans mb-3">
            {nextTodoChapter?.summary || "Continue totalitarian state analysis and Winston Smith psychogeography."}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (nextTodoChapter) setActiveChapter(nextTodoChapter.id);
              handleDismiss();
            }}
            className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Jump Directly to Chapter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>

        {/* Bento Status Grid: Syllabus Progress & Study Pulse */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">
          {/* Progress Box */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-2">
              <span>MASTERY</span>
              <span className="text-amber-300 font-bold">{masteryPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 to-red-500 transition-all duration-500"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>
            <span className="text-slate-300 text-[11px] font-bold">
              {completedCount} / {totalChaptersCount} Done
            </span>
          </div>

          {/* Time & Session Box */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1">
              <span>PACE</span>
              <span className="text-red-300">~{estimatedMins}m left</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-200 text-[11px] font-semibold my-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Session: {formattedSessionTime}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold">
              ● Telescreen 98.4 MHz
            </span>
          </div>
        </div>

        {/* High-Yield Recall Anchor */}
        <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 mb-4 text-[11px]">
          <span className="text-amber-300 font-bold font-mono text-[10px] uppercase block mb-0.5">
            Key Orwellian Anchor
          </span>
          <p className="text-slate-300 italic font-serif leading-snug line-clamp-2">
            “Sanity is not statistical. (AO3 State Ideological Apparatus)”
          </p>
        </div>

        {/* Footer: Countdown & Skip Action */}
        <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
          <span className="text-[11px] font-mono text-slate-400">
            Opening workspace in <span className="text-amber-300 font-bold">{countdown}s</span>...
          </span>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleDismiss}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Enter Now</span>
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
