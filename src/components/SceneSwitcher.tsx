"use client";

import React, { useState } from "react";
import { BOOK_PARTS, ALL_CHAPTERS } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";

export function SceneSwitcher() {
  const { activeChapterId, setActiveChapter, completedChapters } = useStudyStore();
  const active = ALL_CHAPTERS.find((c) => c.id === activeChapterId) ?? ALL_CHAPTERS[0];
  const [partId, setPartId] = useState<string>(
    BOOK_PARTS.find((p) => p.chapters.some((c) => c.id === active.id))?.id ?? BOOK_PARTS[0].id,
  );
  const part = BOOK_PARTS.find((p) => p.id === partId) ?? BOOK_PARTS[0];

  return (
    <div className="glass-tint tint-amber rounded-3xl p-4 mb-4 space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {BOOK_PARTS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPartId(p.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              p.id === partId ? "bg-amber-500 text-slate-950" : "bg-white/8 text-slate-300 hover:bg-white/15"
            }`}
          >
            Part {p.romanNumeral}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {part.chapters.map((c) => {
          const isActive = c.id === active.id;
          const done = !!completedChapters[c.id];
          return (
            <button
              key={c.id}
              onClick={() => setActiveChapter(c.id)}
              title={c.title}
              className={`px-3 py-1.5 rounded-xl text-xs cursor-pointer border transition-colors ${
                isActive
                  ? "bg-amber-400/25 border-amber-300/70 text-white font-semibold"
                  : done
                    ? "bg-emerald-500/15 border-emerald-400/30 text-emerald-100"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/12"
              }`}
            >
              {c.displayCode}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-slate-400 truncate">{active.title}</p>
    </div>
  );
}
