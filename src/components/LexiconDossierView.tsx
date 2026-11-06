"use client";

import React, { useState } from "react";
import { Gem, Users, Sparkles, BookOpen } from "lucide-react";
import {
  SYMBOLS_LEXICON,
  CHARACTERS_DOSSIER,
} from "@/data";
import { NewspeakTranslatorSimulator } from "./NewspeakTranslatorSimulator";

export const LexiconDossierView: React.FC = React.memo(() => {
  const [activeCategory, setActiveCategory] = useState<"lab" | "characters" | "symbols">("lab");

  return (
    <div className="space-y-6">
      {/* Category Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 border border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider px-2">
            Codex Dossier Module:
          </span>
          <button
            onClick={() => setActiveCategory("lab")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === "lab"
                ? "bg-gradient-to-r from-sky-500/30 to-purple-500/30 text-white border border-sky-400/40 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            Interactive Newspeak &amp; Minitrue Lab
          </button>
          <button
            onClick={() => setActiveCategory("characters")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === "characters"
                ? "bg-gradient-to-r from-indigo-500/30 to-sky-500/30 text-white border border-indigo-400/40 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            Character Psychological Dossiers ({CHARACTERS_DOSSIER.length})
          </button>
          <button
            onClick={() => setActiveCategory("symbols")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === "symbols"
                ? "bg-gradient-to-r from-amber-500/30 to-rose-500/30 text-white border border-amber-400/40 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Gem className="w-3.5 h-3.5 text-amber-400" />
            Symbols &amp; Motifs ({SYMBOLS_LEXICON.length})
          </button>
        </div>
      </div>

      {/* ==================== 1. INTERACTIVE NEWSPEAK & MINITRUE LAB ==================== */}
      {activeCategory === "lab" && <NewspeakTranslatorSimulator />}

      {/* ==================== 2. CHARACTER DOSSIERS ==================== */}
      {activeCategory === "characters" && (
        <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="p-2 rounded-xl bg-sky-500/20 border border-sky-400/30 text-sky-300">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">
                Miniluv Psychological &amp; Character Dossiers
              </h2>
              <p className="text-xs text-slate-400">
                Class caste, psychological profiles, and ideological functions
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {CHARACTERS_DOSSIER.map((char) => (
              <div
                key={char.id}
                className="rounded-2xl p-4 bg-black/35 border border-white/12 flex flex-col justify-between hover:border-sky-400/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-bold text-white">{char.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      {char.partyStatus}
                    </span>
                  </div>

                  <div className="text-xs text-indigo-200 font-medium mb-2.5">
                    {char.role}
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed mb-3">
                    {char.psychologicalProfile}
                  </p>
                </div>

                <div className="space-y-2 pt-2.5 border-t border-white/10 text-xs">
                  <div>
                    <span className="font-bold text-rose-300">Ultimate Fate: </span>
                    <span className="text-slate-300">{char.fate}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-300">
                      Literary Function:{" "}
                    </span>
                    <span className="text-slate-300">{char.symbolicFunction}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== 3. SYMBOLS & MOTIFS LEXICON ==================== */}
      {activeCategory === "symbols" && (
        <section className="liquid-glass-bento rounded-3xl p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
              <Gem className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">
                Master Symbol &amp; Motif Lexicon
              </h2>
              <p className="text-xs text-slate-400">
                Symbolic objects, places, and structural inversions across Parts I, II &amp; III
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SYMBOLS_LEXICON.map((sym) => (
              <div
                key={sym.id}
                className="rounded-2xl p-4 bg-black/35 border border-white/12 flex flex-col justify-between hover:border-amber-400/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-white">{sym.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/20 text-amber-300 border border-amber-400/30">
                      {sym.category}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-sky-300 mb-2.5">
                    First Appearance: {sym.firstAppearance}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-3">
                    <span className="font-bold text-white">Symbolic Meaning: </span>
                    {sym.meaning}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-300">
                    Narrative Evolution:{" "}
                  </span>
                  {sym.evolution}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
});

LexiconDossierView.displayName = "LexiconDossierView";
