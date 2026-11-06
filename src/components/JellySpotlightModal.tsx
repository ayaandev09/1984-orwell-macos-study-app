"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  ArrowRight,
  BookOpen,
  Quote as QuoteIcon,
  Sparkles,
  Eye,
  Radio,
  CornerDownLeft,
  Layers,
} from "lucide-react";
import { searchOrwellCodex, SearchFilterTab, SearchResultItem } from "@/lib/searchEngine";
import { useStudyStore } from "@/store/useStudyStore";

interface JellySpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FEATURED_QUICK_JUMPS = [
  { id: "p1-c1", code: "I.1", title: "The Clock Strikes Thirteen & The Diary", tag: "Inaugural" },
  { id: "p1-c5", code: "I.5", title: "Syme on the Destruction of Words", tag: "Newspeak" },
  { id: "p1-c7", code: "I.7", title: "'If There is Hope, It Lies in the Proles'", tag: "Resistance" },
  { id: "p2-c2", code: "II.2", title: "The Pastoral Tryst in the Golden Country", tag: "Erotic Revolt" },
  { id: "p2-c4", code: "II.4", title: "The Coral Sanctuary Above Charrington's Shop", tag: "Sanctuary" },
  { id: "p2-c8", code: "II.8", title: "O'Brien's Flat & Brotherhood Initiation", tag: "Conspiracy" },
  { id: "p3-c2", code: "III.2", title: "The Dial of Pain & '2 + 2 = 5'", tag: "Torture" },
  { id: "p3-c5", code: "III.5", title: "Room 101: The Wire Rat-Cage", tag: "Ultimate Betrayal" },
];

export const JellySpotlightModal: React.FC<JellySpotlightModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchFilterTab>("all");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const { setActiveChapter, setViewMode } = useStudyStore();

  const results = useMemo(() => {
    return searchOrwellCodex(query, activeTab);
  }, [query, activeTab]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setActiveTab("all");
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  const handleSelect = (chapterId: string) => {
    setActiveChapter(chapterId);
    setViewMode("focus");
    onClose();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const max = results.length > 0 ? results.length : FEATURED_QUICK_JUMPS.length;
        setSelectedIndex((prev) => (prev + 1) % max);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const max = results.length > 0 ? results.length : FEATURED_QUICK_JUMPS.length;
        setSelectedIndex((prev) => (prev - 1 + max) % max);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex].id);
        } else if (!query && FEATURED_QUICK_JUMPS[selectedIndex]) {
          handleSelect(FEATURED_QUICK_JUMPS[selectedIndex].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-md select-none transition-all"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="jelly-spotlight-enter w-full max-w-3xl liquid-card-flagship rounded-3xl p-5 border border-cyan-400/40 bg-[#030914]/95 backdrop-blur-3xl shadow-[0_32px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(6,182,212,0.2)] flex flex-col max-h-[82vh] overflow-hidden"
      >
        {/* Header: Unified Single Spotlight Search Bar */}
        <div className="relative w-full mb-3 shrink-0">
          <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 24 chapters, iconic quotes ('2+2=5', 'War is Peace'), Newspeak, Room 101..."
            className="w-full pl-12 pr-24 py-3 rounded-2xl bg-black/60 border border-cyan-400/35 focus:border-cyan-400 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all font-sans"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Clear Search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono text-cyan-300 bg-cyan-500/15 border border-cyan-400/30">
              <kbd className="font-sans text-xs">esc</kbd>
            </span>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center gap-1.5 pb-3 border-b border-white/10 overflow-x-auto no-scrollbar shrink-0">
          {(
            [
              { id: "all", label: "All Oceania", icon: <Layers className="w-3 h-3" /> },
              { id: "chapters", label: "All 24 Chapters", icon: <BookOpen className="w-3 h-3" /> },
              { id: "quotes", label: "Party Slogans & Quotes", icon: <QuoteIcon className="w-3 h-3" /> },
              { id: "newspeak", label: "Newspeak Lexicon", icon: <Radio className="w-3 h-3" /> },
              { id: "themes", label: "Core Themes", icon: <Eye className="w-3 h-3" /> },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/50 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Unified Fluid Search Results Feed */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3 space-y-2 min-h-0">
          {query.trim().length > 0 ? (
            results.length > 0 ? (
              results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between gap-4 border ${
                      isSelected
                        ? "bg-cyan-500/15 border-cyan-400/50 shadow-lg shadow-cyan-950/50 -translate-y-0.5"
                        : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/35">
                          {item.displayCode}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          {item.partTitle}
                        </span>
                        {item.matchedSpeaker && (
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-rose-500/15 text-rose-300 border border-rose-400/30">
                            🗣️ {item.matchedSpeaker}
                          </span>
                        )}
                        {item.matchCategory === "Newspeak" && (
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                            📡 Newspeak
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white tracking-tight truncate">
                        {item.title}
                      </h4>
                      {item.snippet && (
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed font-serif">
                          {item.snippet}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {isSelected && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-300 bg-cyan-500/20 px-2 py-1 rounded-lg border border-cyan-400/30">
                          <CornerDownLeft className="w-3 h-3" />
                          Open
                        </span>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? "text-cyan-300 translate-x-1" : "text-slate-500"}`} />
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 font-mono text-xs">
                No chapters or quotes matched &ldquo;{query}&rdquo;.
                <p className="mt-1 text-slate-500">
                  Try searching for terms like &apos;telescreen&apos;, &apos;doublethink&apos;, &apos;Julia&apos;, &apos;O&apos;Brien&apos;, or &apos;Room 101&apos;.
                </p>
              </div>
            )
          ) : (
            <div>
              <div className="flex items-center gap-1.5 px-2 mb-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Featured Quick Jumps &amp; Crucial Turning Points
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FEATURED_QUICK_JUMPS.map((jump, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={jump.id}
                      onClick={() => handleSelect(jump.id)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                        isSelected
                          ? "bg-cyan-500/15 border-cyan-400/50 shadow-md"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="min-w-0 flex-1 truncate">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="font-mono text-[11px] font-bold text-cyan-300">
                            {jump.code}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400/70 px-1 rounded bg-cyan-500/10 border border-cyan-500/20">
                            {jump.tag}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-white truncate">
                          {jump.title}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-cyan-300 font-bold">{query ? results.length : 24}</strong> chapters
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Use ↑ ↓ to navigate</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Enter to inspect</span>
          </div>
          <span className="text-[10px] text-cyan-400/80">
            George Orwell 1984 Oceania Codex
          </span>
        </div>
      </div>
    </div>
  );
};
