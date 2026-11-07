"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChapterData, THEMES_TAXONOMY } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { RecallFlipCard } from "@/components/RecallFlipCard";
import {
  Sparkles,
  Eye,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  PanelRightClose,
  Edit3,
  Flame,
  AlertCircle,
  Copy,
  Check,
  GraduationCap,
  ShieldAlert,
  Timer,
} from "lucide-react";

interface OrwellRightInspectorProps {
  chapter: ChapterData;
  isOpen: boolean;
  onToggle: () => void;
}

type InspectorTab = "recall" | "quotes" | "totalitarian" | "notes";

export function OrwellRightInspector({
  chapter,
  isOpen,
  onToggle,
}: OrwellRightInspectorProps) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("recall");
  const [copiedNote, setCopiedNote] = useState(false);

  const {
    bookmarkedQuotes,
    toggleBookmarkQuote,
    chapterNotes,
    setChapterNote,
    completedChapters,
    toggleChapterComplete,
    openExamSprint,
  } = useStudyStore();

  const userNote = chapterNotes[chapter.id] || "";
  const isCompleted = !!completedChapters[chapter.id];

  const handleCopyNote = () => {
    if (userNote.trim()) {
      navigator.clipboard.writeText(userNote);
      setCopiedNote(true);
      setTimeout(() => setCopiedNote(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          key="orwell-analytical-inspector"
          initial={{ opacity: 0, x: 36, y: -16, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            x: 44,
            y: -32,
            scale: 0.92,
            transition: {
              duration: 0.26,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          transition={{
            duration: 0.32,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ willChange: "transform, opacity" }}
          data-tour="inspector"
          className="hidden xl:block w-[320px] xl:w-[340px] shrink-0 sticky top-5 z-20"
        >
          <div className="w-[320px] xl:w-[340px] liquid-glass-bento rounded-3xl p-4 border border-cyan-500/35 bg-slate-950/85 backdrop-blur-2xl shadow-2xl flex flex-col max-h-[calc(100vh-2.5rem)] overflow-hidden">
            {/* Top Header */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10 shrink-0 min-h-[44px]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-cyan-400 uppercase block">
                    Oceania Codex Inspector
                  </span>
                  <h3 className="text-xs font-bold text-white truncate">
                    {chapter.displayCode} · {chapter.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => {
                    toggleChapterComplete(chapter.id);
                    if (typeof navigator !== "undefined" && navigator.vibrate) {
                      navigator.vibrate(20);
                    }
                  }}
                  title={isCompleted ? "Mark Incomplete" : "Mark Chapter Mastered"}
                  className={`p-2 rounded-xl text-xs font-mono transition-all duration-150 cursor-pointer active:scale-85 select-none ${
                    isCompleted
                      ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 shadow-emerald-500/20"
                      : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${isCompleted ? "text-emerald-400 animate-tick-pop" : "text-slate-400"}`} />
                </button>
                <button
                  onClick={onToggle}
                  title="Tuck Away into Top Command Bar (⌘I / Esc)"
                  className="px-3 py-1.5 rounded-xl text-cyan-200 hover:text-white bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/35 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono soft-button group"
                >
                  <PanelRightClose className="w-4 h-4 text-cyan-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  <span className="text-[11px] font-semibold">Tuck to Bar ↑</span>
                </button>
              </div>
            </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-xl border border-white/10 mb-3 shrink-0">
          <button
            onClick={() => setActiveTab("recall")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "recall"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            🎯 Cram
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "quotes"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            💬 Quotes
          </button>
          <button
            onClick={() => setActiveTab("totalitarian")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "totalitarian"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            👁️ Theory
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-1.5 px-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer truncate ${
              activeTab === "notes"
                ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            📝 Notes
          </button>
        </div>

        {/* Scrollable Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 custom-scrollbar text-xs">
          {/* TAB 1: ACTIVE RECALL & CRAM */}
          {activeTab === "recall" && (
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 block font-bold">
                  Active Recall Flipcard
                </span>
                <p className="text-[11px] text-slate-400">
                  Click or tap card to flip and verify your analytical retention.
                </p>
              </div>

              <RecallFlipCard
                moduleCode={chapter.displayCode}
                title={`${chapter.displayCode} · ${chapter.title}`}
                prompt={
                  chapter.examPromptTakeaway ||
                  chapter.summary ||
                  `Explain how Orwell illustrates totalitarian power in ${chapter.displayCode}.`
                }
                answer={chapter.summary}
                accent="#06B6D4"
                secondary="#F43F5E"
                meta="1984 ACTIVE RECALL"
              />

              {/* Examiner Evaluation Criteria */}
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/25 space-y-2">
                <div className="flex items-center gap-1.5 text-cyan-300 font-bold font-mono text-[11px]">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Examiner Level 7 Criteria</span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  {chapter.examPromptTakeaway}
                </p>
              </div>

              {/* Panopticon Warning */}
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-400/25 space-y-1.5">
                <div className="flex items-center gap-1.5 text-rose-300 font-bold font-mono text-[10px]">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Surveillance Telemetry: {chapter.surveillanceLevel}</span>
                </div>
                <p className="text-[11px] text-rose-100/90 leading-relaxed">
                  Avoid treating Oceania&apos;s surveillance as purely physical gadgets. Show how
                  the internalized Panopticon forces characters to police their own facial muscles
                  (<em>facecrime</em>) and subconscious dreams.
                </p>
              </div>

              {/* Launch Timed Exam Sprint Action Card */}
              <button
                onClick={openExamSprint}
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-cyan-500/15 to-rose-500/15 border border-cyan-400/40 hover:border-cyan-400/70 text-left transition-all cursor-pointer flex items-center justify-between group shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 group-hover:scale-105 transition-transform">
                    <Timer className="w-4 h-4 animate-pulse" />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-bold text-white block">
                      Launch Timed Exam Sprint
                    </span>
                    <span className="text-[10px] text-cyan-200/80">
                      15m / 30m / 45m timed writing drill
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-cyan-300 font-bold px-2 py-1 rounded-lg bg-black/40 border border-white/10">
                  ⌘E
                </span>
              </button>
            </div>
          )}

          {/* TAB 2: QUOTE DOSSIER */}
          {activeTab === "quotes" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-cyan-400 font-bold">
                  Chapter Quotations ({chapter.quotes?.length || 0})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Click bookmark to pin</span>
              </div>

              {chapter.quotes?.map((q) => {
                const isBookmarked = !!bookmarkedQuotes[q.id];
                return (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-2 hover:border-cyan-400/35 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-cyan-300 font-bold px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-400/20">
                        {q.speaker}
                      </span>
                      <button
                        onClick={() => toggleBookmarkQuote(q.id)}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${
                          isBookmarked
                            ? "text-cyan-400 hover:text-cyan-300"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <blockquote className="font-serif italic text-xs text-cyan-100/95 leading-relaxed">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>

                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {q.analysis}
                    </p>

                    <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1">
                      {q.themes?.map((tId) => {
                        const theme = THEMES_TAXONOMY[tId];
                        return (
                          <span
                            key={tId}
                            className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                            style={{
                              backgroundColor: theme?.badgeBg || "rgba(255,255,255,0.05)",
                              color: theme?.badgeText || "#ffffff",
                              borderColor: theme?.badgeBorder || "rgba(255,255,255,0.1)",
                              borderWidth: 1,
                            }}
                          >
                            {theme?.shortName || tId}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: TOTALITARIAN THEORY & CONTEXT */}
          {activeTab === "totalitarian" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/25 space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  Sapir-Whorf Hypothesis &amp; Newspeak
                </span>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  Orwell demonstrates linguistic determinism: by eliminating words for rebellion
                  (<em>bad</em> replaced by <em>ungood</em>), the Party physically contracts the
                  range of human thought, rendering orthodox dissent literally unthinkable.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-400/25 space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-rose-300 font-bold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  Oligarchical Collectivism (Goldstein)
                </span>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  The purpose of perpetual war is not territorial conquest, but the consumption of
                  industrial surpluses without raising the general standard of living. An impoverished,
                  frightened populace remains permanently malleable to Party rule.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-400/25 space-y-1.5">
                <span className="font-mono text-[10px] uppercase tracking-wider text-purple-300 font-bold block">
                  Setting &amp; Telescreen Reality
                </span>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  <strong>Setting:</strong> {chapter.setting}
                  <br />
                  <strong>Atmosphere:</strong> {chapter.telescreenStatus}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PERSONAL NOTES */}
          {activeTab === "notes" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" />
                  Chapter Analytical Notes
                </span>
                <button
                  onClick={handleCopyNote}
                  className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedNote ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                value={userNote}
                onChange={(e) => setChapterNote(chapter.id, e.target.value)}
                placeholder="Draft topic sentences, Orwellian allegorical links, or class quotes for this chapter..."
                rows={10}
                className="w-full rounded-2xl bg-black/40 border border-white/10 p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400/50 resize-none font-sans leading-relaxed"
              />

              <p className="text-[10px] text-slate-400 font-mono">
                💾 Auto-saved to local encrypted storage. Persists across sessions.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  )}
</AnimatePresence>
  );
}
