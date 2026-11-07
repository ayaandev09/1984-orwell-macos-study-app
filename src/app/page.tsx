"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { AmbientAuroraCanvas } from "@/components/AmbientAuroraCanvas";
import { BOOK_PARTS, ALL_CHAPTERS, THEMES_TAXONOMY } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { FloatingSidebar } from "@/components/FloatingSidebar";
import { TopCommandBar } from "@/components/TopCommandBar";
import { WidgetBridge } from "@/components/WidgetBridge";
import { ChapterBentoCard } from "@/components/ChapterBentoCard";
import { StudyMiniHomepage } from "@/components/StudyMiniHomepage";
import { ThemeMatrixView } from "@/components/ThemeMatrixView";
import { LexiconDossierView } from "@/components/LexiconDossierView";
import { RevisionHubView } from "@/components/RevisionHubView";
import { FloatingBottomDock } from "@/components/FloatingBottomDock";
import { StartupDiagnosticsOverlay } from "@/components/StartupDiagnosticsOverlay";
import { CinematicStartupIntro } from "@/components/CinematicStartupIntro";
import { ImmersiveAppWalkthrough } from "@/components/ImmersiveAppWalkthrough";
import { OrwellRightInspector } from "@/components/OrwellRightInspector";
import { TimedExamSprintModal } from "@/components/TimedExamSprintModal";
import { JellySpotlightModal } from "@/components/JellySpotlightModal";
import { ChromaticButton } from "@/components/chromatic-button";
import { initLiveSyncConnection, decodeSyncFromUrl, pullSyncFromServer } from "@/lib/syncService";
import { initGlobalTactileListener } from "@/lib/tactileHaptics";
import { CheckCircle2, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export default function Orwell1984LiquidShellPage() {
  const {
    activeChapterId,
    setActiveChapter,
    activePartFilter,
    setActivePartFilter,
    viewMode,
    searchQuery,
    setSearchQuery,
    completedChapters,
    toggleChapterComplete,
    goToNextChapter,
    academicStyle,
    handwrittenStyle,
    applyRemoteSync,
    isInspectorOpen,
    toggleInspector,
    isExamSprintActive,
    closeExamSprint,
    toggleExamSprint,
    telescreenMode,
    isSpotlightOpen,
    closeSpotlight,
    setStudyGoal,
  } = useStudyStore();

  const [isStartupActive, setIsStartupActive] = useState(true);
  const [showMainUI, setShowMainUI] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);

  const handleStartupComplete = useCallback(() => {
    setIsStartupActive(false);
    setShowMainUI(true);
    if (typeof window !== "undefined") {
      const hasSeen = localStorage.getItem("hasSeenAppWalkthrough_1984_v1");
      if (!hasSeen) {
        setIsWalkthroughOpen(true);
      }
    }
  }, []);

  // Synchronize universal academic professional font attribute
  useEffect(() => {
    if (typeof document !== "undefined") {
      const activeFont = academicStyle || handwrittenStyle || "newsreader";
      document.documentElement.setAttribute("data-academic-font", activeFont);
      document.documentElement.setAttribute("data-handwritten-style", activeFont);
    }
  }, [academicStyle, handwrittenStyle]);

  // Activate universal tactile mechanical feedback on buttons
  useEffect(() => {
    const cleanup = initGlobalTactileListener();
    return cleanup;
  }, []);

  // Global Keyboard Shortcut: Cmd/Ctrl + I to toggle Analytical Inspector, Cmd/Ctrl + E to toggle Exam Sprint
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        toggleInspector();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "e") {
        e.preventDefault();
        toggleExamSprint();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleInspector, toggleExamSprint]);

  // Live Sync and URL Payload Hydration
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const syncParam = params.get("sync");

    // 1. Hydrate from QR Code URL sync payload if present
    if (syncParam) {
      const decoded = decodeSyncFromUrl(syncParam);
      if (decoded) {
        applyRemoteSync(decoded);
      }
    } else {
      // Otherwise fetch latest cloud sync state
      pullSyncFromServer().then((remote) => {
        if (remote) applyRemoteSync(remote);
      });
    }

    // 2. Establish continuous bi-directional real-time sync with Mac
    const disconnectSync = initLiveSyncConnection((incoming) => {
      applyRemoteSync(incoming);
    });

    return () => {
      disconnectSync();
    };
  }, [applyRemoteSync]);

  const activeChapter = useMemo(
    () => ALL_CHAPTERS.find((c) => c.id === activeChapterId) || ALL_CHAPTERS[0],
    [activeChapterId]
  );

  const activeBookPart = useMemo(
    () => BOOK_PARTS.find((p) => p.id === activeChapter.partId) || BOOK_PARTS[0],
    [activeChapter.partId]
  );

  const currentChapterIndex = useMemo(
    () => ALL_CHAPTERS.findIndex((c) => c.id === activeChapter.id),
    [activeChapter.id]
  );

  const nextChapter = useMemo(
    () =>
      currentChapterIndex >= 0 && currentChapterIndex < ALL_CHAPTERS.length - 1
        ? ALL_CHAPTERS[currentChapterIndex + 1]
        : null,
    [currentChapterIndex]
  );

  const filteredStreamChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_CHAPTERS.filter((ch) => {
      // Global search across all parts when query is active
      if (!q && activePartFilter !== "all" && ch.partId !== activePartFilter) {
        return false;
      }
      if (q) {
        return (
          ch.title.toLowerCase().includes(q) ||
          ch.subtitle.toLowerCase().includes(q) ||
          ch.displayCode.toLowerCase().includes(q) ||
          ch.summary.toLowerCase().includes(q) ||
          ch.subSections.some(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.content.toLowerCase().includes(q)
          ) ||
          ch.quotes.some(
            (qt) =>
              qt.quote.toLowerCase().includes(q) ||
              qt.analysis.toLowerCase().includes(q)
          )
        );
      }
      return true;
    });
  }, [activePartFilter, searchQuery]);

  // When searching in focus mode, automatically sync active chapter to first search match
  useEffect(() => {
    if (searchQuery.trim() && filteredStreamChapters.length > 0) {
      if (!filteredStreamChapters.some((ch) => ch.id === activeChapterId)) {
        setActiveChapter(filteredStreamChapters[0].id);
      }
    }
  }, [searchQuery,
    setSearchQuery, filteredStreamChapters, activeChapterId, setActiveChapter]);

  return (
    <>
      {/* 1. Bulletproof Zero-Latency Liquid Glass Startup Animation */}
      <AnimatePresence>
        {isStartupActive && (
          <CinematicStartupIntro
            isOpen={isStartupActive}
            onClose={handleStartupComplete}
            onComplete={handleStartupComplete}
          />
        )}
      </AnimatePresence>

      {/* Telescreen Ambient CRT Surveillance Scanlines & Phosphor Grain */}
      {telescreenMode && <div className="telescreen-scanlines pointer-events-none" />}

      {/* 2. Main Study Dashboard - Fluid Liquid Glass Reveal */}
      <div
        className={`mac-dashboard-shell transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          telescreenMode ? "telescreen-glow" : ""
        } ${
          showMainUI
            ? "opacity-100 scale-100 filter-none pointer-events-auto"
            : "opacity-75 scale-[0.985] blur-[6px] pointer-events-none select-none"
        }`}
      >
        <AmbientAuroraCanvas />
        {/* ==================== MAIN SHELL CONTAINER ==================== */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row gap-5 items-start">
        {/* Left Floating Sidebar */}
        <FloatingSidebar isMobileSheet={false} />

        {/* Right Main Content Workspace */}
        <main className="flex-1 min-w-0 w-full pb-36">
          {/* Top Command & View Switcher Bar */}
          <WidgetBridge />
          <TopCommandBar onOpenWalkthrough={() => setIsWalkthroughOpen(true)} />

          {/* Mini Homepage & Live Widget Telemetry Hub */}
          <StudyMiniHomepage />

          {/* ==================== BUTTER-SMOOTH VIEW CONTENT WORKSPACE ==================== */}
          <div key={viewMode} className="liquid-view-enter">
            {/* ==================== VIEW 1: FOCUS CHAPTER BENTO ==================== */}
            {viewMode === "focus" && (
              <div className="space-y-5">
                {/* Book Part Context Banner - 100% Full-Width Bulletproof Native Card */}
                <div className="liquid-glass-bento rounded-3xl p-5 mb-5 border border-white/15 shadow-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl space-y-3">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-sky-400 uppercase block">
                          Book Part Overview
                        </span>
                        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                          {activeBookPart.title}
                        </h2>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-400/15 text-sky-300 border border-sky-400/30 shrink-0">
                      {activeBookPart.chapters.length} Chapters
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed w-full">
                    {activeBookPart.overview}
                  </p>

                  {activeBookPart.dominantThemes && activeBookPart.dominantThemes.length > 0 && (
                    <div className="pt-1 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 mr-1">Key Themes:</span>
                      {activeBookPart.dominantThemes.map((tId) => {
                        const t = THEMES_TAXONOMY[tId];
                        if (!t) return null;
                        return (
                          <span
                            key={tId}
                            className="px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all hover:brightness-110 cursor-default"
                            style={{
                              backgroundColor: t.badgeBg,
                              borderColor: t.badgeBorder,
                              color: t.badgeText,
                            }}
                          >
                            {t.shortName || t.name}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Active Chapter Bento Grid with Buttery Smooth Swap */}
                <div key={activeChapter.id} data-tour="study-bento" className="liquid-chapter-swap">
                  <ChapterBentoCard
                    chapter={activeChapter}
                    isDeferredBelowFold={false}
                    showPrevNextControls={true}
                  />
                </div>

                {/* Seamless Next-Chapter Speed-Read Transition Footer */}
                {nextChapter && (
                  <div className="liquid-glass-bento rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                        Up Next in Your Speed-Read Queue
                      </div>
                      <div className="text-base sm:text-lg font-bold text-white">
                        {nextChapter.displayCode}: {nextChapter.title}
                      </div>
                      <div className="text-xs text-sky-300">
                        {nextChapter.subtitle}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <ChromaticButton
                        onClick={() => {
                          if (!completedChapters[activeChapter.id]) {
                            toggleChapterComplete(activeChapter.id);
                          }
                          goToNextChapter();
                          window.scrollTo(0, 0);
                        }}
                        color="#00802f"
                        colorMode="spectrum"
                        speed={0.7}
                        paused={false}
                        phase={0}
                        feather={100}
                        projectionScale={174.7}
                        intensity={1.4}
                        grain={0.105}
                        seed={7}
                        borderRadius={50}
                        hoverEffect="brighten"
                        entrance="blur-up"
                        entranceSpeed={1}
                        entranceBlur={10}
                        entranceDistance={20}
                        entranceScale={0.65}
                        className="!min-w-[240px] !h-12 !px-6 !text-xs font-bold shadow-xl cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-300 mr-2" />
                        <span>Complete {activeChapter.displayCode} &amp; Continue</span>
                        <ArrowRight className="w-4 h-4 text-white ml-2" />
                      </ChromaticButton>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ==================== VIEW 2: CONTINUOUS FLOW STREAM ==================== */}
            {viewMode === "stream" && (
              <div className="space-y-6">
                {/* Part Filter Bar */}
                <div className="liquid-glass-bento rounded-3xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-bold text-white">
                      Continuous Speed-Read Flow ({filteredStreamChapters.length}{" "}
                      Chapters)
                    </h2>
                    <p className="text-xs text-slate-400">
                      All chapters rendered in a continuous stream with WebKit GPU &amp;{" "}
                      <code className="text-sky-300">content-visibility: auto</code>{" "}
                      off-screen optimization
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {(
                      [
                        { id: "all", label: "All Parts (25)" },
                        { id: "part-1", label: "Part I (8)" },
                        { id: "part-2", label: "Part II (10)" },
                        { id: "part-3", label: "Part III + App (7)" },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActivePartFilter(tab.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          activePartFilter === tab.id
                            ? "bg-sky-500/30 text-white border border-sky-400/50"
                            : "liquid-glass-pill text-slate-300 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredStreamChapters.length === 0 ? (
                  <div className="liquid-glass-bento rounded-3xl p-10 text-center">
                    <p className="text-base font-semibold text-white mb-1">
                      No chapters matched &ldquo;{searchQuery}&rdquo;
                    </p>
                    <p className="text-xs text-slate-400">
                      Try searching for &ldquo;Syme&rdquo;, &ldquo;Room 101&rdquo;,
                      &ldquo;paperweight&rdquo;, &ldquo;Goldstein&rdquo;, or
                      &ldquo;two plus two&rdquo;.
                    </p>
                  </div>
                ) : (
                  filteredStreamChapters.map((ch, index) => (
                    <ChapterBentoCard
                      key={ch.id}
                      chapter={ch}
                      isDeferredBelowFold={index > 0}
                      showPrevNextControls={false}
                    />
                  ))
                )}
              </div>
            )}

            {/* ==================== VIEW 3: THEME & QUOTE MATRIX ==================== */}
            {viewMode === "matrix" && <ThemeMatrixView />}

            {/* ==================== VIEW 4: SYMBOLS, DOSSIERS & NEWSPEAK ==================== */}
            {viewMode === "lexicon" && <LexiconDossierView />}

            {/* ==================== VIEW 5: REVISION & EXAM HUB ==================== */}
            {viewMode === "revision" && <RevisionHubView />}
          </div>
        </main>

        {/* Right Sticky Liquid Glass Analytical Inspector */}
        <OrwellRightInspector
          chapter={activeChapter}
          isOpen={isInspectorOpen}
          onToggle={toggleInspector}
        />
      </div>



      {/* ==================== STARTUP DIAGNOSTICS & TELEMETRY OVERLAY ==================== */}
      <StartupDiagnosticsOverlay />
    </div>

    {/* Timed Exam Sprint Full-Screen Simulation Modal */}
    <TimedExamSprintModal
      isOpen={isExamSprintActive}
      onClose={closeExamSprint}
      chapter={activeChapter}
    />

    {/* Flagship Jelly Spotlight Search Modal (Raycast Ergonomics) */}
    <JellySpotlightModal
      isOpen={isSpotlightOpen}
      onClose={closeSpotlight}
    />

    {/* Immersive Onboarding Walkthrough Tour */}
    <ImmersiveAppWalkthrough
      isOpen={isWalkthroughOpen}
      onClose={() => setIsWalkthroughOpen(false)}
      onSelectGoal={(goal) => setStudyGoal(goal)}
      isInspectorOpen={isInspectorOpen}
      onOpenInspector={() => {
        if (!isInspectorOpen) toggleInspector();
      }}
    />
    </>
  );
}
