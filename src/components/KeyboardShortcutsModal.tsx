"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Keyboard,
  X,
  Search,
  Eye,
  Timer,
  Layers,
  Sparkles,
  Command,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  CornerDownLeft,
  Compass,
} from "lucide-react";

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName?: string;
  accentColor?: string;
  onOpenTour?: () => void;
}

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
  appName = "Orwell 1984 Study Codex",
  accentColor = "#0ea5e9",
  onOpenTour,
}: KeyboardShortcutsModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-200 select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 14 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl liquid-glass-bento rounded-3xl p-5 sm:p-7 border border-white/20 bg-slate-950 shadow-2xl overflow-hidden"
        >
          {/* Ambient Specular Neon Glow */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20"
            style={{ backgroundColor: accentColor }}
          />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner"
                style={{
                  backgroundColor: `${accentColor}25`,
                  borderColor: `${accentColor}50`,
                  color: accentColor,
                }}
              >
                <Keyboard className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-sky-400">
                    MAC NATIVE ACCELERATORS
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300 border border-white/15">
                    Pro Shortcuts
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {appName} • Quick Reference
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              title="Close Shortcuts Sheet (Esc)"
              className="p-2 rounded-2xl liquid-glass-pill text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Shortcuts Grid */}
          <div className="space-y-4 max-h-[65vh] overflow-y-auto no-scrollbar pr-1">
            {/* Section 1: Global Commands */}
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                🌐 Navigation &amp; Workspace
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Search className="w-3.5 h-3.5 text-sky-400" />
                    <span>Global Search &amp; Jump</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">K</kbd>
                    <span className="text-slate-500 mx-0.5">or</span>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">/</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Toggle Pro Inspector</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">I</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Timer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Timed Exam Sprint</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">E</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Switch Views (1 to 5)</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">1</kbd>
                    <span className="text-slate-500">➔</span>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">5</kbd>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Active Recall & Flashcards */}
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                ⚡ Active Recall Flashcards
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Flip Flashcard (3D)</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <kbd className="px-2 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">Space</kbd>
                    <span className="text-slate-500">/</span>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">↵</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Previous / Next Card</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">←</kbd>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">→</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <ArrowUp className="w-3.5 h-3.5 text-sky-400" />
                    <span>Mark Mastered / Known</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">↑</kbd>
                    <span className="text-slate-500">or</span>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">M</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-200">
                    <Keyboard className="w-3.5 h-3.5 text-purple-400" />
                    <span>This Shortcuts Sheet</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">?</kbd>
                    <span className="text-slate-500">/</span>
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white/10 border border-white/20 text-white shadow-sm">Esc</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            {onOpenTour ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenTour();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/35 transition-all cursor-pointer shadow-sm"
              >
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Launch Interactive Tour</span>
              </button>
            ) : (
              <span className="text-slate-400 font-mono text-[11px]">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white text-[10px]">Esc</kbd> to dismiss
              </span>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer"
            >
              Got it
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
