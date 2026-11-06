"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  Zap,
  ListFilter,
} from "lucide-react";
import { ALL_CHAPTERS, TOTAL_CHAPTERS_COUNT } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";

export const FloatingBottomDock: React.FC = React.memo(() => {
  const {
    activeChapterId,
    setActiveChapter,
    completedChapters,
    toggleChapterComplete,
    goToPrevChapter,
    goToNextChapter,
    speedReadMode,
    toggleSpeedReadMode,
    viewMode,
    setViewMode,
    setChapterSheetOpen,
  } = useStudyStore();

  const currentIdx = ALL_CHAPTERS.findIndex((c) => c.id === activeChapterId);
  const currentChapter = ALL_CHAPTERS[currentIdx] || ALL_CHAPTERS[0];
  const isCurrentDone = !!completedChapters[currentChapter.id];
  const totalDone = ALL_CHAPTERS.filter((c) => !!completedChapters[c.id]).length;

  const jumpToPartFirstChapter = (firstId: string) => {
    setActiveChapter(firstId);
    if (viewMode !== "focus" && viewMode !== "stream") {
      setViewMode("focus");
    }
    if (viewMode === "stream") {
      document
        .getElementById(`chapter-card-${firstId}`)
        ?.scrollIntoView({ behavior: "instant" });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const prevChapter = currentIdx > 0 ? ALL_CHAPTERS[currentIdx - 1] : null;
  const nextChapter =
    currentIdx < ALL_CHAPTERS.length - 1 ? ALL_CHAPTERS[currentIdx + 1] : null;

  return (
    <div className="fixed bottom-[max(calc(env(safe-area-inset-bottom,0px)+0.6rem),1rem)] left-0 right-0 w-full flex justify-center items-center pointer-events-none z-40 px-3">
      <nav
        aria-label="Quick Chapter & Part Floating Dock"
        className="liquid-glass-dock liquid-pulse-rim rounded-full px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center gap-1.5 sm:gap-3 pointer-events-auto shadow-2xl backdrop-blur-2xl"
      >
        {/* Mobile Index Trigger */}
        <button
          onClick={() => setChapterSheetOpen(true)}
          className="lg:hidden p-2 rounded-full liquid-glass-pill text-sky-300 active:scale-90 cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
          title="Open Chapter Index Sheet"
        >
          <ListFilter className="w-4 h-4" />
        </button>

        {/* Part Quick-Jump Pills (Visible on Mac & Tablets) */}
        <div className="hidden sm:flex items-center gap-1 pr-2 border-r border-white/15">
          <button
            onClick={() => jumpToPartFirstChapter("p1-c1")}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentChapter.partNumber === 1
                ? "bg-sky-500/30 text-sky-200 border border-sky-400/50"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Part I
          </button>
          <button
            onClick={() => jumpToPartFirstChapter("p2-c1")}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentChapter.partNumber === 2
                ? "bg-indigo-500/30 text-indigo-200 border border-indigo-400/50"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Part II
          </button>
          <button
            onClick={() => jumpToPartFirstChapter("p3-c1")}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentChapter.partNumber === 3 &&
              currentChapter.id !== "appendix-newspeak"
                ? "bg-rose-500/30 text-rose-200 border border-rose-400/50"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            Part III
          </button>
          <button
            onClick={() => jumpToPartFirstChapter("appendix-newspeak")}
            className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-colors cursor-pointer ${
              currentChapter.id === "appendix-newspeak"
                ? "bg-purple-500/30 text-purple-200 border border-purple-400/50"
                : "text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            APP
          </button>
        </div>

        {/* Previous Chapter Button */}
        <button
          onClick={goToPrevChapter}
          disabled={!prevChapter}
          title={prevChapter ? `Previous: ${prevChapter.title}` : "First chapter"}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            prevChapter
              ? "liquid-glass-pill text-white cursor-pointer active:scale-95"
              : "opacity-30 cursor-not-allowed text-slate-500"
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Current Chapter Badge & Mark Mastered Soft-Click Button */}
        <button
          onClick={() => {
            toggleChapterComplete(currentChapter.id);
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate(25);
            }
          }}
          title={isCurrentDone ? "Chapter Mastered! Tap anywhere on this pill to uncheck" : "Tap anywhere on this pill to mark chapter mastered"}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-md ${
            isCurrentDone
              ? "bg-emerald-950/70 border-emerald-500/50 text-emerald-200 shadow-emerald-500/20"
              : "bg-slate-950/80 hover:bg-white/10 border-white/20 text-slate-200 hover:border-sky-400/40"
          }`}
        >
          <div className={`p-0.5 rounded-full transition-transform duration-200 ${
            isCurrentDone ? "text-emerald-400 animate-tick-pop" : "text-slate-400 group-hover:text-sky-300"
          }`}>
            {isCurrentDone ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <Circle className="w-4 h-4 text-slate-400" />
            )}
          </div>
          <span className="font-mono text-xs font-bold text-white tracking-wide">
            {currentChapter.displayCode}
          </span>
          <span className="text-[10px] font-mono opacity-70 hidden xs:inline">
            {isCurrentDone ? "Done" : "Mark"}
          </span>
        </button>

        {/* Next Chapter Button */}
        <button
          onClick={goToNextChapter}
          disabled={!nextChapter}
          title={nextChapter ? `Next: ${nextChapter.title}` : "Last chapter"}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            nextChapter
              ? "liquid-glass-pill text-white cursor-pointer active:scale-95"
              : "opacity-30 cursor-not-allowed text-slate-500"
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {/* Speed-Read Toggle */}
        <button
          onClick={toggleSpeedReadMode}
          title="Toggle Speed-Read Mode"
          className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            speedReadMode
              ? "bg-amber-400/30 text-amber-200 border border-amber-400/60 shadow"
              : "liquid-glass-pill text-slate-300 hover:text-white"
          }`}
        >
          <Zap
            className={`w-3.5 h-3.5 ${
              speedReadMode ? "text-amber-300 fill-amber-300" : "text-slate-400"
            }`}
          />
          <span className="hidden md:inline">Speed</span>
        </button>
      </nav>
    </div>
  );
});

FloatingBottomDock.displayName = "FloatingBottomDock";
