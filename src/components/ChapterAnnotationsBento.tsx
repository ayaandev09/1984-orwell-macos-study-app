"use client";

import React, { useState } from "react";
import {
  Highlighter,
  BookOpen,
  Edit3,
  GraduationCap,
  Copy,
  Check,
  Filter,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  ChapterAnnotation,
  AnnotationCategory,
  ANNOTATION_THEMES,
  getAnnotationsForChapter,
} from "@/data";

interface ChapterAnnotationsBentoProps {
  chapterId: string;
  chapterCode: string;
}

export const ChapterAnnotationsBento: React.FC<ChapterAnnotationsBentoProps> = ({
  chapterId,
  chapterCode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AnnotationCategory | "all">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const annotations = getAnnotationsForChapter(chapterId);

  const filteredAnnotations = selectedCategory === "all"
    ? annotations
    : annotations.filter((a) => a.category === selectedCategory);

  const handleCopy = (text: string, id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  if (!annotations || annotations.length === 0) {
    return null;
  }

  return (
    <div className="liquid-glass-bento rounded-3xl p-5 sm:p-6 space-y-4 border border-white/15 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
      {/* Background ambient color glow */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header with Title and School Study Tip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shrink-0">
            <Highlighter className="w-5 h-5 text-cyan-300" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Essential Book Marginalia &amp; Exam Annotations
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                Ch. {chapterCode}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Exact quotes to underline, color-coded themes, and precise notes to write in your physical book margins for essays.
            </p>
          </div>
        </div>

        {/* Total Annotation Count */}
        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/10 text-slate-200 border border-white/15 self-start sm:self-center shrink-0">
          {annotations.length} High-Yield Annotations
        </span>
      </div>

      {/* Color Code Legend & Category Filter Bar */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          <Filter className="w-3 h-3 text-cyan-400" />
          <span>Highlighter Color Code (Carried Throughout 1984):</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-white text-slate-950 shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            }`}
          >
            All Themes ({annotations.length})
          </button>

          {(Object.keys(ANNOTATION_THEMES) as AnnotationCategory[]).map((catId) => {
            const theme = ANNOTATION_THEMES[catId];
            const hasMatches = annotations.some((a) => a.category === catId);
            if (!hasMatches) return null;

            const isSelected = selectedCategory === catId;
            return (
              <button
                key={catId}
                onClick={() => setSelectedCategory(catId)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected
                    ? "shadow-lg scale-102"
                    : "opacity-85 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: isSelected ? theme.color : theme.badgeBg,
                  borderColor: isSelected ? theme.color : theme.badgeBorder,
                  color: isSelected ? "#000000" : theme.badgeText,
                  fontWeight: isSelected ? 800 : 600,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isSelected ? "#000000" : theme.dotColor }}
                />
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Annotations List */}
      <div className="space-y-4 pt-2 relative z-10">
        {filteredAnnotations.map((item, idx) => {
          const theme = ANNOTATION_THEMES[item.category];

          return (
            <div
              key={item.id}
              className="rounded-2xl p-4 sm:p-5 border transition-all duration-200"
              style={{
                backgroundColor: "rgba(5, 10, 20, 0.65)",
                borderColor: theme ? theme.badgeBorder : "rgba(255,255,255,0.12)",
                boxShadow: `0 8px 30px -10px ${theme ? theme.badgeBorder : "transparent"}`,
              }}
            >
              {/* Top Row: Theme Badge + Location Marker + Copy Actions */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5"
                    style={{
                      backgroundColor: theme.badgeBg,
                      borderColor: theme.badgeBorder,
                      color: theme.badgeText,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: theme.dotColor }}
                    />
                    {theme.badgeLabel}
                  </span>

                  <span className="text-xs font-mono text-slate-400">
                    📍 {item.locationInChapter}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(item.quoteToUnderline, `quote-${item.id}`)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer border border-white/10"
                    title="Copy quote for essay"
                  >
                    {copiedId === `quote-${item.id}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">Quote Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Quote</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() =>
                      handleCopy(
                        `[${item.literaryTechnique}] ${item.marginaliaText}`,
                        `margin-${item.id}`
                      )
                    }
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-all cursor-pointer border border-white/10"
                    title="Copy marginalia to write in book"
                  >
                    {copiedId === `margin-${item.id}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">Note Copied</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-3 h-3" />
                        <span>Copy Note</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 1. What to Underline in Book */}
              <div
                className="p-3.5 rounded-xl border mb-3.5"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  borderColor: theme ? theme.badgeBorder : "rgba(255,255,255,0.15)",
                }}
              >
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider font-bold mb-1.5"
                  style={{ color: theme.badgeText }}
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    1. Underline in Book (Highlight with {theme.name.split(" ")[0]}):
                  </span>
                  <span className="text-[10px] text-slate-400 lowercase font-normal">
                    {item.literaryTechnique}
                  </span>
                </div>
                <blockquote className="text-sm sm:text-[15px] font-semibold text-white italic leading-relaxed border-l-2 pl-3"
                  style={{ borderColor: theme.color }}
                >
                  &ldquo;{item.quoteToUnderline}&rdquo;
                </blockquote>
              </div>

              {/* 2. Exactly What to Write in the Margin & 3. Essay Application */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Margin Note Card */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                    <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                    <span>2. Write in Book Margin:</span>
                  </div>
                  <div className="inline-block px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-200 text-[10px] font-mono font-semibold">
                    Technique: {item.literaryTechnique}
                  </div>
                  <p className="text-slate-200 leading-relaxed font-sans text-xs">
                    {item.marginaliaText}
                  </p>
                </div>

                {/* Essay Application Card */}
                <div className="p-3 rounded-xl bg-purple-950/25 border border-purple-400/25 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                    <span>3. Exam / Sample Essay Application:</span>
                  </div>
                  <p className="text-purple-100/90 leading-relaxed text-xs">
                    {item.essayApplication}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
