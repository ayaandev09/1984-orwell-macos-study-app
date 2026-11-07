"use client";

import React, { useState, useEffect } from "react";
import { ChapterData } from "@/data";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  X,
  CheckCircle2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Eye,
  Award,
} from "lucide-react";

interface TimedExamSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: ChapterData;
}

type SprintDuration = 15 | 30 | 45;

export function TimedExamSprintModal({
  isOpen,
  onClose,
  chapter,
}: TimedExamSprintModalProps) {
  const [durationMinutes, setDurationMinutes] = useState<SprintDuration>(15);
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [isSelfGrading, setIsSelfGrading] = useState(false);
  const [essayContent, setEssayContent] = useState("");
  const [copied, setCopied] = useState(false);

  const [rubricScores, setRubricScores] = useState({
    thesis: false,
    quotes: false,
    technique: false,
    context: false,
    evaluation: false,
  });

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem(`exam_sprint_1984_${chapter.id}`);
      if (saved) setEssayContent(saved);
      setSecondsRemaining(durationMinutes * 60);
      setIsRunning(true);
      setIsSelfGrading(false);
    }
  }, [isOpen, chapter.id, durationMinutes]);

  useEffect(() => {
    if (isOpen && essayContent) {
      localStorage.setItem(`exam_sprint_1984_${chapter.id}`, essayContent);
    }
  }, [isOpen, essayContent, chapter.id]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isOpen && isRunning && secondsRemaining > 0 && !isSelfGrading) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsSelfGrading(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isRunning, secondsRemaining, isSelfGrading]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isUrgent = secondsRemaining > 0 && secondsRemaining <= 180;

  const words = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;
  const estimatedReadTime = Math.ceil(words / 200);

  const promptText =
    chapter.examPromptTakeaway ||
    `Examine how Orwell employs language manipulation, the Panopticon setting, and motifs in ${chapter.displayCode} to illustrate the systematic destruction of individual autonomy.`;

  const toggleRubric = (key: keyof typeof rubricScores) => {
    setRubricScores((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const scoreCount = Object.values(rubricScores).filter(Boolean).length;
  const estimatedLevel =
    scoreCount === 5 ? "Level 7 (24-25 / 25)" :
    scoreCount === 4 ? "Level 6 (20-23 / 25)" :
    scoreCount === 3 ? "Level 5 (16-19 / 25)" :
    scoreCount >= 1 ? "Level 4 (12-15 / 25)" : "Drafting in Progress";

  const handleCopy = () => {
    const fullSummary = `=== 1984 CODEX EXAM SPRINT: ${chapter.displayCode} ===\nPrompt: ${promptText}\nWords: ${words} | Time Duration: ${durationMinutes} mins\nEstimated Score: ${estimatedLevel}\n\n${essayContent}`;
    navigator.clipboard.writeText(fullSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl liquid-glass-bento rounded-3xl p-6 sm:p-8 border border-amber-500/35 bg-slate-950/90 shadow-2xl flex flex-col gap-6 max-h-[92vh] overflow-hidden my-auto">
        {/* Top Sprint HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/35 shadow-sm">
              <Timer className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
                  Timed Exam Sprint
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-slate-300 border border-white/15">
                  {chapter.displayCode} · {chapter.title}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Simulated Literature Writing Conditions
              </h2>
            </div>
          </div>

          {/* Time Countdown Pill & Controls */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-black/50 border border-white/12 text-xs">
              {([15, 30, 45] as SprintDuration[]).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setDurationMinutes(m);
                    setSecondsRemaining(m * 60);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    durationMinutes === m
                      ? "bg-amber-500/25 text-amber-200 border border-amber-400/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>

            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl font-mono text-sm font-bold border transition-all ${
                isUrgent
                  ? "bg-rose-500/20 text-rose-300 border-rose-400/50 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.35)]"
                  : "bg-black/60 text-amber-300 border-amber-400/30"
              }`}
            >
              <span>{formattedTime}</span>
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title={isRunning ? "Pause Countdown" : "Resume Countdown"}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
              <button
                onClick={() => {
                  setSecondsRemaining(durationMinutes * 60);
                  setIsRunning(false);
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Exit Sprint (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
          {/* Prompt Banner */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/25 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                Paper 1 / Paper 2 Essay Prompt
              </span>
              <button
                onClick={() => setShowHints(!showHints)}
                className="text-[10px] font-mono text-amber-300/80 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
              >
                <span>{showHints ? "Hide Examiner Hints" : "Show Examiner Hints"}</span>
                {showHints ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-relaxed font-serif italic">
              &ldquo;{promptText}&rdquo;
            </p>

            {showHints && (
              <div className="pt-2 border-t border-amber-400/20 text-xs text-slate-300 space-y-1.5 animate-in fade-in duration-150">
                <span className="font-mono text-[10px] uppercase font-bold text-amber-300 block">
                  Top-Band Structural Checklist:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-300/90 leading-relaxed">
                  <li><strong>AO1 (Knowledge):</strong> Ground argument in Party orthodoxy and the fragility of individual memory.</li>
                  <li><strong>AO2 (Technique):</strong> Cite Newspeak linguistic limits, Doublethink, or Panopticon psychology.</li>
                  <li><strong>AO3 (Context):</strong> Connect to historical totalitarianism (Stalinism/Nazism) and contemporary digital surveillance.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Self-Grading vs Writing Mode */}
          {isSelfGrading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-300 uppercase">
                    Your Response ({words} words)
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:text-white cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Essay"}</span>
                  </button>
                </div>
                <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-xs text-slate-200 leading-relaxed max-h-[360px] overflow-y-auto whitespace-pre-wrap font-serif">
                  {essayContent || "(No response entered.)"}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-300 font-bold font-mono text-xs">
                    <Award className="w-4 h-4" />
                    <span>Self-Assessment Scoring Rubric</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    {estimatedLevel}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {[
                    { key: "thesis", label: "Clear conceptual thesis directly answering the prompt in opening paragraph" },
                    { key: "quotes", label: "At least 3 embedded verbatim quotes with precise situational contexts" },
                    { key: "technique", label: "Analyzed Sapir-Whorf linguistic control (Newspeak) or panopticon effects" },
                    { key: "context", label: "Explicit integration of Orwellian political context & modern surveillance" },
                    { key: "evaluation", label: "Balanced conclusion evaluating ideological orthodoxy and fatalism" },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => toggleRubric(item.key as keyof typeof rubricScores)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                        rubricScores[item.key as keyof typeof rubricScores]
                          ? "bg-emerald-950/30 border-emerald-400/40 text-emerald-200"
                          : "bg-black/30 border-white/10 text-slate-300 hover:border-amber-400/30"
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          rubricScores[item.key as keyof typeof rubricScores]
                            ? "text-emerald-400"
                            : "text-slate-600"
                        }`}
                      />
                      <span className="leading-snug">{item.label}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setIsSelfGrading(false)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
                  >
                    ← Resume Editing
                  </button>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500/20 text-amber-200 border border-amber-400/40 hover:bg-amber-500/30 transition-all cursor-pointer"
                  >
                    Finish &amp; Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="text-white font-bold">{words}</span> words •{" "}
                  <span className="text-slate-400">~{estimatedReadTime} min read</span>
                </span>
                <span className="text-[11px] text-amber-400/70">
                  Auto-saved to local memory
                </span>
              </div>

              <textarea
                value={essayContent}
                onChange={(e) => setEssayContent(e.target.value)}
                placeholder="Begin writing your analytical essay response here under timed conditions..."
                rows={14}
                autoFocus
                className="w-full rounded-2xl bg-black/55 border border-white/15 p-4 sm:p-5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400/50 resize-none font-serif leading-relaxed tracking-wide shadow-inner"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {!isSelfGrading && (
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10 shrink-0">
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              Tip: Focus on continuous argument development without pausing to edit.
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setIsSelfGrading(true)}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-amber-500/20 text-amber-200 border border-amber-400/40 hover:bg-amber-500/30 transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                <span>Finish &amp; Self-Grade</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
