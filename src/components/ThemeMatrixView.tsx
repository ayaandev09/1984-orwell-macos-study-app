"use client";

import React, { useState, useMemo } from "react";
import { Radar, Quote, Bookmark, ArrowUpRight, Filter } from "lucide-react";
import { THEMES_TAXONOMY, ALL_CHAPTERS, ThemeId } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";
import { QuoteNetwork } from "@/components/QuoteNetwork";

export const ThemeMatrixView: React.FC = React.memo(() => {
  const {
    activeThemeFilter,
    setActiveThemeFilter,
    bookmarkedQuotes,
    toggleBookmarkQuote,
    setActiveChapter,
    setViewMode,
    searchQuery,
  } = useStudyStore();

  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const themesList = useMemo(() => Object.values(THEMES_TAXONOMY), []);

  const allQuotesWithChapter = useMemo(() => {
    return ALL_CHAPTERS.flatMap((ch) =>
      ch.quotes.map((q) => ({
        ...q,
        chapterId: ch.id,
        chapterCode: ch.displayCode,
        chapterTitle: ch.title,
      }))
    ).filter((q) => {
      if (onlyBookmarked && !bookmarkedQuotes[q.id]) return false;
      if (
        activeThemeFilter !== "all" &&
        !q.themes.includes(activeThemeFilter)
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const term = searchQuery.toLowerCase();
        return (
          q.quote.toLowerCase().includes(term) ||
          q.analysis.toLowerCase().includes(term) ||
          q.speaker.toLowerCase().includes(term) ||
          q.chapterTitle.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [onlyBookmarked, bookmarkedQuotes, activeThemeFilter, searchQuery]);

  return (
    <div className="space-y-5">
      {/* ==================== 8 CORE THEMES TAXONOMY BENTO ==================== */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-300">
              <Radar className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">
                Ideological &amp; Thematic Architecture of *1984*
              </h2>
              <p className="text-xs text-slate-400">
                Click any theme to filter the Chapter Intensity Matrix and Quote Vault
              </p>
            </div>
          </div>

          {activeThemeFilter !== "all" && (
            <button
              onClick={() => setActiveThemeFilter("all")}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold liquid-glass-pill text-sky-300 hover:text-white cursor-pointer"
            >
              Show All 8 Themes
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3.5">
          {themesList.map((theme) => {
            const isSelected = activeThemeFilter === theme.id;
            const chaptersCount = ALL_CHAPTERS.filter((ch) =>
              ch.themeTracking.some((t) => t.themeId === theme.id)
            ).length;

            return (
              <div
                key={theme.id}
                onClick={() =>
                  setActiveThemeFilter(
                    isSelected ? "all" : (theme.id as ThemeId)
                  )
                }
                className={`rounded-2xl p-4 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-white/[0.11] shadow-lg scale-[1.01]"
                    : "bg-black/30 hover:bg-white/[0.06] border-white/10"
                }`}
                style={{
                  borderColor: isSelected ? theme.color : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
                      style={{
                        backgroundColor: theme.badgeBg,
                        borderColor: theme.badgeBorder,
                        color: theme.badgeText,
                      }}
                    >
                      {theme.shortName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {chaptersCount} Chapters
                    </span>
                  </div>

                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    {theme.newspeakTerm}
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed mb-3">
                    {theme.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-white/10 text-[11px] text-slate-300">
                  <span className="font-bold text-white">Mechanism: </span>
                  {theme.coreMechanism}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================== 25-CHAPTER X 8-THEME HEATMAP MATRIX ==================== */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 overflow-x-auto">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white">
            Chapter-by-Chapter Thematic Intensity Heatmap (I.1 ➔ APP)
          </h3>
          <p className="text-xs text-slate-400">
            Click any chapter cell to jump directly to its full Bento study view
          </p>
        </div>

        <table className="w-full text-left border-collapse min-w-[780px]">
          <thead>
            <tr className="border-b border-white/15 text-[11px] font-mono uppercase text-slate-400">
              <th className="py-2.5 px-3">Chapter</th>
              {themesList.map((t) => (
                <th key={t.id} className="py-2.5 px-2 text-center">
                  <span style={{ color: t.badgeText }}>{t.shortName}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {ALL_CHAPTERS.map((ch) => (
              <tr
                key={ch.id}
                onClick={() => {
                  setActiveChapter(ch.id);
                  setViewMode("focus");
                  window.scrollTo(0, 0);
                }}
                className="hover:bg-white/[0.06] transition-colors cursor-pointer group"
              >
                <td className="py-2 px-3 font-medium text-slate-200 group-hover:text-sky-300 flex items-center gap-2">
                  <span className="font-mono font-bold text-sky-300 w-9 shrink-0">
                    {ch.displayCode}
                  </span>
                  <span className="truncate max-w-[220px]">{ch.title}</span>
                </td>
                {themesList.map((t) => {
                  const found = ch.themeTracking.find(
                    (tr) => tr.themeId === t.id
                  );
                  const intensity = found ? found.intensity : 0;
                  return (
                    <td key={t.id} className="py-2 px-2 text-center">
                      {intensity > 0 ? (
                        <span
                          className="inline-flex items-center justify-center w-7 h-6 rounded-lg font-mono text-[11px] font-bold border"
                          style={{
                            backgroundColor: t.badgeBg,
                            borderColor: t.badgeBorder,
                            color: t.badgeText,
                            opacity: 0.4 + intensity * 0.12,
                          }}
                          title={found?.manifestation}
                        >
                          {intensity}
                        </span>
                      ) : (
                        <span className="text-slate-700">·</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ==================== MASTER QUOTE VAULT ==================== */}
      <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
              <Quote className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-white">
                Master Quote Vault &amp; Analytical Index ({allQuotesWithChapter.length})
              </h3>
              <p className="text-xs text-slate-400">
                Every pivotal quote in *1984* with speaker context and literary explication
              </p>
            </div>
          </div>

          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${
              onlyBookmarked
                ? "bg-amber-500/25 border-amber-400/50 text-amber-200"
                : "liquid-glass-pill text-slate-300 hover:text-white"
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${
                onlyBookmarked ? "text-amber-300 fill-amber-300" : ""
              }`}
            />
            <span>Bookmarked Quotes Only</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allQuotesWithChapter.map((q) => {
            const isBookmarked = !!bookmarkedQuotes[q.id];
            return (
              <div
                key={q.id}
                className="rounded-2xl p-4 bg-black/35 border border-white/12 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <button
                      onClick={() => {
                        setActiveChapter(q.chapterId);
                        setViewMode("focus");
                        window.scrollTo(0, 0);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/30 cursor-pointer"
                    >
                      {q.chapterCode}
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => toggleBookmarkQuote(q.id)}
                      aria-label="Bookmark quote"
                      className="p-1.5 rounded-xl liquid-glass-pill text-slate-400 hover:text-amber-300 cursor-pointer"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isBookmarked ? "text-amber-300 fill-amber-300" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <blockquote className="text-sm sm:text-base font-semibold text-white italic leading-relaxed border-l-2 border-sky-400 pl-3 mb-2">
                    &ldquo;{q.quote}&rdquo;
                  </blockquote>

                  <div className="text-[11px] font-mono text-sky-300 mb-2">
                    — {q.speaker} ({q.context})
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed mb-3">
                    {q.analysis}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
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

      <QuoteNetwork />
    </div>
  );
});

ThemeMatrixView.displayName = "ThemeMatrixView";
