"use client";

import { syncWidgetSnapshot } from "@/lib/widgetBridge";
import React, { useMemo } from "react";
import { ALL_CHAPTERS, BOOK_PARTS } from "@/data";
import { useStudyStore, WidgetTemplateSize } from "@/store/useStudyStore";
import { OrwellAppLogo } from "./OrwellAppLogo";
import {
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Eye,
  Radio,
  Quote as QuoteIcon,
  Timer,
  Minimize2,
  Maximize2,
  Columns3,
} from "lucide-react";

const RADIUS = 32;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StudyMiniHomepage() {
  const {
    activeChapterId,
    setActiveChapter,
    completedChapters,
    toggleChapterComplete,
    widgetTemplate = "medium",
    setWidgetTemplate,
    openExamSprint,
  } = useStudyStore();

  const activeChapter = useMemo(
    () => ALL_CHAPTERS.find((ch) => ch.id === activeChapterId) || ALL_CHAPTERS[0],
    [activeChapterId]
  );

  const activePart = useMemo(
    () =>
      BOOK_PARTS.find((p) => p.id === activeChapter.partId) ||
      BOOK_PARTS[0],
    [activeChapter.partId]
  );

  const currentIndex = useMemo(
    () => ALL_CHAPTERS.findIndex((ch) => ch.id === activeChapter.id),
    [activeChapter.id]
  );

  const nextChapter = useMemo(
    () =>
      currentIndex >= 0 && currentIndex < ALL_CHAPTERS.length - 1
        ? ALL_CHAPTERS[currentIndex + 1]
        : null,
    [currentIndex]
  );

  const completedCount = useMemo(
    () => Object.values(completedChapters || {}).filter(Boolean).length,
    [completedChapters]
  );

  const totalChapters = ALL_CHAPTERS.length || 24;
  const percentage = totalChapters > 0 ? Math.round((completedCount / totalChapters) * 100) : 0;
  const dashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  const isCurrentDone = !!completedChapters?.[activeChapter.id];

  const remainingMinutes = useMemo(
    () =>
      ALL_CHAPTERS.reduce(
        (sum, ch) => (completedChapters?.[ch.id] ? sum : sum + ch.readingTimeMinutes),
        0
      ),
    [completedChapters]
  );

  const activeQuote = activeChapter?.quotes?.[0] || {
    quote: "War is peace. Freedom is slavery. Ignorance is strength.",
    speaker: "Party Slogan",
    context: "The three paradoxes inscribed on the white pyramidal face of Minitrue.",
  };

  const handleToggleComplete = () => {
    toggleChapterComplete(activeChapter.id);
    setTimeout(() => syncWidgetSnapshot("topic-complete"), 10);
  };

  const handleNextChapter = (id: string) => {
    setActiveChapter(id);
    setTimeout(() => syncWidgetSnapshot("navigation"), 10);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full liquid-glass-bento rounded-3xl p-4 sm:p-5 mb-4 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl transition-all duration-300">
      {/* Background ambient glow aura */}
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      {/* Top Bar: Identity & Template Size Segmented Controller */}
      <div className="relative z-10 flex items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400/20 via-sky-500/15 to-indigo-500/20 border border-cyan-400/35 flex items-center justify-center p-1 shadow-inner shrink-0">
            <OrwellAppLogo className="w-full h-full object-contain" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-400 truncate">
                MINITRUE // 1984 CODEX
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-[9px] font-mono text-emerald-300 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Widget Synced
              </span>
            </div>
          </div>
        </div>

        {/* Template Size Switcher (Small / Medium / Large) */}
        <div className="flex items-center gap-1 p-0.5 rounded-full bg-black/60 border border-white/12 text-xs shrink-0">
          <button
            onClick={() => setWidgetTemplate("small")}
            title="Compact Glanceable Strip"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
              widgetTemplate === "small"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Minimize2 className="w-3 h-3" />
            <span className="hidden sm:inline">Small</span>
          </button>
          <button
            onClick={() => setWidgetTemplate("medium")}
            title="Standard Balanced Widget"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
              widgetTemplate === "medium"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Maximize2 className="w-3 h-3" />
            <span className="hidden sm:inline">Medium</span>
          </button>
          <button
            onClick={() => setWidgetTemplate("large")}
            title="Expanded Studio Dossier"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold transition-all cursor-pointer ${
              widgetTemplate === "large"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Columns3 className="w-3 h-3" />
            <span className="hidden sm:inline">Large</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TEMPLATE 1: SMALL / COMPACT GLANCEABLE STRIP */}
      {/* ========================================================================= */}
      {widgetTemplate === "small" && (
        <div className="relative z-10 pt-3 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="px-2 py-0.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold shrink-0">
              {activeChapter.displayCode}
            </span>
            <div className="min-w-0 truncate">
              <span className="text-xs sm:text-sm font-semibold text-white truncate block">
                {activeChapter.title}
              </span>
              <span className="text-[10px] text-slate-400 font-mono flex items-center gap-2">
                <span>{activePart.title}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-cyan-300">
                  <Clock className="w-2.5 h-2.5" /> {activeChapter.readingTimeMinutes}m
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Compact Progress Ring */}
            <div className="flex items-center gap-2 bg-black/45 px-2.5 py-1 rounded-xl border border-white/10 font-mono text-xs">
              <span className="text-cyan-300 font-bold">{percentage}%</span>
              <span className="text-slate-400 text-[10px]">({completedCount}/{totalChapters})</span>
            </div>

            <button
              onClick={handleToggleComplete}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isCurrentDone
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "bg-white/5 text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              {isCurrentDone ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Mastered</span>
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mark Mastered</span>
                </>
              )}
            </button>

            {nextChapter && (
              <button
                onClick={() => handleNextChapter(nextChapter.id)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 cursor-pointer"
                title={`Next: ${nextChapter.displayCode}`}
              >
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TEMPLATE 2: MEDIUM / STANDARD BALANCED WIDGET */}
      {/* ========================================================================= */}
      {widgetTemplate === "medium" && (
        <div className="relative z-10 pt-3.5 flex flex-col gap-3.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-mono text-cyan-400/90 uppercase tracking-wider block truncate">
                Active Oceania Record • {activePart.title}
              </span>
              <h2
                className="text-sm sm:text-base font-bold text-white tracking-tight truncate mt-0.5"
                title={`${activeChapter.displayCode} · ${activeChapter.title}`}
              >
                {activeChapter.displayCode} · {activeChapter.title}
              </h2>
              <p className="text-xs text-slate-300/80 truncate mt-1">
                {activeChapter.summary}
              </p>
            </div>

            {/* Circular Mastery Dial */}
            <div className="flex items-center gap-3 shrink-0 pl-3 border-l border-white/10">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                  <circle
                    cx="40"
                    cy="40"
                    r={RADIUS}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={dashoffset}
                    className="transition-all duration-500 ease-out"
                    style={{ filter: "drop-shadow(0 0 6px #06b6d4)" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="font-mono text-xs sm:text-sm font-bold text-white leading-none">
                    {percentage}%
                  </span>
                  <span className="font-mono text-[7px] uppercase tracking-wider text-cyan-300 mt-0.5">
                    Mastery
                  </span>
                </div>
              </div>

              <div className="text-right font-mono hidden sm:block">
                <span className="text-xs font-bold text-slate-100 block">
                  {completedCount} / {totalChapters}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Chapters Mastered
                </span>
              </div>
            </div>
          </div>

          {/* Tier 2: Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2.5 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                <Clock className="w-3 h-3 text-cyan-300" />
                <span>{remainingMinutes}m total remaining</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 text-slate-300">
                <span>{ALL_CHAPTERS.length} Chapters · 3 Book Parts</span>
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleToggleComplete}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isCurrentDone
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30"
                    : "bg-white/[0.06] text-slate-200 border border-white/10 hover:bg-white/[0.12] hover:text-white"
                }`}
              >
                {isCurrentDone ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Chapter Mastered</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Mark Mastered</span>
                  </>
                )}
              </button>

              {nextChapter && (
                <button
                  onClick={() => handleNextChapter(nextChapter.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <span>Next: {nextChapter.displayCode}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TEMPLATE 3: LARGE / STUDIO DOSSIER 3-PANEL COMMAND DECK */}
      {/* ========================================================================= */}
      {widgetTemplate === "large" && (
        <div className="relative z-10 pt-4 grid grid-cols-1 lg:grid-cols-3 gap-3.5 animate-in fade-in duration-200">
          {/* Panel 1: Hero & Mastery Gauge */}
          <div className="p-3.5 rounded-2xl bg-black/45 border border-white/10 flex flex-col justify-between gap-3 shadow-inner">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Active Telescreen Record
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {activePart.title}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white truncate">
                {activeChapter.displayCode} · {activeChapter.title}
              </h3>
              <p className="text-xs text-slate-300/80 line-clamp-2 mt-1">
                {activeChapter.summary}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative w-11 h-11 shrink-0">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                    <circle
                      cx="40"
                      cy="40"
                      r={RADIUS}
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={dashoffset}
                      className="transition-all duration-500 ease-out"
                      style={{ filter: "drop-shadow(0 0 6px #06b6d4)" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-mono text-xs font-bold text-white">
                      {percentage}%
                    </span>
                  </div>
                </div>
                <div className="font-mono text-[11px]">
                  <span className="text-white font-bold block">{completedCount} / {totalChapters}</span>
                  <span className="text-slate-400 text-[10px] block">Chapters Mastered</span>
                </div>
              </div>

              <button
                onClick={handleToggleComplete}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrentDone
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                    : "bg-white/10 text-white border border-white/15 hover:bg-white/15"
                }`}
              >
                {isCurrentDone ? <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> : <Circle className="w-3.5 h-3.5 text-slate-400" />}
                <span>{isCurrentDone ? "Mastered" : "Mark"}</span>
              </button>
            </div>
          </div>

          {/* Panel 2: Iconic Oceania Quote & Psychological Anchor */}
          <div className="p-3.5 rounded-2xl bg-black/45 border border-white/10 flex flex-col justify-between gap-2.5 shadow-inner">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 font-bold uppercase tracking-wider mb-1.5">
                <QuoteIcon className="w-3 h-3 text-cyan-400" />
                <span>Oceania Axiom Anchor</span>
              </div>
              <p className="text-xs font-serif italic text-cyan-100/90 leading-relaxed line-clamp-3">
                &ldquo;{activeQuote.quote}&rdquo;
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="text-cyan-300/80 font-bold">{activeQuote.speaker}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                Doublethink / Minitrue
              </span>
            </div>
          </div>

          {/* Panel 3: Queue & Exam Dispatcher */}
          <div className="p-3.5 rounded-2xl bg-black/45 border border-white/10 flex flex-col justify-between gap-2.5 shadow-inner">
            <div>
              <div className="flex items-center justify-between gap-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                <span className="text-cyan-400 font-bold">Up Next in Queue</span>
                <span className="flex items-center gap-1 text-slate-400"><Clock className="w-2.5 h-2.5" /> {remainingMinutes}m total</span>
              </div>

              {nextChapter ? (
                <button
                  onClick={() => handleNextChapter(nextChapter.id)}
                  className="w-full text-left p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-between gap-2 group cursor-pointer"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-xs font-bold text-cyan-300 block">
                      {nextChapter.displayCode}
                    </span>
                    <span className="text-xs text-white truncate block group-hover:text-cyan-200 transition-colors">
                      {nextChapter.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              ) : (
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-mono">
                  All 24 chapters mastered!
                </div>
              )}
            </div>

            <button
              onClick={openExamSprint}
              className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-sky-500/20 hover:from-cyan-500/30 hover:to-sky-500/30 border border-cyan-400/40 text-cyan-200 font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
            >
              <Timer className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Launch Timed Exam Sprint (⌘E)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
