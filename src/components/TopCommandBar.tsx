"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Layers,
  Radar,
  BookMarked,
  Zap,
  Search,
  X,
  ListFilter,
  Eye,
  GraduationCap,
  BookOpen,
  BookA,
  Sparkles,
  Award,
  Flame,
  ArrowRight,
  Timer,
  Keyboard,
  Radio,
  SlidersHorizontal,
  PanelLeft,
  Compass,
} from "lucide-react";
import { ALL_CHAPTERS, TOTAL_CHAPTERS_COUNT } from "@/data";
import { useStudyStore, ViewMode, AcademicStyle } from "@/store/useStudyStore";
import { ChromaticButton } from "./chromatic-button";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { OrwellAppLogo } from "./OrwellAppLogo";

interface TopCommandBarProps {
  onOpenWalkthrough?: () => void;
}

export const TopCommandBar: React.FC<TopCommandBarProps> = React.memo(({
  onOpenWalkthrough,
}) => {
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [isMobileOptionsOpen, setIsMobileOptionsOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const {
    viewMode,
    setViewMode,
    studyGoal,
    setStudyGoal,
    academicStyle,
    setAcademicStyle,
    handwrittenStyle,
    setHandwrittenStyle,
    completedChapters,
    setChapterSheetOpen,
    triggerDiagnostics,
    setActiveChapter,
    isInspectorOpen,
    toggleInspector,
    openExamSprint,
    telescreenMode,
    toggleTelescreenMode,
    sidebarCollapsed,
    toggleSidebar,
    isSpotlightOpen,
    openSpotlight,
    toggleSpotlight,
  } = useStudyStore();

  const completedCount = Object.values(completedChapters || {}).filter(Boolean).length;
  const masteryPercentage = TOTAL_CHAPTERS_COUNT > 0
    ? Math.round((completedCount / TOTAL_CHAPTERS_COUNT) * 100)
    : 0;
  const activeStreak = 5;

  // Keyboard Accelerators (⌘K, Escape, 1-5 View Switching, ⌘E Exam Sprint)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (e.key === "Escape") {
        setIsMobileOptionsOpen(false);
        return;
      }

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

      if (e.key === "/" && !isInput) {
        e.preventDefault();
        openSpotlight();
        return;
      }

      if ((e.key === "?" || (e.shiftKey && e.key === "/")) && !isInput) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
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
  }, [setViewMode, toggleSpotlight, openSpotlight, toggleSidebar]);

  const currentAcademicFont = academicStyle || handwrittenStyle || "newsreader";

  const navModes: { id: ViewMode; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    {
      id: "focus",
      label: "Chapter Bento",
      shortLabel: "Bento",
      icon: <LayoutGrid className="w-3.5 h-3.5" />,
    },
    {
      id: "stream",
      label: "Continuous Flow",
      shortLabel: "Stream",
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: "revision",
      label: "Revision & Exam Hub",
      shortLabel: "Revision",
      icon: <GraduationCap className="w-3.5 h-3.5" />,
    },
    {
      id: "matrix",
      label: "Theme & Quote Matrix",
      shortLabel: "Matrix",
      icon: <Radar className="w-3.5 h-3.5" />,
    },
    {
      id: "lexicon",
      label: "Symbols & Newspeak",
      shortLabel: "Newspeak",
      icon: <BookMarked className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <>
      <header
        className="liquid-glass-long-bar !rounded-3xl overflow-hidden p-2.5 sm:p-3 mb-3 flex flex-col gap-2 shadow-xl relative mac-drag-region transition-all z-20 w-full max-w-full"
      >
        {/* ========================================================================= */}
        {/* MOBILE COMPACT APP HEADER (< 640px) — Apple Human Interface Compliant */}
        {/* ========================================================================= */}
        <div className="flex sm:hidden items-center justify-between gap-2 w-full pb-2 border-b border-white/10 min-h-[44px] mac-no-drag">
          {/* Left: App Logo + Title + Mini Mastery Pill */}
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={triggerDiagnostics}
              title="Click to run live Minitrue System Diagnostics"
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400/25 via-indigo-500/20 to-rose-500/25 border border-sky-400/40 flex items-center justify-center p-1 shadow-md relative cursor-pointer active:scale-95 transition-all overflow-hidden shrink-0"
            >
              <OrwellAppLogo className="w-full h-full object-contain" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping pointer-events-none" />
            </button>
            <div className="leading-tight min-w-0">
              <span className="text-[10px] font-mono font-bold tracking-wider text-sky-400 uppercase truncate block">
                MINITRUE
              </span>
              <span className="text-[11px] font-semibold text-white tracking-tight truncate block">
                1984 Codex
              </span>
            </div>
            {/* Ultra-compact mastery pill */}
            <button
              type="button"
              onClick={triggerDiagnostics}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 shrink-0"
            >
              <Award className="w-3 h-3 text-emerald-400" />
              <span className="font-bold">{masteryPercentage}%</span>
            </button>
          </div>

          {/* Right: Quick Touch Action Bar */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Study/Revise Toggle Button */}
            <button
              onClick={() => setStudyGoal(studyGoal === "revise" ? "learn" : "revise")}
              title={`Active Mode: ${studyGoal === "revise" ? "Revision (Sprint)" : "Study (Deep)"}. Tap to toggle.`}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer active:scale-95 ${
                studyGoal === "revise"
                  ? "bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-sm"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-sm"
              }`}
            >
              {studyGoal === "revise" ? (
                <>
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span>Revise</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3 h-3 text-emerald-300" />
                  <span>Study</span>
                </>
              )}
            </button>

            {/* Chapter Index Drawer Button */}
            <button
              onClick={() => setChapterSheetOpen(true)}
              title="Browse All 24 Chapters"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white active:scale-90 transition-all cursor-pointer"
            >
              <ListFilter className="w-4 h-4 text-sky-300" />
            </button>

            {/* Search Trigger Button */}
            <button
              onClick={openSpotlight}
              title="Search Orwell Codex (⌘K / /)"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white active:scale-90 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Options & Tools Sheet Trigger */}
            <button
              onClick={() => setIsMobileOptionsOpen(true)}
              title="Preferences & Tools"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white active:scale-90 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP FULL COMMAND HEADER (>= 640px) */}
        {/* ========================================================================= */}
        <div className="hidden sm:flex items-center justify-between gap-2 w-full pb-2 border-b border-white/10 min-h-[42px] max-w-full overflow-hidden">
          {/* Brand & Breadcrumbs (Left: Flexible, shrinks cleanly) */}
          <div className="flex items-center gap-2 min-w-0 shrink mac-no-drag">
            {/* Native macOS Sidebar Toggle (⌘B) */}
            <button
              onClick={toggleSidebar}
              title={sidebarCollapsed ? "Expand Chapter Navigation Sidebar (⌘B)" : "Collapse Sidebar for Wide View (⌘B)"}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer soft-button shrink-0 border ${
                sidebarCollapsed
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-sm"
                  : "bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border-white/10"
              }`}
            >
              <PanelLeft className="w-4 h-4" />
            </button>

            {/* Brand Logo & Title */}
            <button
              onClick={triggerDiagnostics}
              title="Click to run live Minitrue System Diagnostics"
              className="flex items-center gap-2 min-w-0 text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400/25 via-indigo-500/20 to-rose-500/25 border border-sky-400/40 flex items-center justify-center p-1 shadow-md relative shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                <OrwellAppLogo className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0 leading-tight">
                <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-sky-400 uppercase block truncate">
                  MINITRUE // 1984
                </span>
                <span className="text-xs font-semibold text-white tracking-tight truncate block">
                  Oceania Codex
                </span>
              </div>
            </button>
          </div>

          {/* Right Section: Compact Ergonomic Modality Switchers & Action Pills */}
          <div className="flex items-center justify-end gap-1.5 shrink-0 mac-no-drag">
            {/* Quick Spotlight Trigger Button */}
            <button
              onClick={openSpotlight}
              title="Search Chapters & Themes (⌘K)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/50 hover:bg-black/70 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white cursor-pointer transition-all shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-medium text-slate-300 hidden md:inline">Search</span>
              <kbd className="inline-flex items-center px-1 py-0.2 rounded text-[9px] font-mono font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-400/25">
                ⌘K
              </kbd>
            </button>

            {/* Study Goal Switcher: Revision vs Study (Compact Segmented Pill) */}
            <div className="flex items-center p-0.5 rounded-full bg-black/60 border border-white/12 text-xs shrink-0">
              <button
                onClick={() => setStudyGoal("revise")}
                title="Pre-lesson cramming, exam traps & active recall"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  studyGoal === "revise"
                    ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Zap className="w-3 h-3 text-amber-300" />
                <span className="text-[11px]">Revise</span>
              </button>
              <button
                onClick={() => setStudyGoal("learn")}
                title="First-time guided study with context"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  studyGoal === "learn"
                    ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-3 h-3 text-emerald-300" />
                <span className="text-[11px]">Study</span>
              </button>
            </div>

            {/* Timed Exam Sprint Button */}
            <button
              onClick={openExamSprint}
              title="Launch Timed Exam Sprint (⌘E)"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border bg-cyan-500/15 text-cyan-200 border-cyan-400/35 hover:bg-cyan-500/25 shadow-sm soft-button shrink-0"
            >
              <Timer className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span className="text-[10px] font-mono text-cyan-400/70">⌘E</span>
            </button>

            {/* Telescreen CRT Surveillance Mode Toggle */}
            <button
              onClick={toggleTelescreenMode}
              title={telescreenMode ? "Disable Telescreen CRT Mode" : "Enable Telescreen Surveillance CRT Mode"}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border shrink-0 soft-button ${
                telescreenMode
                  ? "bg-rose-500/25 text-rose-200 border-rose-400/40 shadow-sm animate-pulse"
                  : "bg-black/50 text-slate-400 hover:text-white border-white/12"
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${telescreenMode ? "text-rose-400" : "text-slate-400"}`} />
              <span className="text-[11px]">CRT</span>
            </button>

            {/* Pro Analytical Inspector Toggle Pill (Shown only when tucked away to prevent collision) */}
            {!isInspectorOpen && (
              <button
                onClick={toggleInspector}
                title="Open Analytical Inspector (⌘I)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border soft-button shrink-0 bg-cyan-500/15 text-cyan-200 hover:text-white border-cyan-400/50 hover:border-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.35)] tucked-pill-beacon-cyan"
              >
                <Eye className="w-3.5 h-3.5 text-cyan-300" />
                <span className="text-[10px] font-mono text-cyan-400/80">⌘I</span>
              </button>
            )}

            {/* Native Shortcuts Cheatsheet Guide (?) */}
            <button
              onClick={() => setIsShortcutsOpen((prev) => !prev)}
              title="Keyboard Shortcuts Cheatsheet (?)"
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold transition-all cursor-pointer border bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border-white/10 shadow-sm soft-button shrink-0"
            >
              <span className="text-xs font-mono font-bold text-slate-300">?</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 2: SYMMETRICAL 5-COLUMN NAVIGATION GRID — 100% Adaptive to Any Mac */}
        {/* ========================================================================= */}
        <nav
          aria-label="Integrated Main Sections Bar"
          className="w-full grid grid-cols-5 gap-1 p-1 bg-black/60 border border-white/12 rounded-2xl shadow-inner relative max-w-full overflow-hidden"
        >
          {navModes.map((mode) => {
            const isActive = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`relative col-span-1 flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-1 rounded-xl text-xs font-bold transition-colors cursor-pointer min-w-0 overflow-hidden ${
                  isActive
                    ? "text-cyan-200"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTabIndicator"
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-xl bg-cyan-500/25 border border-cyan-400/50 shadow-md shadow-cyan-500/20 pointer-events-none"
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-cyan-300 shrink-0" : "text-slate-400 shrink-0"}`}>
                  {mode.icon}
                </span>
                <span className="relative z-10 text-xs truncate">{mode.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Keyboard Shortcuts Cheatsheet Modal */}
        <KeyboardShortcutsModal
          isOpen={isShortcutsOpen}
          onClose={() => setIsShortcutsOpen(false)}
          appName="Orwell 1984 Codex"
          accentColor="#0ea5e9"
          onOpenTour={onOpenWalkthrough}
        />
      </header>

      {/* ========================================================================= */}
      {/* MOBILE PREFERENCES & TOOLS SHEET (SLIDE-UP FROM BOTTOM ON IPHONE) */}
      {/* ========================================================================= */}
      {isMobileOptionsOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/75 backdrop-blur-md transition-all"
          onClick={() => setIsMobileOptionsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#070b14] border-t border-white/15 rounded-t-3xl p-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-250 select-none"
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto -mt-1 shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Codex Preferences &amp; Tools</h3>
              </div>
              <button
                onClick={() => setIsMobileOptionsOpen(false)}
                className="p-1.5 rounded-full bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Typography Selection */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2 font-bold">
                Academic Typography
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "newsreader", label: "Oxford Newsreader", icon: "🎓" },
                  { id: "garamond", label: "Classical Garamond", icon: "🏛️" },
                  { id: "jakarta", label: "Modern Jakarta", icon: "🔬" },
                ].map((font) => (
                  <button
                    key={font.id}
                    onClick={() => {
                      const val = font.id as AcademicStyle;
                      setAcademicStyle(val);
                      setHandwrittenStyle(val);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      currentAcademicFont === font.id
                        ? "bg-sky-500/20 border-sky-400/60 text-white shadow-md shadow-sky-500/20"
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    <span className="text-lg mb-1">{font.icon}</span>
                    <span className="text-[11px] font-semibold leading-tight">{font.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Timed Exam Sprint & Surveillance Mode Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setIsMobileOptionsOpen(false);
                  openExamSprint();
                }}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                <Timer className="w-4 h-4 text-cyan-300 animate-pulse" />
                <span>Timed Exam Sprint</span>
              </button>

              <button
                onClick={toggleTelescreenMode}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-sm ${
                  telescreenMode
                    ? "bg-rose-500/25 border-rose-400/50 text-rose-200 animate-pulse"
                    : "bg-white/5 border-white/10 text-slate-300"
                }`}
              >
                <Radio className={`w-4 h-4 ${telescreenMode ? "text-rose-400" : "text-slate-400"}`} />
                <span>{telescreenMode ? "CRT Active" : "CRT Surveillance"}</span>
              </button>
            </div>

            {/* Run Diagnostics */}
            <button
              onClick={() => {
                setIsMobileOptionsOpen(false);
                triggerDiagnostics();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 transition-all cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Run System Diagnostics ({masteryPercentage}% Complete)</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
});

TopCommandBar.displayName = "TopCommandBar";
