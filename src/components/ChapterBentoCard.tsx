"use client";

import React, { useState } from "react";
import { AcademicNotesSurface } from "@/components/AcademicNotesSurface";
import {
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
  Radio,
  Zap,
  Quote,
  Bookmark,
  Sparkles,
  Layers,
  ShieldAlert,
  GraduationCap,
  FileEdit,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  ShieldCheck,
  Eye,
  EyeOff,
  Flame,
  ArrowRight,
} from "lucide-react";
import {
  ChapterData,
  THEMES_TAXONOMY,
  BOOK_PARTS,
  PRE_LESSON_CRAM_SHEETS,
} from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { RecallFlipCard } from "@/components/RecallFlipCard";
import { ChapterAnnotationsBento } from "@/components/ChapterAnnotationsBento";

interface ChapterBentoCardProps {
  chapter: ChapterData;
  isDeferredBelowFold?: boolean;
  showPrevNextControls?: boolean;
}

export const ChapterBentoCard: React.FC<ChapterBentoCardProps> = React.memo(({
  chapter,
  isDeferredBelowFold = false,
  showPrevNextControls = true,
}) => {
  const {
    completedChapters,
    completedSubSections,
    bookmarkedQuotes,
    chapterNotes,
    speedReadMode,
    studyGoal,
    spoilerMaskActive,
    toggleSpoilerMask,
    setViewMode,
    setRevisionTab,
    toggleChapterComplete,
    toggleSubSectionComplete,
    toggleBookmarkQuote,
    setChapterNote,
    goToPrevChapter,
    goToNextChapter,
  } = useStudyStore();

  const [localSpoilerRevealed, setLocalSpoilerRevealed] = useState(false);

  const matchingCram = PRE_LESSON_CRAM_SHEETS.find(
    (c) => c.chapterCode === chapter.displayCode
  );

  const isSpoilerSensitive =
    chapter.partNumber === 3 ||
    chapter.displayCode === "II.10" ||
    chapter.displayCode === "II.8";

  const isChapterDone = !!completedChapters[chapter.id];
  const bookPart = BOOK_PARTS.find((p) => p.id === chapter.partId);
  const completedSubsCount = chapter.subSections.filter(
    (s) => !!completedSubSections[s.id]
  ).length;

  const surveillanceColors: Record<
    ChapterData["surveillanceLevel"],
    { bg: string; border: string; text: string; dot: string }
  > = {
    LOW: {
      bg: "rgba(16, 185, 129, 0.14)",
      border: "rgba(16, 185, 129, 0.45)",
      text: "#a7f3d0",
      dot: "#10b981",
    },
    MODERATE: {
      bg: "rgba(56, 189, 248, 0.14)",
      border: "rgba(56, 189, 248, 0.45)",
      text: "#bae6fd",
      dot: "#38bdf8",
    },
    HIGH: {
      bg: "rgba(245, 158, 11, 0.16)",
      border: "rgba(245, 158, 11, 0.45)",
      text: "#fde68a",
      dot: "#f59e0b",
    },
    "COVERT TRAP": {
      bg: "rgba(168, 85, 247, 0.18)",
      border: "rgba(168, 85, 247, 0.5)",
      text: "#e9d5ff",
      dot: "#a855f7",
    },
    "ABSOLUTE PANOPTICON": {
      bg: "rgba(244, 63, 94, 0.2)",
      border: "rgba(244, 63, 94, 0.55)",
      text: "#fecdd3",
      dot: "#f43f5e",
    },
  };

  const survBadge = surveillanceColors[chapter.surveillanceLevel];

  return (
    <article
      id={`chapter-card-${chapter.id}`}
      className={`space-y-5 topic-transition-enter ${
        isDeferredBelowFold ? "deferred-chapter-card" : ""
      }`}
    >
      <RecallFlipCard
        moduleCode={chapter.displayCode}
        title={`${chapter.displayCode} · ${chapter.title}`}
        prompt={
          matchingCram?.teacherDiscussionQuestions?.[0] ||
          chapter.examPromptTakeaway ||
          chapter.summary
        }
        answer={matchingCram?.sixtySecondSummary || chapter.summary}
        accent="#f59e0b"
        secondary="#d97706"
        meta="ACTIVE RECALL"
      />

      {/* ==================== BENTO HERO HEADER ==================== */}
      <div className="liquid-glass-bento rounded-3xl p-6 lg:p-7 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {/* Hierarchy Breadcrumb: Book Part ➔ Chapter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-200 border border-amber-400/35">
              Part {bookPart?.romanNumeral} • Chapter {chapter.displayCode}
            </span>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
              style={{
                backgroundColor: survBadge.bg,
                borderColor: survBadge.border,
                color: survBadge.text,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: survBadge.dot }}
              />
              SURVEILLANCE: {chapter.surveillanceLevel}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300 liquid-glass-pill">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              {chapter.readingTimeMinutes} min speed-read
            </span>
          </div>

          {/* Interactive Chapter Check-Off + Prev/Next Buttons */}
          <div className="flex items-center gap-2">
            {showPrevNextControls && (
              <div className="flex items-center gap-1 mr-1">
                <button
                  onClick={goToPrevChapter}
                  title="Previous Chapter"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goToNextChapter}
                  title="Next Chapter"
                  className="p-2 rounded-2xl liquid-glass-pill text-slate-300 hover:text-white cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => {
                toggleChapterComplete(chapter.id);
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate(20);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 select-none ${
                isChapterDone
                  ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/50 shadow-lg shadow-emerald-500/20"
                  : "bg-white/10 hover:bg-sky-500/25 text-white border border-white/25 hover:border-sky-300/50"
              }`}
            >
              <div className={isChapterDone ? "animate-tick-pop" : ""}>
                {isChapterDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-sky-300" />
                )}
              </div>
              <span>{isChapterDone ? "Chapter Completed" : "Mark Chapter Read"}</span>
            </button>
          </div>
        </div>

        {/* Chapter Title & Subtitle */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug mb-1.5 font-display">
          {chapter.title}
        </h1>
        <p className="text-xs sm:text-sm text-sky-200/85 font-medium mb-4">
          {chapter.subtitle}
        </p>

        {/* Setting & Telescreen Metadata Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-4 border-t border-white/10 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-slate-400 font-medium">Setting:</span>
            <span className="text-white truncate">{chapter.setting}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Radio className="w-4 h-4 text-rose-400 shrink-0" />
            <span className="text-slate-400 font-medium">Telescreen:</span>
            <span className="text-rose-200 truncate">
              {chapter.telescreenStatus}
            </span>
          </div>
        </div>
      </div>

      {/* ==================== DUAL-PURPOSE MODALITY CALLOUT ==================== */}
      {studyGoal === "revise" ? (
        /* REVISION & PRE-LESSON CRAM VIEW */
        <div className="liquid-glass-bento rounded-3xl p-5 border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/40">
                <Flame className="w-4 h-4 text-amber-400" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Pre-Lesson 60-Second Cram &amp; Discussion Ready
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Ch. {chapter.displayCode}
                  </span>
                </div>
                <p className="text-xs text-amber-200/80">
                  Instant talking points for class participation, high-yield quotes, and exam trap warnings.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setViewMode("revision");
                setRevisionTab("cram");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-pill text-xs font-bold text-amber-200 hover:text-white shrink-0 self-start sm:self-center cursor-pointer"
            >
              <span>Full Revision Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {matchingCram ? (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-200 leading-relaxed">
                <span className="font-bold text-amber-300 block mb-1">
                  ⚡ 60-Second Takeaway:
                </span>
                {matchingCram.sixtySecondSummary}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Teacher Will Ask */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                  <span className="font-bold text-sky-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Teacher Will Ask (Raise Hand):
                  </span>
                  <ul className="space-y-1">
                    {matchingCram.teacherDiscussionQuestions.slice(0, 2).map((q, idx) => (
                      <li key={idx} className="text-slate-300 pl-2.5 border-l-2 border-sky-400/50">
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exam Trap */}
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-1">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Avoid Exam Trap:
                  </span>
                  <p className="text-rose-200/90 leading-snug">
                    {matchingCram.commonMisconceptions}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-black/30 border border-white/10 text-xs text-slate-300">
              <span className="font-bold text-amber-300 block mb-1">
                🎯 Core Analytical Exam Thesis:
              </span>
              <p className="leading-relaxed">{chapter.examPromptTakeaway}</p>
            </div>
          )}
        </div>
      ) : (
        /* FIRST-TIME READER COMPANION VIEW */
        <div className="liquid-glass-bento rounded-3xl p-5 border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                <BookOpen className="w-4 h-4 text-emerald-400" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    First-Time Reader Companion
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                    Guided Reading
                  </span>
                </div>
                <p className="text-xs text-emerald-200/80">
                  Orientation for understanding Orwell's world building, motifs, and narrative trajectory.
                </p>
              </div>
            </div>

            {isSpoilerSensitive && (
              <button
                onClick={() => setLocalSpoilerRevealed(!localSpoilerRevealed)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  localSpoilerRevealed
                    ? "bg-amber-500/25 text-amber-200 border border-amber-400/40"
                    : "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40"
                }`}
              >
                {localSpoilerRevealed ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-amber-300" />
                    <span>Spoilers Unmasked</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Spoiler Shield On</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Reader Orientation Body */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-200 leading-relaxed">
            <span className="font-bold text-emerald-300 block mb-1">
              🧭 What to look for in Chapter {chapter.displayCode}:
            </span>
            <p>
              Pay attention to how Orwell establishes <strong>{chapter.setting}</strong> and the contrast between Winston's internal psychology and the external surveillance apparatus. Notice how the motif of <em>{chapter.analysis.motifsAndSymbols[0] || "totalitarian control"}</em> surfaces during key interactions.
            </p>
          </div>

          {/* Spoiler Mask Alert for sensitive chapters */}
          {isSpoilerSensitive && spoilerMaskActive && !localSpoilerRevealed && (
            <div className="mt-3 p-3 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-between text-xs text-amber-200">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Spoiler Shield:</strong> High-impact plot twists in this chapter's deeper analysis are currently shielded to protect your reading suspense.
                </span>
              </span>
              <button
                onClick={() => setLocalSpoilerRevealed(true)}
                className="underline hover:text-white font-bold ml-3 shrink-0 cursor-pointer"
              >
                Reveal Analysis
              </button>
            </div>
          )}
        </div>
      )}

      {/* ==================== BENTO ROW 1: SUMMARY & THEME TRACKING (DESKTOP MULTI-COLUMN) ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Summary & Speed-Read Bullets (7 Cols) */}
        <div className="lg:col-span-7 liquid-glass-bento rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {speedReadMode
                      ? "High-Velocity Speed-Read Digest"
                      : "Comprehensive Chapter Summary"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Synthesized from SparkNotes, LitCharts &amp; American Literature
                  </p>
                </div>
              </div>
            </div>

            {/* High-Yield Speed-Read Bullets */}
            <div
              className={`rounded-2xl p-4 mb-4 border ${
                speedReadMode
                  ? "bg-amber-500/10 border-amber-400/35"
                  : "bg-white/[0.03] border-white/10"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Rapid Late-Night Speed-Read Beats
              </div>
              <ul className="space-y-2">
                {chapter.speedReadBullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Narrative Prose Summary */}
            {!speedReadMode && (
              <div className="space-y-3 text-sm sm:text-[15px] text-slate-200/95 leading-relaxed">
                {chapter.summary.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* Exam Thesis Banner */}
          <div className="mt-5 pt-4 border-t border-white/10">
            <div className="rounded-2xl p-3.5 bg-gradient-to-r from-sky-500/15 via-indigo-500/15 to-purple-500/15 border border-sky-400/30">
              <div className="text-[11px] font-bold uppercase tracking-wider text-sky-300 mb-1 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                Core Analytical Thesis Takeaway
              </div>
              <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                {chapter.examPromptTakeaway}
              </p>
            </div>
          </div>
        </div>

        {/* Theme Tracking Bento (5 Cols) */}
        <div className="lg:col-span-5 liquid-glass-bento rounded-3xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-rose-500/20 border border-rose-400/30 text-rose-300">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white">
                  Theme Tracking &amp; Intensity
                </h3>
                <p className="text-xs text-slate-400">
                  Active ideological mechanisms in {chapter.displayCode}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {chapter.themeTracking.map((track) => {
                const themeDef = THEMES_TAXONOMY[track.themeId];
                if (!themeDef) return null;

                return (
                  <div
                    key={track.themeId}
                    className="rounded-2xl p-3.5 bg-black/30 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                          style={{
                            backgroundColor: themeDef.badgeBg,
                            borderColor: themeDef.badgeBorder,
                            color: themeDef.badgeText,
                          }}
                        >
                          {themeDef.shortName}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                          {themeDef.newspeakTerm}
                        </span>
                      </div>

                      {/* 5-Bar Intensity Meter */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((lvl) => (
                          <span
                            key={lvl}
                            className="w-2.5 h-3 rounded-sm transition-all"
                            style={{
                              backgroundColor:
                                lvl <= track.intensity
                                  ? themeDef.color
                                  : "rgba(255,255,255,0.1)",
                              boxShadow:
                                lvl <= track.intensity
                                  ? `0 0 8px ${themeDef.glowColor}`
                                  : "none",
                            }}
                          />
                        ))}
                        <span className="ml-1 text-[11px] font-mono font-bold text-slate-300">
                          {track.intensity}/5
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      {track.manifestation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Symbols & Motifs Active in Chapter */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Symbols &amp; Motifs Present
            </div>
            <div className="flex flex-wrap gap-1.5">
              {chapter.analysis.motifsAndSymbols.map((sym, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl text-xs bg-white/[0.06] border border-white/15 text-sky-200"
                >
                  {sym}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ==================== BENTO ROW 2: SUB-SECTIONS HIERARCHY ==================== */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-300">
              <Layers className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Hierarchical Scene &amp; Sub-Section Breakdown
              </h3>
              <p className="text-xs text-slate-400">
                Book Part {bookPart?.partNumber} ➔ Chapter {chapter.chapterNumber} ➔{" "}
                {chapter.subSections.length} Sub-sections (Check off scenes as you read)
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
            {completedSubsCount}/{chapter.subSections.length} Scenes Checked
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {chapter.subSections.map((sub, index) => {
            const isSubDone = !!completedSubSections[sub.id];
            return (
              <div
                key={sub.id}
                onClick={() => toggleSubSectionComplete(chapter.id, sub.id)}
                className={`rounded-2xl p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSubDone
                    ? "bg-emerald-950/20 border-emerald-400/40"
                    : "bg-white/[0.04] hover:bg-white/[0.07] border-white/12 hover:border-sky-400/40"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-mono font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      {chapter.displayCode}.{index + 1} • {sub.sceneMarker}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubSectionComplete(chapter.id, sub.id);
                        if (typeof navigator !== "undefined" && navigator.vibrate) {
                          navigator.vibrate(20);
                        }
                      }}
                      className={`w-8 h-8 -mr-1 -mt-1 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-150 active:scale-80 select-none ${
                        isSubDone
                          ? "text-emerald-400 bg-emerald-500/20"
                          : "text-slate-400 hover:text-emerald-300 hover:bg-white/10 active:bg-white/20"
                      }`}
                    >
                      <div className={isSubDone ? "animate-tick-pop" : ""}>
                        {isSubDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  </div>

                  <h4
                    className={`text-sm font-bold mb-2 ${
                      isSubDone ? "text-emerald-200 line-through" : "text-white"
                    }`}
                  >
                    {sub.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {sub.content}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-white/10">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 mb-0.5">
                    Analytical Significance
                  </div>
                  <p className="text-xs text-indigo-100/90 leading-relaxed">
                    {sub.analyticalTakeaway}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================== BENTO ROW 2.5: PHYSICAL BOOK MARGINALIA & COLOR-CODED ANNOTATIONS ==================== */}
      <ChapterAnnotationsBento
        chapterId={chapter.id}
        chapterCode={chapter.displayCode}
      />

      {/* ==================== BENTO ROW 3: DEEP ANALYSIS & KEY QUOTES ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Multi-Source Synthesis Analysis (6 Cols) */}
        <div className="lg:col-span-6 liquid-glass-bento rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/30 text-purple-300">
              <GraduationCap className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">
                Triangulated Critical Analysis
              </h3>
              <p className="text-xs text-slate-400">
                SparkNotes • LitCharts • American Literature Synthesis
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-3.5 bg-purple-500/10 border border-purple-400/30">
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">
              Chapter Thesis
            </div>
            <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
              {chapter.analysis.thesis}
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl p-3.5 bg-black/30 border border-white/10">
              <div className="text-xs font-bold text-sky-300 mb-1">
                1. SparkNotes Structural &amp; Character Synthesis
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {chapter.analysis.sparkNotesSynthesis}
              </p>
            </div>

            <div className="rounded-2xl p-3.5 bg-black/30 border border-white/10">
              <div className="text-xs font-bold text-amber-300 mb-1">
                2. LitCharts Thematic &amp; Epistemological Lens
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {chapter.analysis.litChartsSynthesis}
              </p>
            </div>

            <div className="rounded-2xl p-3.5 bg-black/30 border border-white/10">
              <div className="text-xs font-bold text-emerald-300 mb-1">
                3. American Literature &amp; Historical Context
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {chapter.analysis.americanLitContext}
              </p>
            </div>

            <div className="rounded-2xl p-3.5 bg-black/30 border border-white/10">
              <div className="text-xs font-bold text-rose-300 mb-1">
                4. Winston&apos;s Psychological Trajectory
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {chapter.analysis.psychologicalArc}
              </p>
            </div>
          </div>
        </div>

        {/* Key Quotes & Study Scratchpad (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                  <Quote className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Key Verbatim Quotes &amp; Explication
                  </h3>
                  <p className="text-xs text-slate-400">
                    Bookmark high-impact quotes for essays &amp; exams
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              {chapter.quotes.map((q) => {
                const isBookmarked = !!bookmarkedQuotes[q.id];
                return (
                  <div
                    key={q.id}
                    className="rounded-2xl p-4 bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/15"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <blockquote className="text-sm sm:text-[15px] font-semibold text-white italic leading-relaxed border-l-2 border-sky-400 pl-3">
                        &ldquo;{q.quote}&rdquo;
                      </blockquote>
                      <button
                        onClick={() => toggleBookmarkQuote(q.id)}
                        title="Bookmark quote"
                        className="p-1.5 rounded-xl liquid-glass-pill text-slate-400 hover:text-amber-300 shrink-0 cursor-pointer"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
                            isBookmarked ? "text-amber-300 fill-amber-300" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-sky-300 mb-2">
                      — {q.speaker} ({q.context})
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed mb-2.5">
                      {q.analysis}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {q.themes.map((tId) => {
                        const t = THEMES_TAXONOMY[tId];
                        if (!t) return null;
                        return (
                          <span
                            key={tId}
                            className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                            style={{
                              backgroundColor: t.badgeBg,
                              borderColor: t.badgeBorder,
                              color: t.badgeText,
                            }}
                          >
                            {t.shortName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personal Late-Night Study Scratchpad Bento */}
          <AcademicNotesSurface
            note={chapterNotes[chapter.id] || ""}
            onChange={(text) => setChapterNote(chapter.id, text)}
            title="Personal Study Marginalia"
            itemCode={chapter.displayCode}
            minRows={5}
            accentColor="#06b6d4"
          />
        </div>
      </div>
    </article>
  );
});

ChapterBentoCard.displayName = "ChapterBentoCard";
