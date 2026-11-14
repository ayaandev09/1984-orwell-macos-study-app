"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Layers,
  GraduationCap,
  Network,
  Library,
  ArrowUpRight,
  Play,
} from "lucide-react";
import { ALL_CHAPTERS } from "@/data";
import { useStudyStore, ViewMode } from "@/store/useStudyStore";

type Tile = {
  id: ViewMode;
  title: string;
  blurb: string;
  tint: string;
  icon: React.ReactNode;
  span: string;
};

const TILES: Tile[] = [
  { id: "focus", title: "Chapters", blurb: "Study one chapter at a time with close analysis", tint: "tint-amber", icon: <LayoutGrid className="w-6 h-6" />, span: "sm:col-span-2" },
  { id: "matrix", title: "Theme Matrix", blurb: "Doublethink, telescreens, Newspeak & power", tint: "tint-rose", icon: <Network className="w-6 h-6" />, span: "" },
  { id: "revision", title: "Revision Hub", blurb: "Flashcards, quizzes, and cram outlines", tint: "tint-emerald", icon: <GraduationCap className="w-6 h-6" />, span: "" },
  { id: "lexicon", title: "Characters & Symbols", blurb: "Winston, Julia, O'Brien & Party apparatus", tint: "tint-sky", icon: <Library className="w-6 h-6" />, span: "" },
  { id: "stream", title: "Speed-Read Stream", blurb: "Continuous 24-chapter overview", tint: "tint-orange", icon: <Layers className="w-6 h-6" />, span: "sm:col-span-2" },
];

export function HomeDashboard() {
  const { setViewMode, setActiveChapter, activeChapterId, completedChapters } = useStudyStore();
  const total = ALL_CHAPTERS.length;
  const done = ALL_CHAPTERS.filter((c) => completedChapters[c.id]).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const current = ALL_CHAPTERS.find((c) => c.id === activeChapterId) ?? ALL_CHAPTERS[0];

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-tint tint-amber rounded-3xl p-6 sm:col-span-2 flex flex-col justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-200/80">Airstrip One Codex</p>
            <h1 className="text-3xl font-bold text-white tracking-tight mt-1">1984 — George Orwell</h1>
          </div>
          <button
            onClick={() => {
              setActiveChapter(current.id);
              setViewMode("focus");
            }}
            className="self-start flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-semibold cursor-pointer transition-colors"
          >
            <Play className="w-4 h-4" />
            Continue {current.displayCode}
          </button>
        </div>
        <div className="glass-tint tint-emerald rounded-3xl p-6 flex flex-col justify-between gap-4">
          <p className="text-xs uppercase tracking-widest text-emerald-200/80">Mastery</p>
          <div>
            <p className="text-4xl font-bold text-white">{pct}%</p>
            <p className="text-xs text-slate-300 mt-1">{done} of {total} chapters</p>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {TILES.map((t, i) => (
          <motion.button
            key={t.id}
            onClick={() => setViewMode(t.id)}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05, type: "spring", stiffness: 260, damping: 244 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`glass-tint ${t.tint} ${t.span} text-left rounded-3xl p-5 min-h-[130px] flex flex-col justify-between cursor-pointer`}
          >
            <div className="flex items-start justify-between text-white/90">
              {t.icon}
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">{t.title}</h2>
              <p className="text-sm text-slate-300/90 mt-0.5">{t.blurb}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
