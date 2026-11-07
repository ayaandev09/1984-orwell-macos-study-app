"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Zap,
  BookOpen,
  LayoutGrid,
  Search,
  PanelLeft,
  Eye,
  Timer,
  CheckCircle2,
  Layers,
  GraduationCap,
  Tv,
} from "lucide-react";
import { OrwellAppLogo } from "./OrwellAppLogo";

interface ImmersiveAppWalkthroughProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGoal?: (goal: "learn" | "revise") => void;
  isInspectorOpen?: boolean;
  onOpenInspector?: () => void;
}

interface TourStep {
  id: string;
  targetSelector: string;
  badge: string;
  title: string;
  description: string;
  shortcut?: string;
  preferredPlacement: "top" | "bottom" | "left" | "right";
  icon: React.ReactNode;
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "sidebar",
    targetSelector: '[data-tour="sidebar"]',
    badge: "Navigation",
    title: "Telescreen & Chapter Navigator",
    description:
      "Quickly browse all 24 chapters across Parts 1–3, Goldstein's Book, and the Newspeak Appendix. Track your reading completion percentage in real time.",
    shortcut: "Press ⌘B anytime to collapse or expand for wide-screen reading.",
    preferredPlacement: "right",
    icon: <PanelLeft className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "command-bar",
    targetSelector: '[data-tour="command-bar"]',
    badge: "Control Deck",
    title: "Top Command Center",
    description:
      "Switch between Deep Study and Revision Cramming at will, toggle CRT phosphor scanlines, launch Timed Exam Sprints (⌘E), and trigger global Spotlight Search (⌘K).",
    shortcut: "Press ⌘E to start an immediate 15-minute exam simulation.",
    preferredPlacement: "bottom",
    icon: <Zap className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "nav-tabs",
    targetSelector: '[data-tour="nav-tabs"]',
    badge: "Workflows",
    title: "5 Oceania Study Views",
    description:
      "Seamlessly transition between Chapter Bento, Continuous Text, Active Recall revision flashcards, Theme Matrix, and the Newspeak Translator.",
    shortcut: "Press keys 1 through 5 on your keyboard to instantly jump between views.",
    preferredPlacement: "bottom",
    icon: <Layers className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "study-bento",
    targetSelector: '[data-tour="study-bento"]',
    badge: "Chapter Theory",
    title: "Interactive Chapter Bento & Doublethink",
    description:
      "Every chapter features detailed textual annotations, psychological manipulation analyses, historical allegories, and speed-read bullet points.",
    shortcut: "Click cards to flip for active recall questions and examiner analysis.",
    preferredPlacement: "top",
    icon: <LayoutGrid className="w-4 h-4 text-amber-400" />,
  },
  {
    id: "inspector",
    targetSelector: '[data-tour="inspector"]',
    badge: "Analytical Sidecar",
    title: "Oceania Codex Inspector",
    description:
      "Your personal analytical dossier: Party power mechanics, Doublethink analysis, active recall flip cards, and persistent field notes.",
    shortcut: "Press ⌘I to unfold or tuck the inspector away.",
    preferredPlacement: "left",
    icon: <Eye className="w-4 h-4 text-amber-400" />,
  },
];

export function ImmersiveAppWalkthrough({
  isOpen,
  onClose,
  onSelectGoal,
  isInspectorOpen = true,
  onOpenInspector,
}: ImmersiveAppWalkthroughProps) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [chosenGoal, setChosenGoal] = useState<"learn" | "revise">("learn");
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const isCelebrationStep = currentStep >= TOUR_STEPS.length;
  const currentStepData = !isCelebrationStep ? TOUR_STEPS[currentStep] : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update target bounding box on step change, resize, and scroll
  const updateBoundingRect = useCallback(() => {
    if (isCelebrationStep || !currentStepData) {
      setTargetRect(null);
      return;
    }

    const el = document.querySelector(currentStepData.targetSelector);
    if (el) {
      const rect = el.getBoundingClientRect();
      setTargetRect(rect);
    } else {
      setTargetRect(null);
    }
  }, [isCelebrationStep, currentStepData]);

  // Handle step change side-effects
  useEffect(() => {
    if (!isOpen) return;

    if (!isCelebrationStep && currentStepData) {
      // Auto-open inspector if targeting inspector and currently closed
      if (currentStepData.id === "inspector" && onOpenInspector && !isInspectorOpen) {
        onOpenInspector();
      }

      // Smooth scroll target element into viewport if partially hidden
      const el = document.querySelector(currentStepData.targetSelector);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    // Measure immediately and after smooth scroll completes
    updateBoundingRect();
    const frame = requestAnimationFrame(updateBoundingRect);
    const timer = setTimeout(updateBoundingRect, 280);

    window.addEventListener("resize", updateBoundingRect);
    window.addEventListener("scroll", updateBoundingRect, true);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("resize", updateBoundingRect);
      window.removeEventListener("scroll", updateBoundingRect, true);
    };
  }, [isOpen, currentStep, isCelebrationStep, currentStepData, isInspectorOpen, onOpenInspector, updateBoundingRect]);

  const handleNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, TOUR_STEPS.length));
  }, []);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleFinish = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hasSeenAppWalkthrough_orwell_v1", "true");
    }
    if (onSelectGoal) {
      onSelectGoal(chosenGoal);
    }
    onClose();
  }, [chosenGoal, onClose, onSelectGoal]);

  // Global Keyboard shortcuts during tour
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleFinish();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (isCelebrationStep) {
          handleFinish();
        } else {
          handleNext();
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleBack();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (isCelebrationStep) {
          handleFinish();
        } else {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isCelebrationStep, handleNext, handleBack, handleFinish]);

  // Calculate dynamic position for floating callout card
  const calloutPosition = useMemo(() => {
    if (!targetRect || isCelebrationStep || !currentStepData) {
      return null;
    }

    const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
    const winH = typeof window !== "undefined" ? window.innerHeight : 800;
    const cardW = 380;
    const cardH = 260;

    // Small screens: pin to bottom
    if (winW < 768) {
      return {
        bottom: 24,
        left: 16,
        right: 16,
      };
    }

    const placement = currentStepData.preferredPlacement;
    let top = 0;
    let left = 0;

    if (placement === "right") {
      left = Math.min(winW - cardW - 24, targetRect.right + 20);
      top = Math.max(24, Math.min(winH - cardH - 24, targetRect.top + (targetRect.height - cardH) / 2));
    } else if (placement === "left") {
      left = Math.max(24, targetRect.left - cardW - 20);
      top = Math.max(24, Math.min(winH - cardH - 24, targetRect.top + (targetRect.height - cardH) / 2));
    } else if (placement === "top") {
      top = Math.max(24, targetRect.top - cardH - 20);
      left = Math.max(24, Math.min(winW - cardW - 24, targetRect.left + (targetRect.width - cardW) / 2));
    } else {
      // bottom
      top = Math.min(winH - cardH - 24, targetRect.bottom + 20);
      left = Math.max(24, Math.min(winW - cardW - 24, targetRect.left + (targetRect.width - cardW) / 2));
    }

    return { top, left };
  }, [targetRect, isCelebrationStep, currentStepData]);

  if (!isOpen || !mounted) return null;

  const pad = 8;
  const highlightBox = targetRect
    ? {
        top: Math.max(4, targetRect.top - pad),
        left: Math.max(4, targetRect.left - pad),
        width: Math.min(window.innerWidth - 8, targetRect.width + pad * 2),
        height: Math.min(window.innerHeight - 8, targetRect.height + pad * 2),
      }
    : null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[999990] select-none">
        {/* Full-screen Dark Backdrop when no target or on Celebration step */}
        {(!highlightBox || isCelebrationStep) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999991] bg-black/85 backdrop-blur-xl"
            onClick={handleFinish}
          />
        )}

        {/* Dynamic Spotlight Cutout & Glowing Outline */}
        {highlightBox && !isCelebrationStep && (
          <motion.div
            key="spotlight-frame"
            initial={false}
            animate={{
              top: highlightBox.top,
              left: highlightBox.left,
              width: highlightBox.width,
              height: highlightBox.height,
            }}
            transition={{
              type: "spring",
              stiffness: 340,
              damping: 32,
            }}
            className="fixed pointer-events-none z-[999992] rounded-3xl"
            style={{
              boxShadow:
                "0 0 0 9999px rgba(3, 7, 18, 0.82), 0 0 35px rgba(6, 182, 212, 0.65), inset 0 0 20px rgba(6, 182, 212, 0.25)",
              border: "2px solid #06b6d4",
            }}
          >
            {/* Animated Radiant Border Glow */}
            <div className="absolute -inset-1 rounded-[26px] pointer-events-none opacity-75 animate-pulse border-2 border-amber-400 shadow-[0_0_20px_#06b6d4]" />
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* INTERACTIVE FLOATING CALLOUT CARD (STEP 1 - 5) */}
        {/* ========================================================================= */}
        {!isCelebrationStep && currentStepData && calloutPosition && (
          <motion.div
            key={`tour-card-${currentStepData.id}`}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              top: calloutPosition.top,
              left: calloutPosition.left,
              bottom: calloutPosition.bottom,
              right: calloutPosition.right,
              position: "fixed",
            }}
            className="z-[999999] pointer-events-auto w-full max-w-[390px] p-5 sm:p-6 rounded-3xl bg-slate-950/92 border border-amber-500/40 backdrop-blur-2xl shadow-2xl flex flex-col gap-3 text-left"
          >
            {/* Header: Step Badge + Tag + Skip */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center shrink-0">
                  {currentStepData.icon}
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-amber-400 uppercase block truncate">
                    Step {currentStep + 1} of {TOUR_STEPS.length} · {currentStepData.badge}
                  </span>
                </div>
              </div>
              <button
                onClick={handleFinish}
                title="Skip Interactive Walkthrough"
                className="text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>Skip</span>
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Title & Description */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-1.5">
                {currentStepData.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            {/* Shortcut Hint Pill */}
            {currentStepData.shortcut && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{currentStepData.shortcut}</span>
              </div>
            )}

            {/* Footer Navigation Bar */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 mt-1">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  currentStep === 0
                    ? "opacity-30 cursor-not-allowed text-slate-500"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 active:scale-95"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {TOUR_STEPS.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentStep === idx
                        ? "w-5 bg-amber-400 shadow-[0_0_8px_#06b6d4]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-mono shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* FINAL CELEBRATION CARD ("YOU'RE READY!") */}
        {/* ========================================================================= */}
        {isCelebrationStep && (
          <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-950/95 border border-amber-500/40 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Radial Background Aurora */}
              <div className="absolute -top-24 -left-24 w-56 h-56 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-56 h-56 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />

              {/* Celebration Icon with Animated Halo */}
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-500/30 to-sky-500/20 border-2 border-amber-400/60 flex items-center justify-center p-3 shadow-xl relative z-10">
                  <CheckCircle2 className="w-8 h-8 text-amber-400 animate-tick-pop" />
                </div>
                <div className="absolute -inset-2 rounded-3xl bg-amber-400/20 blur-lg animate-pulse" />
              </div>

              {/* Heading & Subtitle */}
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-amber-400 uppercase mb-1">
                Tour Complete
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                You&apos;re Ready!
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-sm">
                You now know all the key tools to study George Orwell&apos;s 1984 with maximum depth and analytical clarity. Choose your starting study posture:
              </p>

              {/* Study Posture Selector */}
              <div className="grid grid-cols-2 gap-3 w-full mb-6">
                <button
                  onClick={() => setChosenGoal("learn")}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    chosenGoal === "learn"
                      ? "bg-amber-500/20 border-amber-400/60 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <BookOpen className="w-4 h-4" />
                    <span>Deep Study</span>
                  </div>
                  <span className="text-[11px] text-slate-300 leading-snug">
                    Full text annotations, psychological models &amp; historical context.
                  </span>
                </button>

                <button
                  onClick={() => setChosenGoal("revise")}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                    chosenGoal === "revise"
                      ? "bg-amber-500/20 border-amber-400/60 text-white shadow-lg shadow-amber-500/20"
                      : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                    <Zap className="w-4 h-4" />
                    <span>Revision Cram</span>
                  </div>
                  <span className="text-[11px] text-slate-300 leading-snug">
                    Exam sprint drills, Newspeak flashcards &amp; Party slogans.
                  </span>
                </button>
              </div>

              {/* Enter Codex Button */}
              <button
                onClick={handleFinish}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-sky-400 to-amber-500 hover:from-amber-400 hover:to-sky-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer font-mono uppercase tracking-wider"
              >
                <span>Enter 1984 Codex</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </AnimatePresence>,
    document.body
  );
}
