"use client";

import React from "react";
import {
  Compass,
  LayoutGrid,
  Layers,
  GraduationCap,
  Network,
  Library,
} from "lucide-react";
import { ALL_CHAPTERS } from "@/data";
import { useStudyStore, ViewMode } from "@/store/useStudyStore";
import { OrwellAppLogo } from "./OrwellAppLogo";

const ITEMS: { id: ViewMode; label: string; tint: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Home", tint: "245,158,11", icon: <Compass className="w-4 h-4" /> },
  { id: "focus", label: "Chapters", tint: "245,158,11", icon: <LayoutGrid className="w-4 h-4" /> },
  { id: "stream", label: "Quick Read", tint: "249,115,22", icon: <Layers className="w-4 h-4" /> },
  { id: "matrix", label: "Theme Matrix", tint: "244,63,94", icon: <Network className="w-4 h-4" /> },
  { id: "lexicon", label: "Characters", tint: "14,165,233", icon: <Library className="w-4 h-4" /> },
  { id: "revision", label: "Revise", tint: "16,185,129", icon: <GraduationCap className="w-4 h-4" /> },
];

export function SideNav() {
  const { viewMode, setViewMode, sidebarCollapsed, completedChapters } = useStudyStore();
  const done = ALL_CHAPTERS.filter((c) => completedChapters[c.id]).length;
  const pct = Math.round((done / ALL_CHAPTERS.length) * 100);

  return (
    <aside
      data-tour="sidebar"
      className={`shrink-0 glass-tint tint-amber rounded-3xl flex flex-col h-[calc(100vh-2rem)] sticky top-4 select-none overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${
        sidebarCollapsed
          ? "w-0 max-w-0 p-0 -mr-4 xl:-mr-5 border-0 opacity-0 pointer-events-none"
          : "w-60 p-4 opacity-100"
      }`}
    >
      <div className="w-52 flex flex-col h-full min-h-0 gap-4">
        <div className="flex items-center gap-2.5 mac-drag-region">
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 p-1 shrink-0 flex items-center justify-center">
            <OrwellAppLogo className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">1984 CODEX</p>
            <h1 className="text-sm font-bold text-white tracking-tight">Nineteen Eighty-Four</h1>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5" aria-label="Sections">
          {ITEMS.map((it) => {
            const active = viewMode === it.id;
            return (
              <button
                key={it.id}
                onClick={() => setViewMode(it.id)}
                aria-current={active ? "page" : undefined}
                style={active ? { background: `rgba(${it.tint},0.22)`, borderColor: `rgba(${it.tint},0.5)` } : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl border text-sm cursor-pointer transition-colors ${
                  active
                    ? "text-white font-semibold"
                    : "border-transparent text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
              >
                <span style={{ color: `rgb(${it.tint})` }}>{it.icon}</span>
                {it.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-black/30 border border-white/10 p-3">
          <div className="flex justify-between text-xs text-slate-300 mb-2">
            <span>Mastery</span>
            <span className="text-amber-300 font-semibold">{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-amber-400 transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">{done} of {ALL_CHAPTERS.length} chapters done</p>
        </div>
      </div>
    </aside>
  );
}
