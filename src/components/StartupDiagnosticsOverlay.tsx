"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Eye,
  Radio,
  ShieldAlert,
  BookOpen,
  Zap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Flame,
  Scale,
  Heart,
  FileText,
  Play,
  Pause,
  Clock,
  Compass,
  X,
} from "lucide-react";
import { useStudyStore } from "@/store/useStudyStore";

interface StageInfo {
  id: string;
  stepNumber: number;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
}

const STAGES: StageInfo[] = [
  {
    id: "creed",
    stepNumber: 1,
    badge: "THE CREED OF INGSOC",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-400/30",
    title: "THE SACRED SLOGANS OF OCEANIA",
    subtitle: "The Three Paradoxical Pillars of Totalitarian Psychological Control",
  },
  {
    id: "record",
    stepNumber: 2,
    badge: "ARCHIVAL ENTRY: 04.04.1984",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-400/30",
    title: "THE CLOCKS WERE STRIKING THIRTEEN",
    subtitle: "Winston Smith's Illicit Diary in the Victory Mansions Alcove",
  },
  {
    id: "ministries",
    stepNumber: 3,
    badge: "PYRAMIDS OF POWER",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-400/30",
    title: "THE FOUR MINISTRIES OF THE STATE",
    subtitle: "Ingsoc's Bureaucratic Architecture of Absolute Dominion",
  },
  {
    id: "readiness",
    stepNumber: 4,
    badge: "EPISTEMOLOGICAL REVOLT",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
    title: "FREEDOM IS THE FREEDOM TO SAY 2 + 2 = 4",
    subtitle: "25 Canonical Chapters & Cognitive Revision Engine Ready",
  },
];

export const StartupDiagnosticsOverlay: React.FC = () => {
  const { diagnosticsActive, closeDiagnostics, deviceMode } = useStudyStore();
  const [currentStage, setCurrentStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [stageProgress, setStageProgress] = useState(0);
  const [latency, setLatency] = useState(12);
  const [showFullDossier, setShowFullDossier] = useState(false);

  // Auto-dismiss floating telemetry capsule after 3.8s if not manually opened
  useEffect(() => {
    if (diagnosticsActive && !showFullDossier && !isExiting) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5200);
      return () => clearTimeout(timer);
    }
  }, [diagnosticsActive, showFullDossier, isExiting]);

  const STAGE_DURATION_MS = 5200; // 5.2s per stage for comfortable reading
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard shortcut listener to skip or advance
  useEffect(() => {
    if (!diagnosticsActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleDismiss();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNextStage();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevStage();
      } else if (e.key === "Enter") {
        handleDismiss();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [diagnosticsActive, currentStage]);

  // Stage Progression Timer & Progress Bar
  useEffect(() => {
    if (!diagnosticsActive || isPaused || isExiting) return;

    const stepInterval = 40; // ms
    const increment = (stepInterval / STAGE_DURATION_MS) * 100;

    intervalRef.current = setInterval(() => {
      // Small latency jitter for authentic live feeling
      setLatency((prev) => Math.max(9, Math.min(15, prev + (Math.random() > 0.5 ? 1 : -1))));

      setStageProgress((prev) => {
        if (prev >= 100) {
          if (currentStage < STAGES.length - 1) {
            setCurrentStage((s) => s + 1);
            return 0;
          } else {
            // Auto complete on final stage
            handleDismiss();
            return 100;
          }
        }
        return prev + increment;
      });
    }, stepInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [diagnosticsActive, currentStage, isPaused, isExiting]);

  const handleNextStage = () => {
    if (currentStage < STAGES.length - 1) {
      setCurrentStage((s) => s + 1);
      setStageProgress(0);
    } else {
      handleDismiss();
    }
  };

  const handlePrevStage = () => {
    if (currentStage > 0) {
      setCurrentStage((s) => s - 1);
      setStageProgress(0);
    }
  };

  const handleSelectStage = (index: number) => {
    setCurrentStage(index);
    setStageProgress(0);
  };

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      closeDiagnostics();
      setIsExiting(false);
      setCurrentStage(0);
      setStageProgress(0);
    }, 420);
  };

  if (!diagnosticsActive) return null;

  const currentInfo = STAGES[currentStage];

  if (!showFullDossier) {
    return (
      <aside
        aria-label="Minitrue Live Telemetry Capsule"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isExiting
            ? "opacity-0 -translate-y-6 scale-90 pointer-events-none"
            : "liquid-jelly-enter"
        }`}
      >
        <div className="liquid-glass-dock rounded-full px-4 py-2 flex items-center gap-3.5 shadow-2xl border border-sky-400/40 bg-slate-950/90 backdrop-blur-2xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500/30 via-indigo-500/30 to-rose-500/30 border border-sky-300/40 flex items-center justify-center shrink-0">
            <Eye className="w-4 h-4 text-sky-300 animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-bold text-sky-300 uppercase tracking-wider">
                MINITRUE // 1984
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[10px] text-emerald-300 font-bold">
                120 FPS // {latency}ms
              </span>
            </div>
            <span className="text-[11px] text-slate-300 font-medium">
              25 Canonical Chapters • Truth Archives Online
            </span>
          </div>

          <div className="flex items-center gap-1.5 pl-2 border-l border-white/15">
            <button
              onClick={() => setShowFullDossier(true)}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
            >
              Archival Beats
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all active:scale-90 cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Minitrue System Startup & Diagnostics"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-400 ease-out ${
        isExiting
          ? "opacity-0 scale-[1.03] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        backgroundColor: "rgba(3, 5, 12, 0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Atmospheric Glowing Orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 -top-24 -left-24"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.22) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-25 -bottom-24 -right-24"
        style={{
          background:
            "radial-gradient(circle, rgba(244,63,94,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Main Glass Briefing Capsule */}
      <div className="relative w-full max-w-3xl liquid-glass-dock rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/25 overflow-hidden flex flex-col justify-between min-h-[580px] max-h-[92vh]">
        
        {/* ==================== 1. TOP STATUS & NAVIGATION BAR ==================== */}
        <header className="flex items-center justify-between border-b border-white/12 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400/25 via-indigo-500/20 to-rose-500/25 border border-white/30 flex items-center justify-center shadow-lg">
              <Eye className="w-5 h-5 text-sky-300 animate-pulse" />
              <span className="absolute inset-0 rounded-2xl border border-sky-400/40 animate-ping opacity-60 pointer-events-none" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-sky-400">
                  MINITRUE // 1984
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE {latency}ms
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Oceania Briefing &amp; Archival Protocol</span>
                <span className="text-xs font-mono font-normal text-slate-400">
                  ({currentStage + 1}/{STAGES.length})
                </span>
              </h1>
            </div>
          </div>

          {/* Right Controls: Pause/Play & Direct Skip */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Resume auto-advance" : "Pause to read"}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-amber-300" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleDismiss}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-slate-200 hover:text-white transition-all cursor-pointer border border-white/15 active:scale-95"
            >
              <span>Skip</span>
              <ArrowRight className="w-3.5 h-3.5 text-sky-300" />
            </button>
          </div>
        </header>

        {/* ==================== 2. MEANINGFUL STAGE CONTENT AREA ==================== */}
        <main className="relative flex-1 py-5 overflow-y-auto no-scrollbar flex flex-col justify-center">
          
          {/* ---------------- STAGE 1: THE THREE PARTY SLOGANS ---------------- */}
          {currentStage === 0 && (
            <div className="cinematic-stage-enter space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${currentInfo.badgeColor}`}>
                  {currentInfo.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Totalitarian Ideological Axioms
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentInfo.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                The massive white pyramidal façade of the Ministry of Truth soars three hundred metres into the air, engraved with the three indelible maxims of the Party:
              </p>

              {/* The Three Slogans Glass Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-2xl p-4 bg-gradient-to-b from-rose-500/15 to-black/40 border border-rose-400/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-rose-300 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Axiom I</span>
                      <Flame className="w-4 h-4 text-rose-400" />
                    </div>
                    <div className="text-base font-bold text-white tracking-wider mb-1.5">
                      WAR IS PEACE
                    </div>
                    <p className="text-xs text-rose-200/80 leading-relaxed">
                      Perpetual conflict consumes the products of human labor without raising the standard of living, stabilizing the hierarchical structure of society.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-rose-400 pt-2 border-t border-rose-500/20 mt-3">
                    Oceania vs. Eurasia / Eastasia
                  </div>
                </div>

                <div className="rounded-2xl p-4 bg-gradient-to-b from-amber-500/15 to-black/40 border border-amber-400/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-amber-300 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Axiom II</span>
                      <Scale className="w-4 h-4 text-amber-400" />
                    </div>
                    <div className="text-base font-bold text-white tracking-wider mb-1.5">
                      FREEDOM IS SLAVERY
                    </div>
                    <p className="text-xs text-amber-200/80 leading-relaxed">
                      The solitary human being is always defeated. But if he can make complete, total submission, he merges into the Party and becomes all-powerful and immortal.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-amber-400 pt-2 border-t border-amber-500/20 mt-3">
                    Collectivism over Individualism
                  </div>
                </div>

                <div className="rounded-2xl p-4 bg-gradient-to-b from-sky-500/15 to-black/40 border border-sky-400/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-sky-300 mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Axiom III</span>
                      <Sparkles className="w-4 h-4 text-sky-400" />
                    </div>
                    <div className="text-base font-bold text-white tracking-wider mb-1.5">
                      IGNORANCE IS STRENGTH
                    </div>
                    <p className="text-xs text-sky-200/80 leading-relaxed">
                      Through Doublethink, the Party holds simultaneously two opinions which cancel out, knowing them to be contradictory and believing in both of them.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-sky-400 pt-2 border-t border-sky-500/20 mt-3">
                    Doublethink &amp; Reality Control
                  </div>
                </div>
              </div>

              {/* Ambient Motto Banner */}
              <div className="rounded-2xl p-3 bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                  <span>&ldquo;BIG BROTHER IS WATCHING YOU&rdquo;</span>
                </span>
                <span className="text-slate-400">Telescreen Receiver Locked</span>
              </div>
            </div>
          )}

          {/* ---------------- STAGE 2: APRIL 4TH, 1984 & WINSTON'S DIARY ---------------- */}
          {currentStage === 1 && (
            <div className="cinematic-stage-enter space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${currentInfo.badgeColor}`}>
                  {currentInfo.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  London, Chief City of Airstrip One
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-300 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>The Opening Words of the Masterpiece</span>
                </div>
                <blockquote className="text-lg sm:text-xl font-bold text-white italic tracking-tight leading-snug">
                  &ldquo;It was a bright cold day in April, and the clocks were striking thirteen.&rdquo;
                </blockquote>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Thirty-nine-year-old Winston Smith, suffering from a varicose ulcer, returns to Flat 7 of Victory Mansions. The hallway smells of boiled cabbage and old rag mats. Inside his living room, he discovers an alcove—an architectural accident placed out of the telescreen&apos;s direct sightline.
              </p>

              {/* Dossier Telemetry Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="rounded-2xl p-3.5 bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1.5 text-sky-300 font-mono">
                      <Compass className="w-3.5 h-3.5" /> The Cream-Laid Diary
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 border border-amber-400/30 px-1.5 py-0.2 rounded">CONTRABAND</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Purchased for two dollars fifty in Mr. Charrington&apos;s junk-shop in the prole quarters. Its smooth cream paper has been blank for forty years. To write in it is punished by death or twenty-five years in a forced-labor camp.
                  </p>
                </div>

                <div className="rounded-2xl p-3.5 bg-black/40 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="flex items-center gap-1.5 text-rose-300 font-mono">
                      <ShieldAlert className="w-3.5 h-3.5" /> The Incurable Thoughtcrime
                    </span>
                    <span className="text-[10px] font-mono text-rose-400 border border-rose-400/30 px-1.5 py-0.2 rounded">CRIMETHINK</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Winston fills the page with frantic, helpless handwriting: <span className="text-rose-200 font-bold">&apos;DOWN WITH BIG BROTHER&apos;</span> over and over. He knows the Thought Police will come for him in the night.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                <span>Setting: Victory Mansions • London, Oceania</span>
                <span className="text-emerald-300">Archive Unit I.1 Decrypted</span>
              </div>
            </div>
          )}

          {/* ---------------- STAGE 3: THE FOUR MINISTRIES OF OCEANIA ---------------- */}
          {currentStage === 2 && (
            <div className="cinematic-stage-enter space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${currentInfo.badgeColor}`}>
                  {currentInfo.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Newspeak Government Apparatus
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {currentInfo.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                The entire apparatus of government was divided into four distinct Ministries, whose very names represented deliberate inversions of reality:
              </p>

              {/* 4 Ministries Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-500/10 to-black/40 border border-sky-400/30 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-300 shrink-0 border border-sky-400/40">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">MINITRUE</span>
                      <span className="text-[10px] font-mono text-sky-300">Ministry of Truth</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Responsible for news, entertainment, education, and fine arts. In reality, falsifies and rewrites past historical records in the Records Department.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-500/10 to-black/40 border border-rose-400/30 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-300 shrink-0 border border-rose-400/40">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">MINIPAX</span>
                      <span className="text-[10px] font-mono text-rose-300">Ministry of Peace</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Responsible for military affairs and conducting perpetual warfare along the shifting frontiers of Equatorial Africa, India, and the Middle East.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 to-black/40 border border-purple-400/30 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 shrink-0 border border-purple-400/40">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">MINILUV</span>
                      <span className="text-[10px] font-mono text-purple-300">Ministry of Love</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Maintained law and order through the Thought Police. A windowless, barbed-wire fortress with hidden machine-gun nests and the terror of Room 101.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-black/40 border border-amber-400/30 flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0 border border-amber-400/40">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">MINIPLENTY</span>
                      <span className="text-[10px] font-mono text-amber-300">Ministry of Plenty</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Responsible for economic affairs, managing chronic shortages of razor blades, Victory Gin, and calculating manufactured ration decreases as &apos;rises&apos;.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- STAGE 4: THE FREEDOM CREED & READY TO ENTER ---------------- */}
          {currentStage === 3 && (
            <div className="cinematic-stage-enter space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${currentInfo.badgeColor}`}>
                  {currentInfo.badge}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Epistemological Resistance
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/30">
                <div className="text-xs font-mono uppercase tracking-widest text-emerald-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Intellectual Core of Orwell&apos;s Philosophy</span>
                </div>
                <blockquote className="text-lg sm:text-xl font-bold text-white italic tracking-tight leading-snug">
                  &ldquo;Freedom is the freedom to say that two plus two make four. If that is granted, all else follows.&rdquo;
                </blockquote>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Your study database contains the complete analytical codex for all **25 units** across Parts I, II, III and the Newspeak Appendix, paired with interactive revision matrices, flashcard decks, and pre-lesson talking points.
              </p>

              {/* Ready Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                  <div className="font-mono font-bold text-sky-300 text-sm">25 Units</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Chapters &amp; Appendix</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                  <div className="font-mono font-bold text-amber-300 text-sm">Dual Modes</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Revision &amp; Study</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                  <div className="font-mono font-bold text-rose-300 text-sm">Exam Traps</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">60s Cram Sheets</div>
                </div>
                <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-center">
                  <div className="font-mono font-bold text-emerald-300 text-sm">Mac &amp; iPhone</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">16e Handheld Ready</div>
                </div>
              </div>

              {/* Enter Button CTA */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleDismiss}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-sky-500 via-indigo-500 to-rose-500 hover:from-sky-400 hover:to-rose-400 text-white shadow-xl shadow-sky-500/20 cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2 border border-white/30"
                >
                  <span>Enter Minitrue Study Archives</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}
        </main>

        {/* ==================== 3. FOOTER TIMELINE & STAGE CONTROLS ==================== */}
        <footer className="border-t border-white/12 pt-3.5 space-y-3 shrink-0">
          
          {/* Segmented Timeline Progress Indicators */}
          <div className="grid grid-cols-4 gap-2">
            {STAGES.map((stg, idx) => {
              const isPast = idx < currentStage;
              const isCurrent = idx === currentStage;

              return (
                <button
                  key={stg.id}
                  onClick={() => handleSelectStage(idx)}
                  className="text-left group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={`font-bold ${isCurrent ? "text-sky-300" : isPast ? "text-emerald-400" : "text-slate-500"}`}>
                      0{idx + 1}
                    </span>
                    <span className="text-slate-400 hidden sm:inline truncate max-w-[80px]">
                      {stg.id.toUpperCase()}
                    </span>
                  </div>

                  {/* Segmented Liquid Progress Track */}
                  <div className="h-1.5 w-full rounded-full bg-black/60 border border-white/10 overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-100 ${
                        isPast
                          ? "w-full bg-emerald-400"
                          : isCurrent
                          ? "bg-gradient-to-r from-sky-400 to-indigo-400"
                          : "w-0"
                      }`}
                      style={{
                        width: isCurrent ? `${stageProgress}%` : isPast ? "100%" : "0%",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Bar: Paging Buttons + Hint */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevStage}
                disabled={currentStage === 0}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-slate-200 text-xs font-mono transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                onClick={handleNextStage}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-mono transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">{currentStage === STAGES.length - 1 ? "Enter" : "Next"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-[11px] font-mono text-slate-400 ml-2 hidden md:inline">
                {isPaused ? "Paused (hovering)" : "Auto-advancing"} • Press Space or Esc
              </span>
            </div>

            <button
              onClick={handleDismiss}
              className="px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-400/40 text-xs font-mono font-bold transition-all cursor-pointer active:scale-95"
            >
              Enter Dashboard →
            </button>
          </div>
        </footer>
      </div>
    </aside>
  );
};