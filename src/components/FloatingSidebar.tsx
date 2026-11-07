"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronRight,
  Clock,
  RotateCcw,
  Sparkles,
  BookOpen,
  Eye,
  X,
  GraduationCap,
  Flame,
} from "lucide-react";
import {
  BOOK_PARTS,
  ALL_CHAPTERS,
  TOTAL_CHAPTERS_COUNT,
  TOTAL_SUBSECTIONS_COUNT,
  TOTAL_READING_MINUTES,
} from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { OrwellAppLogo } from "./OrwellAppLogo";

interface FloatingSidebarProps {
  isMobileSheet?: boolean;
}

export const FloatingSidebar: React.FC<FloatingSidebarProps> = React.memo(({
  isMobileSheet = false,
}) => {
  const {
    activeChapterId,
    setActiveChapter,
    completedChapters,
    completedSubSections,
    toggleChapterComplete,
    togglePartComplete,
    resetAllProgress,
    viewMode,
    setViewMode,
    chapterSheetOpen,
    setChapterSheetOpen,
    triggerDiagnostics,
    sidebarCollapsed,
    toggleSidebar,
  } = useStudyStore();

  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({
    "part-1": true,
    "part-2": true,
    "part-3": true,
  });

  const togglePartAccordion = (partId: string) => {
    setExpandedParts((prev) => ({ ...prev, [partId]: !prev[partId] }));
  };

  const completedChaptersCount = ALL_CHAPTERS.filter(
    (c) => !!completedChapters[c.id]
  ).length;

  const completedSubSectionsCount = Object.values(completedSubSections).filter(
    Boolean
  ).length;

  const progressPercent = Math.round(
    (completedChaptersCount / TOTAL_CHAPTERS_COUNT) * 100
  );

  const remainingReadingMinutes = ALL_CHAPTERS.reduce(
    (sum, ch) => (completedChapters[ch.id] ? sum : sum + ch.readingTimeMinutes),
    0
  );

  // If mobile sheet mode and closed, return null
  if (isMobileSheet && !chapterSheetOpen) return null;

  const content = (
    <>
      {/* Top Header */}
      {isMobileSheet ? (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-sky-300 block">
              BOOK INDEX • MAC CODEX
            </span>
            <h2 className="text-base font-bold text-white">
              Parts &amp; Chapters (I.1 ➔ APP)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {completedChaptersCount > 0 && (
              <button
                onClick={resetAllProgress}
                title="Reset all reading progress"
                className="p-2.5 rounded-2xl liquid-glass-pill text-slate-300 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setChapterSheetOpen(false)}
              aria-label="Close chapter index"
              className="p-2.5 rounded-2xl liquid-glass-pill text-slate-200 active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 shrink-0 min-h-[44px] mac-drag-region">
          <div className="flex items-center gap-3">
            <button
              onClick={triggerDiagnostics}
              title="Click to run live Minitrue System Diagnostics"
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-400/25 via-indigo-500/20 to-rose-500/25 border border-white/25 flex items-center justify-center shadow-inner hover:brightness-110 active:scale-95 transition-all cursor-pointer group overflow-hidden p-1.5 mac-no-drag"
            >
              <OrwellAppLogo className="w-full h-full object-contain" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-sky-300">
                  MINITRUE // 1984
                </span>
                <button
                  onClick={triggerDiagnostics}
                  title="Run Diagnostics"
                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-400/30 hover:bg-rose-500/30 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                  MAC PRO
                </button>
              </div>
              <h1 className="text-sm font-semibold text-white tracking-tight">
                Orwell Study Database
              </h1>
            </div>
          </div>

          {completedChaptersCount > 0 && (
            <button
              onClick={resetAllProgress}
              title="Reset all reading progress checkboxes"
              className="p-2 rounded-xl liquid-glass-pill text-slate-300 hover:text-rose-300 hover:border-rose-400/40 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Speed-Read & Progress Telemetry Bar (Matching Business Management Proportion) */}
      <div className="liquid-glass-bento rounded-2xl p-3 mb-3 shrink-0">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-300 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Folio Mastered</span>
          </span>
          <span className="font-mono font-bold text-sky-300">
            {completedChaptersCount}/{TOTAL_CHAPTERS_COUNT} ({progressPercent}%)
          </span>
        </div>

        {/* Progress Fill Bar */}
        <div className="w-full h-2 rounded-full bg-slate-950/80 overflow-hidden border border-white/10 mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-rose-400 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(progressPercent, 3)}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-sky-300" />
            {remainingReadingMinutes === 0 ? "Done!" : `~${remainingReadingMinutes}m left`}
          </span>
          <span className="text-slate-300">3 Parts • 24 Chapters</span>
        </div>
      </div>

      {/* Hierarchical Book Parts -> Chapters Navigation List */}
      <div className="flex-1 overflow-y-auto gpu-scroll-container pr-1 space-y-2.5">
        {BOOK_PARTS.map((part) => {
          const isExpanded = !!expandedParts[part.id];
          const partCompletedCount = part.chapters.filter(
            (c) => !!completedChapters[c.id]
          ).length;
          const isAllPartComplete =
            partCompletedCount === part.chapters.length &&
            part.chapters.length > 0;

          return (
            <div
              key={part.id}
              className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2.5 bg-white/[0.04] border-b border-white/5">
                <button
                  onClick={() => togglePartAccordion(part.id)}
                  className="flex items-center gap-2 text-left flex-1 min-w-0 cursor-pointer"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-sky-300 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <div className="truncate">
                    <div className="text-xs font-bold uppercase tracking-wider text-sky-200">
                      Part {part.romanNumeral}
                    </div>
                    <div className="text-[11px] text-slate-300 truncate">
                      {part.title.replace(/^Part \w+:\s*/, "")}
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    {partCompletedCount}/{part.chapters.length}
                  </span>
                  <button
                    onClick={() => togglePartComplete(part.id)}
                    title={`Toggle all chapters in Part ${part.romanNumeral}`}
                    className="p-1 text-slate-400 hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    {isAllPartComplete ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-1.5 space-y-1">
                  {part.chapters.map((ch) => {
                    const isSelected = activeChapterId === ch.id;
                    const isDone = !!completedChapters[ch.id];
                    const subDoneCount = ch.subSections.filter(
                      (s) => !!completedSubSections[s.id]
                    ).length;

                    return (
                      <div
                        key={ch.id}
                        className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all duration-150 ${
                          isSelected
                            ? "bg-gradient-to-r from-sky-500/25 via-indigo-500/20 to-transparent border border-sky-400/40 shadow-sm"
                            : "hover:bg-white/[0.06] border border-transparent"
                        }`}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleChapterComplete(ch.id);
                            if (typeof navigator !== "undefined" && navigator.vibrate) {
                              navigator.vibrate(20);
                            }
                          }}
                          aria-label={`Mark ${ch.displayCode} complete`}
                          className={`w-9 h-9 -my-1 -ml-1 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-200 active:scale-80 select-none ${
                            isDone
                              ? "text-emerald-400 bg-emerald-500/20 hover:bg-emerald-500/30"
                              : "text-slate-400 hover:text-emerald-300 hover:bg-white/10 active:bg-white/20"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-tick-pop" />
                          ) : (
                            <Circle className="w-4 h-4 group-hover:text-slate-200" />
                          )}
                        </button>

                        <button
                          onClick={() => {
                            setActiveChapter(ch.id);
                            if (isMobileSheet) {
                              setChapterSheetOpen(false);
                            }
                            if (viewMode !== "focus" && viewMode !== "stream") {
                              setViewMode("focus");
                            }
                            if (viewMode === "stream") {
                              const el = document.getElementById(
                                `chapter-card-${ch.id}`
                              );
                              el?.scrollIntoView({ behavior: "instant" });
                            } else {
                              window.scrollTo(0, 0);
                            }
                          }}
                          className="flex-1 min-w-0 text-left cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-xs font-mono font-bold ${
                                isSelected
                                  ? "text-sky-300"
                                  : isDone
                                  ? "text-emerald-300/80 line-through"
                                  : "text-slate-200"
                              }`}
                            >
                              {ch.displayCode}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                              {subDoneCount > 0 && !isDone && (
                                <span className="text-sky-300">
                                  {subDoneCount}/{ch.subSections.length}•
                                </span>
                              )}
                              {ch.readingTimeMinutes}m
                            </span>
                          </div>
                          <p
                            className={`text-xs truncate mt-0.5 ${
                              isSelected
                                ? "text-white font-medium"
                                : isDone
                                ? "text-slate-400 line-through"
                                : "text-slate-300 group-hover:text-white"
                            }`}
                          >
                            {ch.title}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Attribution (Mac Desktop) */}
      {!isMobileSheet && (
        <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-sky-300" />
            SparkNotes • LitCharts • AmerLit
          </span>
          <span className="font-mono text-slate-300">
            {TOTAL_READING_MINUTES}m total
          </span>
        </div>
      )}
    </>
  );

  if (isMobileSheet) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
        onClick={() => setChapterSheetOpen(false)}
      >
        <aside
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-[420px] max-h-[85dvh] flex flex-col liquid-glass-sheet rounded-t-3xl p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] overflow-hidden select-none"
        >
          <div className="w-10 h-1.5 rounded-full bg-white/25 mx-auto mb-3 shrink-0" />
          {content}
        </aside>
      </div>
    );
  }

  return (
    <aside
      data-tour="sidebar"
      className={`hidden lg:flex shrink-0 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] flex-col liquid-glass-sidebar rounded-3xl p-4 overflow-hidden select-none z-20 transition-all duration-300 ${
        sidebarCollapsed ? "w-20 items-center px-2" : "w-64 xl:w-72"
      }`}
    >
      {content}
    </aside>
  );
});

FloatingSidebar.displayName = "FloatingSidebar";
