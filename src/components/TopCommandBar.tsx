"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Sparkles,
  Timer,
  PanelLeft,
} from "lucide-react";
import { ALL_CHAPTERS } from "@/data";
import { useStudyStore, ViewMode } from "@/store/useStudyStore";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";

interface TopCommandBarProps {
  onOpenWalkthrough?: () => void;
}

export const TopCommandBar: React.FC<TopCommandBarProps> = React.memo(({
  onOpenWalkthrough,
}) => {
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  const {
    activeChapterId,
    viewMode,
    setViewMode,
    studyGoal,
    setStudyGoal,
    isInspectorOpen,
    toggleInspector,
    openExamSprint,
    sidebarCollapsed,
    toggleSidebar,
    isSpotlightOpen,
    openSpotlight,
    toggleSpotlight,
  } = useStudyStore();

  const currentChapter =
    ALL_CHAPTERS.find((c) => c.id === activeChapterId) || ALL_CHAPTERS[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleSpotlight();
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
        return;
      }

      if (e.key === "/" && !isInput && !isSpotlightOpen) {
        e.preventDefault();
        openSpotlight();
        return;
      }

      if ((e.key === "?" || (e.shiftKey && e.key === "/")) && !isInput && !isSpotlightOpen) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey && !isSpotlightOpen) {
        if (e.key === "1") {
          e.preventDefault();
          setViewMode("focus");
        } else if (e.key === "2") {
          e.preventDefault();
          setViewMode("stream");
        } else if (e.key === "3") {
          e.preventDefault();
          setViewMode("revision");
        } else if (e.key === "4") {
          e.preventDefault();
          setViewMode("matrix");
        } else if (e.key === "5") {
          e.preventDefault();
          setViewMode("lexicon");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setViewMode, toggleSpotlight, openSpotlight, toggleSidebar, isSpotlightOpen]);

  const sectionLabels: Record<string, string> = {
    home: "Home",
    focus: "Chapters",
    stream: "Speed-Read Stream",
    matrix: "Theme Matrix",
    lexicon: "Characters & Symbols",
    revision: "Revision Hub",
  };
  const sectionLabel = sectionLabels[viewMode] || "Home";

  const glassBtn =
    "flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium cursor-pointer transition-colors bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-slate-200 hover:text-white shrink-0";

  return (
    <>
      <header
        data-tour="command-bar"
        className="liquid-glass-bar relative z-20 w-full max-w-full rounded-full px-2.5 py-2 mb-3 flex items-center justify-between gap-2 mac-drag-region"
      >
        <div className="flex items-center gap-2 min-w-0 mac-no-drag">
          <button
            onClick={toggleSidebar}
            title="Toggle sidebar (⌘B)"
            aria-label="Toggle sidebar"
            className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border transition-colors shrink-0 ${
              sidebarCollapsed
                ? "bg-amber-500/25 border-amber-300/50 text-amber-200"
                : "bg-white/[0.07] hover:bg-white/[0.14] border-white/15 text-slate-300"
            }`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0 pl-1">
            <p className="text-sm font-semibold text-white truncate leading-tight">{sectionLabel}</p>
            {(viewMode === "focus" || viewMode === "stream") && (
              <p className="text-[11px] text-amber-200/80 truncate leading-tight">{currentChapter.displayCode}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mac-no-drag">
          <button onClick={openSpotlight} title="Search (⌘K)" className={glassBtn}>
            <Search className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline text-slate-300">Search</span>
            <kbd className="hidden md:inline text-[10px] font-mono text-slate-400">⌘K</kbd>
          </button>

          <div className="hidden sm:flex items-center p-0.5 rounded-full bg-black/30 border border-white/15 h-9 shrink-0">
            {(["learn", "revise"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setStudyGoal(g)}
                title={g === "revise" ? "Quick recall & exam traps" : "Guided study with historical context"}
                className={`px-3 h-full rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  studyGoal === g
                    ? g === "revise"
                      ? "bg-amber-500/30 text-amber-100"
                      : "bg-emerald-500/30 text-emerald-100"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {g === "revise" ? "Revise" : "Study"}
              </button>
            ))}
          </div>

          <button onClick={openExamSprint} title="Timed sprint (⌘E)" className={glassBtn}>
            <Timer className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden lg:inline">Sprint</span>
          </button>

          {!isInspectorOpen && (
            <button onClick={toggleInspector} title="Analysis panel (⌘I)" className={glassBtn}>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden lg:inline">Analysis</span>
            </button>
          )}

          <button
            onClick={() => setIsShortcutsOpen((prev) => !prev)}
            title="Keyboard shortcuts (?)"
            aria-label="Keyboard shortcuts"
            className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer border bg-white/[0.07] hover:bg-white/[0.14] border-white/15 text-slate-300 text-xs font-mono shrink-0"
          >
            ?
          </button>
        </div>
      </header>

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        appName="1984 Dystopian Codex"
        accentColor="#d97706"
        onOpenTour={onOpenWalkthrough}
      />
    </>
  );
});

TopCommandBar.displayName = "TopCommandBar";
