"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  BookOpen,
  GraduationCap,
  Layers,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Copy,
  Check,
  AlertTriangle,
  FileText,
  Target,
  Flame,
  Shuffle,
  ShieldCheck,
} from "lucide-react";
import {
  PRE_LESSON_CRAM_SHEETS,
  FLASHCARDS_DECK,
  PRACTICE_QUIZ_QUESTIONS,
  ESSAY_BLUEPRINTS,
  QUOTE_CLOZE_ITEMS,
  FIRST_TIME_READER_GUIDE,
  THEMES_TAXONOMY,
} from "@/data";
import { useStudyStore, RevisionTab } from "@/store/useStudyStore";

export const RevisionHubView: React.FC = React.memo(() => {
  const {
    revisionTab,
    setRevisionTab,
    studyGoal,
    setStudyGoal,
    flashcardMastery,
    toggleFlashcardMastery,
    quizAnswers,
    setQuizAnswer,
    quizSubmitted,
    submitQuiz,
    resetQuiz,
    spoilerMaskActive,
    toggleSpoilerMask,
  } = useStudyStore();

  // Local UI State for Flashcards
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [cardCategoryFilter, setCardCategoryFilter] = useState<string>("all");
  const [cardPartFilter, setCardPartFilter] = useState<string>("all");

  // Local UI State for Cram Sheets
  const [cramPartFilter, setCramPartFilter] = useState<string>("all");

  // Local UI State for Essay Blueprints
  const [activeEssayId, setActiveEssayId] = useState<string>(ESSAY_BLUEPRINTS[0].id);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Local UI State for Cloze Drills
  const [clozeInputs, setClozeInputs] = useState<Record<string, string>>({});
  const [clozeChecked, setClozeChecked] = useState<Record<string, boolean>>({});
  const [clozeRevealed, setClozeRevealed] = useState<Record<string, boolean>>({});

  // Filter flashcards
  const filteredFlashcards = useMemo(() => {
    return FLASHCARDS_DECK.filter((c) => {
      if (cardCategoryFilter !== "all" && c.category !== cardCategoryFilter)
        return false;
      if (cardPartFilter !== "all" && c.part !== cardPartFilter) return false;
      return true;
    });
  }, [cardCategoryFilter, cardPartFilter]);

  const activeCard =
    filteredFlashcards[currentCardIndex] || filteredFlashcards[0] || FLASHCARDS_DECK[0];

  const masteredCount = useMemo(
    () => Object.values(flashcardMastery).filter(Boolean).length,
    [flashcardMastery]
  );
  const masteryPercentage = Math.round(
    (masteredCount / FLASHCARDS_DECK.length) * 100
  );

  // Filter Cram Sheets
  const filteredCramSheets = useMemo(() => {
    return PRE_LESSON_CRAM_SHEETS.filter((item) => {
      if (cramPartFilter !== "all" && item.part !== cramPartFilter) return false;
      return true;
    });
  }, [cramPartFilter]);

  // Calculate Quiz Score
  const totalQuizQuestions = PRACTICE_QUIZ_QUESTIONS.length;
  const correctQuizAnswers = useMemo(() => {
    return PRACTICE_QUIZ_QUESTIONS.reduce((acc, q) => {
      if (quizAnswers[q.id] === q.correctIndex) return acc + 1;
      return acc;
    }, 0);
  }, [quizAnswers]);
  const quizPercent = Math.round((correctQuizAnswers / totalQuizQuestions) * 100);

  // Copy helper
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Keyboard navigation for Flashcards (Space/Enter: Flip, ArrowRight: Next, ArrowLeft: Prev, Up/M: Mark Mastered)
  useEffect(() => {
    if (revisionTab !== "flashcards") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        setIsFlipped(false);
        setShowClue(false);
        setCurrentCardIndex((prev) =>
          prev < filteredFlashcards.length - 1 ? prev + 1 : 0
        );
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        setIsFlipped(false);
        setShowClue(false);
        setCurrentCardIndex((prev) =>
          prev > 0 ? prev - 1 : filteredFlashcards.length - 1
        );
      } else if (e.code === "ArrowUp" || e.key.toLowerCase() === "m") {
        e.preventDefault();
        if (activeCard) {
          toggleFlashcardMastery(activeCard.id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [revisionTab, filteredFlashcards.length, activeCard, toggleFlashcardMastery]);

  // Cloze handlers
  const handleClozeCheck = (id: string) => {
    setClozeChecked((prev) => ({ ...prev, [id]: true }));
  };

  const handleClozeReveal = (id: string) => {
    setClozeRevealed((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* ==================== HERO COMMAND BANNER ==================== */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                EXAM & LESSON MASTERY ENGINE
              </span>
              <span className="liquid-glass-pill px-3 py-1 rounded-full text-xs text-sky-200">
                1984 Synthesis
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Test & Pre-Lesson Revision Hub
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Rapid cram sheets for the 5 minutes before class, interactive active recall flashcards, practice exam questions with grade-A rationale, and AP/IB essay blueprints.
            </p>
          </div>

          {/* Quick Mode Toggle */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/12 self-start md:self-center shrink-0">
            <button
              onClick={() => setStudyGoal("revise")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                studyGoal === "revise"
                  ? "bg-gradient-to-r from-amber-500/35 to-rose-500/35 text-white border border-amber-400/50 shadow-lg shadow-amber-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Exam Revision</span>
            </button>
            <button
              onClick={() => setStudyGoal("learn")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                studyGoal === "learn"
                  ? "bg-gradient-to-r from-emerald-500/35 to-teal-500/35 text-white border border-emerald-400/50 shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Study as New</span>
            </button>
          </div>
        </div>

        {/* Sub-Tab Navigation Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-white/10">
          {[
            {
              id: "cram" as RevisionTab,
              label: "60-Sec Cram Sheets",
              icon: <Zap className="w-4 h-4 text-amber-400" />,
            },
            {
              id: "flashcards" as RevisionTab,
              label: `Flashcards (${FLASHCARDS_DECK.length})`,
              icon: <Layers className="w-4 h-4 text-sky-400" />,
            },
            {
              id: "quiz" as RevisionTab,
              label: `Practice Exam (${PRACTICE_QUIZ_QUESTIONS.length})`,
              icon: <GraduationCap className="w-4 h-4 text-emerald-400" />,
            },
            {
              id: "essays" as RevisionTab,
              label: `Essay Blueprints (${ESSAY_BLUEPRINTS.length})`,
              icon: <FileText className="w-4 h-4 text-purple-400" />,
            },
            {
              id: "cloze" as RevisionTab,
              label: `Quote Drills (${QUOTE_CLOZE_ITEMS.length})`,
              icon: <Target className="w-4 h-4 text-rose-400" />,
            },
          ].map((tab) => {
            const isActive = revisionTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setRevisionTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/20 text-white border border-white/35 shadow-md backdrop-blur-md"
                    : "liquid-glass-pill text-slate-300 hover:text-white"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ==================== TAB 1: 60-SECOND PRE-LESSON CRAM SHEETS ==================== */}
      {revisionTab === "cram" && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Filter by Part:
              </span>
              {["all", "Part 1", "Part 2", "Part 3"].map((p) => (
                <button
                  key={p}
                  onClick={() => setCramPartFilter(p)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    cramPartFilter === p
                      ? "bg-amber-500/30 text-amber-200 border border-amber-400/40"
                      : "liquid-glass-pill text-slate-400 hover:text-white"
                  }`}
                >
                  {p === "all" ? "All Parts" : p}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-400">
              Showing {filteredCramSheets.length} chapter briefs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCramSheets.map((item) => (
              <div
                key={item.id}
                className="liquid-glass-bento rounded-3xl p-5 space-y-4 flex flex-col justify-between"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      {item.part} • Ch. {item.chapterCode}
                    </span>
                    <span className="text-xs font-mono text-amber-300/80 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      60-Sec Cram
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/5 p-3 rounded-2xl border border-white/10 mb-3">
                    {item.sixtySecondSummary}
                  </p>

                  {/* Teacher Discussion Questions */}
                  <div className="space-y-2 mb-3">
                    <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Teacher Will Ask (Raise Your Hand):
                    </h4>
                    <ul className="space-y-1.5">
                      {item.teacherDiscussionQuestions.map((q, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-300 pl-3 border-l-2 border-amber-400/50"
                        >
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Misconceptions */}
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200">
                    <span className="font-bold text-rose-300 block mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Avoid Common Exam Trap:
                    </span>
                    {item.commonMisconceptions}
                  </div>
                </div>

                {/* Must-Cite Quotes */}
                <div className="pt-3 border-t border-white/10">
                  <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Must-Cite Textual Evidence:
                  </h5>
                  <div className="space-y-2">
                    {item.mustCiteQuotes.map((qObj, idx) => (
                      <div
                        key={idx}
                        className="bg-black/30 p-2.5 rounded-xl border border-white/10 text-xs"
                      >
                        <p className="font-serif italic text-amber-200 mb-1">
                          "{qObj.quote}"
                        </p>
                        <p className="text-[11px] text-slate-400">
                          <span className="text-sky-300 font-semibold">
                            Analysis:
                          </span>{" "}
                          {qObj.analysis}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== TAB 2: ACTIVE RECALL FLASHCARDS ==================== */}
      {revisionTab === "flashcards" && (
        <section className="space-y-4 w-full max-w-5xl mx-auto">
          {/* Controls & Mastery Progress */}
          <div className="liquid-glass-bento rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={cardCategoryFilter}
                onChange={(e) => {
                  setCardCategoryFilter(e.target.value);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className="bg-black/40 text-xs text-white border border-white/20 rounded-xl px-2.5 py-1.5 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="Quote Recall">Quote Recall</option>
                <option value="Plot & Event">Plot & Event</option>
                <option value="Theme & Concept">Theme & Concept</option>
                <option value="Character & Motivation">Character & Motivation</option>
                <option value="Symbolism">Symbolism</option>
              </select>

              <select
                value={cardPartFilter}
                onChange={(e) => {
                  setCardPartFilter(e.target.value);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className="bg-black/40 text-xs text-white border border-white/20 rounded-xl px-2.5 py-1.5 focus:outline-none"
              >
                <option value="all">All Parts</option>
                <option value="Part 1">Part 1</option>
                <option value="Part 2">Part 2</option>
                <option value="Part 3">Part 3</option>
                <option value="General">General / Theory</option>
              </select>
            </div>

            {/* Mastery Tracker */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-slate-300">Mastery: </span>
                <span className="text-xs font-bold text-emerald-300">
                  {masteredCount} / {FLASHCARDS_DECK.length} ({masteryPercentage}%)
                </span>
              </div>
              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{ width: `${masteryPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* 3D Flashcard Container with Butter-Smooth Hardware Acceleration */}
          <div
            className="w-full min-h-[340px] cursor-pointer select-none"
            style={{ perspective: "1400px" }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {!isFlipped ? (
                <motion.div
                  key={`front-${activeCard.id}`}
                  initial={{ rotateY: -80, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 80, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="liquid-glass-bento rounded-3xl p-6 sm:p-8 min-h-[340px] flex flex-col justify-between border border-white/25 hover:border-sky-400/50 transition-all shadow-xl relative overflow-hidden select-none group"
                >
                  {/* Top Bar on Card */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        {activeCard.category}
                      </span>
                      <span className="liquid-glass-pill px-2.5 py-1 rounded-full text-xs text-slate-300">
                        {activeCard.part}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-slate-400">
                      Card {currentCardIndex + 1} of {filteredFlashcards.length}
                    </span>
                  </div>

                  {/* Card Content (Prompt) */}
                  <div className="my-auto py-6 text-center">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-slate-400 mb-2 block font-mono">
                        Prompt / Question
                      </span>
                      <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                        {activeCard.question}
                      </h3>

                      {showClue && activeCard.clue && (
                        <div className="mt-4 p-3 rounded-2xl bg-amber-500/15 border border-amber-400/30 text-xs text-amber-200 inline-block text-left animate-in fade-in duration-200">
                          <span className="font-bold text-amber-300 mr-1.5">
                            💡 Clue:
                          </span>
                          {activeCard.clue}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Bar on Card */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowClue(!showClue);
                      }}
                      className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {showClue ? "Hide Clue" : "Reveal Clue"}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlashcardMastery(activeCard.id);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          flashcardMastery[activeCard.id]
                            ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/40"
                            : "liquid-glass-pill text-slate-400 hover:text-white"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {flashcardMastery[activeCard.id] ? "Mastered" : "Mark Mastered"}
                      </button>
                    </div>

                    <span className="text-xs text-slate-400 italic">
                      Click anywhere to flip
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`back-${activeCard.id}`}
                  initial={{ rotateY: -80, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 80, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  className="liquid-glass-bento rounded-3xl p-6 sm:p-8 min-h-[340px] flex flex-col justify-between border border-cyan-400/40 bg-slate-900/95 transition-all shadow-[0_0_35px_-5px_rgba(6,182,212,0.3)] relative overflow-hidden select-none group"
                >
                  {/* Top Bar on Card */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                        {activeCard.category} Solution
                      </span>
                      <span className="liquid-glass-pill px-2.5 py-1 rounded-full text-xs text-slate-300">
                        {activeCard.part}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-slate-400">
                      Card {currentCardIndex + 1} of {filteredFlashcards.length}
                    </span>
                  </div>

                  {/* Card Content (Answer) */}
                  <div className="my-auto py-6 text-center">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-emerald-400 mb-2 block font-mono">
                        Target Answer
                      </span>
                      <p className="text-lg sm:text-2xl font-bold text-emerald-200 tracking-tight leading-snug mb-4">
                        {activeCard.answer}
                      </p>
                      <div className="bg-black/30 p-3 rounded-2xl border border-white/10 text-xs text-slate-300 max-w-lg mx-auto text-left">
                        <span className="text-sky-300 font-semibold block mb-0.5">
                          Exam & Analytical Takeaway:
                        </span>
                        {activeCard.examContext}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar on Card */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="text-xs text-cyan-300 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      Answer Revealed
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlashcardMastery(activeCard.id);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          flashcardMastery[activeCard.id]
                            ? "bg-emerald-500/25 text-emerald-300 border border-emerald-400/40"
                            : "liquid-glass-pill text-slate-400 hover:text-white"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {flashcardMastery[activeCard.id] ? "Mastered" : "Mark Mastered"}
                      </button>
                    </div>

                    <span className="text-xs text-slate-400 italic">
                      Click to flip back
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 px-2">
            <button
              onClick={() => {
                setIsFlipped(false);
                setShowClue(false);
                setCurrentCardIndex((prev) =>
                  prev > 0 ? prev - 1 : filteredFlashcards.length - 1
                );
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl liquid-glass-pill text-xs font-bold text-white hover:bg-white/15 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setShowClue(false);
                const randomIdx = Math.floor(
                  Math.random() * filteredFlashcards.length
                );
                setCurrentCardIndex(randomIdx);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl liquid-glass-pill text-xs text-slate-300 hover:text-white cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5 text-sky-400" />
              <span>Shuffle</span>
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setShowClue(false);
                setCurrentCardIndex((prev) =>
                  prev < filteredFlashcards.length - 1 ? prev + 1 : 0
                );
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl liquid-glass-pill text-xs font-bold text-white hover:bg-white/15 cursor-pointer"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* ==================== TAB 3: PRACTICE EXAM SIMULATOR ==================== */}
      {revisionTab === "quiz" && (
        <section className="space-y-6 w-full max-w-5xl mx-auto">
          {/* Quiz Score Header */}
          <div className="liquid-glass-bento rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Standardized Literature Assessment
              </span>
              <h3 className="text-xl font-bold text-white">
                1984 High-Yield Exam Simulator
              </h3>
              <p className="text-xs text-slate-300">
                10 multiple choice questions with detailed analytical feedback and exam tips.
              </p>
            </div>

            {quizSubmitted ? (
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-xs text-slate-300">Your Score: </span>
                  <span className="text-lg font-extrabold text-white">
                    {correctQuizAnswers} / {totalQuizQuestions} ({quizPercent}%)
                  </span>
                  <p className="text-xs text-emerald-300 font-semibold">
                    {quizPercent >= 80
                      ? "🏆 Grade A / Distinction"
                      : quizPercent >= 60
                      ? "👍 Pass / Solid"
                      : "⚠️ Review Recommended"}
                  </p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake
                </button>
              </div>
            ) : (
              <button
                onClick={submitQuiz}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/25 hover:brightness-110 cursor-pointer"
              >
                Submit & Calculate Score
              </button>
            )}
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {PRACTICE_QUIZ_QUESTIONS.map((q, qIndex) => {
              const selectedOption = quizAnswers[q.id];
              const isAnswered = selectedOption !== undefined;
              const isCorrect = selectedOption === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="liquid-glass-bento rounded-3xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-white/10 text-sky-300">
                      Question {qIndex + 1} • {q.part}
                    </span>

                    {quizSubmitted && (
                      <span
                        className={`text-xs font-bold flex items-center gap-1 ${
                          isCorrect ? "text-emerald-300" : "text-rose-400"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {q.question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2 pt-1">
                    {q.options.map((option, optIdx) => {
                      const isOptionSelected = selectedOption === optIdx;
                      let optionClasses =
                        "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300";

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionClasses =
                            "bg-emerald-500/25 border-emerald-400/50 text-emerald-200 font-semibold";
                        } else if (isOptionSelected && !isCorrect) {
                          optionClasses =
                            "bg-rose-500/25 border-rose-400/50 text-rose-200";
                        }
                      } else if (isOptionSelected) {
                        optionClasses =
                          "bg-sky-500/25 border-sky-400/50 text-white font-semibold shadow-md shadow-sky-500/10";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => setQuizAnswer(q.id, optIdx)}
                          className={`w-full text-left p-3 rounded-2xl text-xs border transition-all cursor-pointer flex items-center gap-2.5 ${optionClasses}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Rationale & Tip (Shown after submit) */}
                  {quizSubmitted && (
                    <div className="pt-3 border-t border-white/10 space-y-1.5 animate-in fade-in duration-200">
                      <p className="text-xs text-slate-300">
                        <span className="text-emerald-300 font-semibold">
                          Explanation:
                        </span>{" "}
                        {q.explanation}
                      </p>
                      <p className="text-[11px] text-amber-200/90 font-mono">
                        💡 Exam Tip: {q.examTip}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ==================== TAB 4: HIGH-YIELD ESSAY BLUEPRINTS ==================== */}
      {revisionTab === "essays" && (
        <section className="space-y-6">
          {/* Prompt Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {ESSAY_BLUEPRINTS.map((essay, idx) => {
              const isActive = activeEssayId === essay.id;
              return (
                <button
                  key={essay.id}
                  onClick={() => setActiveEssayId(essay.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-purple-500/30 text-purple-200 border border-purple-400/50 shadow-lg shadow-purple-500/15"
                      : "liquid-glass-pill text-slate-400 hover:text-white"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>
                    Prompt {idx + 1}: {essay.id.replace("essay-", "Topic ")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Blueprint */}
          {(() => {
            const currentBlueprint =
              ESSAY_BLUEPRINTS.find((e) => e.id === activeEssayId) ||
              ESSAY_BLUEPRINTS[0];

            return (
              <div className="liquid-glass-bento rounded-3xl p-6 space-y-6">
                {/* Header & Prompt */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30">
                        {currentBlueprint.rubricFocus}
                      </span>
                      <span className="liquid-glass-pill px-2.5 py-0.5 rounded-full text-xs text-slate-300">
                        Grade 7 / Grade A* Structure
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      "{currentBlueprint.prompt}"
                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      handleCopy(
                        currentBlueprint.id,
                        `Prompt: ${currentBlueprint.prompt}\n\nThesis:\n${currentBlueprint.thesisStatement}\n\n` +
                          currentBlueprint.paragraphs
                            .map(
                              (p, idx) =>
                                `Paragraph ${idx + 1}:\n- Topic Sentence: ${
                                  p.topicSentence
                                }\n- Evidence: ${p.primaryEvidence}\n- Analysis: ${
                                  p.literaryAnalysis
                                }\n- Counter: ${p.counterPerspective}`
                            )
                            .join("\n\n")
                      )
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl liquid-glass-pill text-xs font-bold text-slate-200 hover:text-white shrink-0 cursor-pointer"
                  >
                    {copiedId === currentBlueprint.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-300" />
                        <span>Copy Full Outline</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Thesis Statement Box */}
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-1">
                    Master Thesis Statement:
                  </span>
                  <p className="text-sm font-medium text-purple-100 leading-relaxed font-serif italic">
                    "{currentBlueprint.thesisStatement}"
                  </p>
                  <p className="text-xs text-purple-200/80 mt-2">
                    <span className="font-semibold">Core Argument:</span>{" "}
                    {currentBlueprint.coreArgumentSummary}
                  </p>
                </div>

                {/* Body Paragraph Outlines */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Body Paragraph Blueprints:
                  </h4>
                  {currentBlueprint.paragraphs.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-[11px] flex items-center justify-center">
                          {pIdx + 1}
                        </span>
                        <span className="text-xs font-bold text-sky-200">
                          {p.topicSentence}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs pt-1">
                        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                          <span className="text-[10px] font-bold text-amber-300 uppercase block mb-1">
                            Primary Evidence & Quotes:
                          </span>
                          <p className="text-slate-300 leading-snug">
                            {p.primaryEvidence}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                          <span className="text-[10px] font-bold text-sky-300 uppercase block mb-1">
                            Literary & Stylistic Analysis:
                          </span>
                          <p className="text-slate-300 leading-snug">
                            {p.literaryAnalysis}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                          <span className="text-[10px] font-bold text-rose-300 uppercase block mb-1">
                            Counter-Perspective & Complexity:
                          </span>
                          <p className="text-slate-300 leading-snug">
                            {p.counterPerspective}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Synthesis Conclusion */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                  <span className="font-bold text-slate-300 block mb-1 uppercase tracking-wider text-[11px]">
                    Concluding Synthesis:
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {currentBlueprint.concludingSynthesis}
                  </p>
                </div>
              </div>
            );
          })()}
        </section>
      )}

      {/* ==================== TAB 5: QUOTE CLOZE DRILLS ==================== */}
      {revisionTab === "cloze" && (
        <section className="space-y-4 w-full max-w-5xl mx-auto">
          <div className="liquid-glass-bento rounded-3xl p-5 mb-4">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block">
              Direct Textual Evidence Recall
            </span>
            <h3 className="text-xl font-bold text-white">
              Quote Cloze & Phrasing Drills
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Type the missing key word to memorize Orwell's exact literary phrasing for closed-book essay exams.
            </p>
          </div>

          <div className="space-y-3">
            {QUOTE_CLOZE_ITEMS.map((item) => {
              const userAnswer = clozeInputs[item.id] || "";
              const isChecked = clozeChecked[item.id];
              const isRevealed = clozeRevealed[item.id];
              const isCorrect =
                userAnswer.trim().toLowerCase() ===
                item.correctWord.trim().toLowerCase();

              return (
                <div
                  key={item.id}
                  className="liquid-glass-bento rounded-3xl p-4 sm:p-5 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30">
                      Ch. {item.chapterCode} • {item.speaker}
                    </span>

                    {isChecked && (
                      <span
                        className={`text-xs font-bold flex items-center gap-1 ${
                          isCorrect ? "text-emerald-300" : "text-rose-400"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Perfect Match
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Cloze Quote */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-sm font-serif italic text-white leading-relaxed">
                    "{item.quoteWithBlank}"
                  </div>

                  {/* Input & Check Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Type the exact missing word..."
                      value={userAnswer}
                      onChange={(e) => {
                        setClozeInputs((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }));
                        setClozeChecked((prev) => ({
                          ...prev,
                          [item.id]: false,
                        }));
                      }}
                      className="bg-black/40 text-xs text-white border border-white/20 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-400/50 flex-1"
                    />

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleClozeCheck(item.id)}
                        className="px-4 py-2 rounded-xl bg-rose-500/30 hover:bg-rose-500/40 text-rose-200 border border-rose-400/40 text-xs font-bold cursor-pointer"
                      >
                        Check
                      </button>

                      <button
                        onClick={() => handleClozeReveal(item.id)}
                        className="px-3 py-2 rounded-xl liquid-glass-pill text-xs text-slate-300 hover:text-white cursor-pointer"
                      >
                        Hint
                      </button>
                    </div>
                  </div>

                  {/* Hint / Reveal Box */}
                  {(isRevealed || isChecked) && (
                    <div className="pt-2 border-t border-white/10 text-xs space-y-1 animate-in fade-in duration-200">
                      {isRevealed && !isCorrect && (
                        <p className="text-amber-200">
                          <span className="font-bold">💡 Hint:</span> {item.hint}
                          <span className="ml-2 font-mono text-[11px] text-slate-400">
                            (Word:{" "}
                            <span className="text-rose-300">
                              {item.correctWord}
                            </span>
                            )
                          </span>
                        </p>
                      )}
                      <p className="text-slate-300 text-[11px]">
                        <span className="text-sky-300 font-semibold">
                          Analytical Significance:
                        </span>{" "}
                        {item.analyticalSignificance}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ==================== FIRST-TIME READER COMPASS (Always accessible) ==================== */}
      <section className="liquid-glass-bento rounded-3xl p-6 space-y-5 border border-emerald-500/20">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                {FIRST_TIME_READER_GUIDE.title}
              </h3>
              <p className="text-xs text-slate-300">
                Essential background context for reading 1984 as a fresh text.
              </p>
            </div>
          </div>

          <button
            onClick={toggleSpoilerMask}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              spoilerMaskActive
                ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40"
                : "liquid-glass-pill text-slate-300"
            }`}
          >
            {spoilerMaskActive ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Spoiler Shield Active</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span>Spoilers Unmasked</span>
              </>
            )}
          </button>
        </div>

        {/* Historical Context */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <span className="font-bold text-emerald-300 block mb-1 uppercase tracking-wider text-[11px]">
            Historical & Literary Genesis (1948 London):
          </span>
          {FIRST_TIME_READER_GUIDE.historicalContext}
        </div>

        {/* 4 Ministries Grid */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            The 4 Ministries of Oceania:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FIRST_TIME_READER_GUIDE.fourMinistriesRoadmap.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{m.name}</span>
                  <span className="font-mono text-[11px] text-sky-300">
                    {m.newspeak}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {m.realFunction}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Pyramid */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            The Social Stratification of Oceania:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FIRST_TIME_READER_GUIDE.socialPyramid.map((s, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-200">{s.tier}</span>
                  <span className="font-mono text-emerald-300 font-bold">
                    {s.percent}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Advice */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <span className="font-bold text-emerald-300 block mb-2 uppercase tracking-wider text-[11px]">
            Key Advice for First-Time Readers:
          </span>
          <ul className="space-y-1.5 list-disc pl-4 text-slate-200">
            {FIRST_TIME_READER_GUIDE.keyAdviceForFirstReading.map((adv, idx) => (
              <li key={idx}>{adv}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
});

RevisionHubView.displayName = "RevisionHubView";
