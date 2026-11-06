"use client";

import React, { useState, useMemo } from "react";
import {
  Flame,
  Languages,
  Send,
  Sparkles,
  RotateCcw,
  BookOpen,
  Eye,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  Radio,
  FileText,
  Volume2,
} from "lucide-react";
import { NEWSPEAK_LEXICON } from "@/data";

interface RedactionTask {
  id: string;
  telegram: string;
  originalArticle: string;
  targetPhrases: string[];
  replacementOption: string;
  context: string;
  orwellQuote: string;
}

const REDACTION_TASKS: RedactionTask[] = [
  {
    id: "task-1",
    telegram: "times 17.3.84 bb speech malreported africa rectify unpersons rewrite fullwise upsub antefiling",
    originalArticle:
      "In his address to the Eurasian front, Big Brother commended Comrade Withers of the Inner Party for organizing the transport of 200,000 boot rations. Big Brother predicted complete victory in South India by late spring, stating the chocolate ration would remain at 30 grammes weekly.",
    targetPhrases: [
      "Comrade Withers of the Inner Party",
      "transport of 200,000 boot rations",
      "chocolate ration would remain at 30 grammes weekly",
    ],
    replacementOption:
      "Big Brother commended the anonymous workers of the Floating Fortress garrison for vigilant sacrifice. Big Brother forecasted continued chocolate production surpluses of 20 grammes weekly.",
    context:
      "Comrade Withers has fallen into disfavor and been vaporized. Ingsoc doctrine requires he never existed: he is now an 'unperson'. The chocolate ration has also been reduced from 30g to 20g, which the Party celebrates as an increase.",
    orwellQuote:
      "Day by day and almost minute by minute the past was brought up to date... All history was a palimpsest, scraped clean and reinscribed exactly as often as was necessary.",
  },
  {
    id: "task-2",
    telegram: "times 14.2.84 miniplenty malquote pigiron surplus false reporting recast for oceania archives",
    originalArticle:
      "The Ministry of Plenty announced a deficit in pig-iron output for the third quarter of 1983, attributing the temporary shortage to machine parts requisitioned for naval bombardments in the Malabar Front.",
    targetPhrases: [
      "deficit in pig-iron output",
      "temporary shortage",
    ],
    replacementOption:
      "The Ministry of Plenty announced an unprecedented 40% surplus over quota in pig-iron production, demonstrating the triumphant vigor of Oceanic socialist industry.",
    context:
      "Totalitarian legitimacy cannot tolerate economic failure or scarcity. Ingsoc transforms material shortages into triumphant statistical victories over quota.",
    orwellQuote:
      "The fabulously statistics continued to pour out of the telescreen... Not to let oneself be found with an ungrammatical thought—that was the ultimate victory.",
  },
  {
    id: "task-3",
    telegram: "times 6.9.84 war-enemy realignment eastasia unallied eurasia peace treaty memory-hole immediate",
    originalArticle:
      "Official communiqué: Oceania is at war with Eurasia. Oceania has always been at war with Eurasia. Eastasia is our cherished and unbroken ally in the Pacific theater of collective security.",
    targetPhrases: [
      "Oceania is at war with Eurasia",
      "Eastasia is our cherished and unbroken ally",
    ],
    replacementOption:
      "Official communiqué: Oceania is at war with Eastasia. Oceania has always been at war with Eastasia. Eurasia has always been our trusted ally.",
    context:
      "During Hate Week, the enemy was switched mid-sentence. All literature, banners, posters, and books recording the previous war had to be destroyed within twenty-four hours.",
    orwellQuote:
      "Oceania was at war with Eastasia: Oceania had always been at war with Eastasia. A large part of the political literature of five years was now completely obsolete.",
  },
];

// Presets for the Newspeak Synthesizer
const SYNTHESIZER_PRESETS = [
  {
    title: "Declaration of Independence (Orwell's Appendix Paradox)",
    text: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
    explanation:
      "Orwell explains in the Appendix that Jefferson's Declaration is untranslatable into Newspeak. The only word capable of expressing it is CRIMETHINK. Concepts of liberty, equality, and human rights have had their words erased from the human cortex.",
  },
  {
    title: "Winston's Illicit Diary Entry (April 4th, 1984)",
    text: "The food quality in the canteen was extremely bad and unpleasant today. The Thought Police are watching everyone constantly and freedom of thought has been completely abolished.",
    explanation:
      "Demonstrates how emotional nuances ('bad', 'unpleasant') are reduced to the binary 'ungood' / 'plusungood', and the terrifying reality of state terror is normalized into bureaucratic abbreviations ('thinkpol').",
  },
  {
    title: "Everyday Human Emotion & Beauty",
    text: "The bright spring morning was magnificent and wonderful, filling Winston with an intense feeling of joy and profound peace.",
    explanation:
      "Newspeak abolishes superlative adjectives. 'Wonderful', 'magnificent', and 'intense' are entirely replaced by prefixes attached to the root 'good': 'plusgood' and 'doubleplusgood'.",
  },
];

// Morphological rules engine for Newspeak
const OLD_TO_NEW_RULES: { pattern: RegExp; replacement: string; rationale: string; vocab: string }[] = [
  { pattern: /\b(extremely bad|horrible|terrible|awful|abysmal|dreadful)\b/gi, replacement: "doubleplusungood", rationale: "Prefix 'doubleplus-' replaces extreme negative emotional nuances.", vocab: "A-Vocabulary" },
  { pattern: /\b(very bad|quite bad|unpleasant|poor)\b/gi, replacement: "plusungood", rationale: "Prefix 'plus-' replaces standard negative modifiers.", vocab: "A-Vocabulary" },
  { pattern: /\b(bad|evil|wicked|wrong)\b/gi, replacement: "ungood", rationale: "Prefix 'un-' destroys autonomous antonyms; 'bad' is eliminated.", vocab: "A-Vocabulary" },
  { pattern: /\b(extremely good|magnificent|splendid|superb|flawless)\b/gi, replacement: "doubleplusgood", rationale: "Abolishes nuanced aesthetic appreciation.", vocab: "A-Vocabulary" },
  { pattern: /\b(very good|great|wonderful|excellent)\b/gi, replacement: "plusgood", rationale: "Consolidates all positive gradations under root 'good'.", vocab: "A-Vocabulary" },
  { pattern: /\b(thought police|secret police|surveillance forces)\b/gi, replacement: "thinkpol", rationale: "Euphoric compound word; eliminates emotional resonance of terror.", vocab: "B-Vocabulary" },
  { pattern: /\b(freedom of thought|rebellion|heresy|unorthodox thinking|dissent)\b/gi, replacement: "crimethink", rationale: "Subsumes all independent thought into a singular absolute crime.", vocab: "B-Vocabulary" },
  { pattern: /\b(ministry of truth)\b/gi, replacement: "minitrue", rationale: "B-Vocabulary political abbreviation.", vocab: "B-Vocabulary" },
  { pattern: /\b(ministry of peace)\b/gi, replacement: "minipax", rationale: "B-Vocabulary political abbreviation.", vocab: "B-Vocabulary" },
  { pattern: /\b(ministry of love)\b/gi, replacement: "miniluv", rationale: "B-Vocabulary political abbreviation (torture department).", vocab: "B-Vocabulary" },
  { pattern: /\b(ministry of plenty)\b/gi, replacement: "miniplenty", rationale: "B-Vocabulary political abbreviation (artificial rationing).", vocab: "B-Vocabulary" },
  { pattern: /\b(english socialism)\b/gi, replacement: "ingsoc", rationale: "Oceanian state ideology.", vocab: "B-Vocabulary" },
  { pattern: /\b(forced-labor camp|labor camp|prison)\b/gi, replacement: "joycamp", rationale: "Inversion of reality; psychological pacification.", vocab: "B-Vocabulary" },
  { pattern: /\b(executed|killed|erased from history|non-existent person)\b/gi, replacement: "unpersoned", rationale: "Denies that an executed citizen ever possessed biological existence.", vocab: "B-Vocabulary" },
  { pattern: /\b(warm|very warm|hot)\b/gi, replacement: "pluswarm", rationale: "Eliminates 'hot' in favor of modified root 'warm'.", vocab: "A-Vocabulary" },
  { pattern: /\b(cold|freezing|ice-cold)\b/gi, replacement: "doublepluscold", rationale: "Eliminates independent temperature gradations.", vocab: "A-Vocabulary" },
  { pattern: /\b(quickly|rapidly|swiftly)\b/gi, replacement: "speedwise", rationale: "Suffix '-wise' turns any substantive into an adverb.", vocab: "A-Vocabulary" },
  { pattern: /\b(equal|equality|liberty|rights|justice|democracy)\b/gi, replacement: "[CRIMETHINK]", rationale: "Words literally deleted from the 11th Edition vocabulary.", vocab: "B-Vocabulary" },
];

export const NewspeakTranslatorSimulator: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<"synthesizer" | "memoryhole" | "lexicon">("synthesizer");

  // Synthesizer State
  const [inputText, setInputText] = useState<string>(SYNTHESIZER_PRESETS[1].text);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(1);

  // Memory Hole State
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [redactedPhrases, setRedactedPhrases] = useState<string[]>([]);
  const [isIncinerating, setIsIncinerating] = useState<boolean>(false);
  const [isDispatched, setIsDispatched] = useState<boolean>(false);

  const currentTask = REDACTION_TASKS[currentTaskIndex];

  // Newspeak Synthesizer Engine
  const translationResult = useMemo(() => {
    let result = inputText;
    const appliedRules: { original: string; replaced: string; rationale: string; vocab: string }[] = [];

    OLD_TO_NEW_RULES.forEach((rule) => {
      const match = result.match(rule.pattern);
      if (match) {
        match.forEach((m) => {
          appliedRules.push({
            original: m,
            replaced: rule.replacement,
            rationale: rule.rationale,
            vocab: rule.vocab,
          });
        });
        result = result.replace(rule.pattern, rule.replacement);
      }
    });

    const wordsOld = inputText.trim().split(/\s+/).filter(Boolean).length;
    const wordsNew = result.trim().split(/\s+/).filter(Boolean).length;
    const compression = wordsOld > 0 ? Math.round(((wordsOld - wordsNew) / wordsOld) * 100) : 0;
    const reductionIndex = Math.min(100, Math.max(15, appliedRules.length * 18));

    return {
      translatedText: result,
      appliedRules,
      reductionIndex,
      wordsOld,
      wordsNew,
    };
  }, [inputText]);

  // Memory Hole Handler
  const toggleRedactPhrase = (phrase: string) => {
    if (isDispatched) return;
    setRedactedPhrases((prev) =>
      prev.includes(phrase) ? prev.filter((p) => p !== phrase) : [...prev, phrase]
    );
  };

  const handleDispatchToMemoryHole = () => {
    if (redactedPhrases.length < currentTask.targetPhrases.length) return;
    setIsIncinerating(true);
    setTimeout(() => {
      setIsIncinerating(false);
      setIsDispatched(true);
    }, 1200);
  };

  const handleNextTask = () => {
    setRedactedPhrases([]);
    setIsDispatched(false);
    setCurrentTaskIndex((prev) => (prev + 1) % REDACTION_TASKS.length);
  };

  return (
    <div className="space-y-6">
      {/* Flagship Header Banner */}
      <div className="liquid-glass-bento rounded-3xl p-6 relative overflow-hidden border border-sky-400/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-sky-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Oceania Codex // Flagship Interactive Laboratory
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                MINITRUE ENGINE V11.0
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Languages className="w-8 h-8 text-sky-400" />
              Newspeak Synthesizer &amp; Minitrue Memory Hole
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Explore Orwell’s central thesis on linguistic control: how stripping grammar and vocabulary shrinks the boundaries of human consciousness until thoughtcrime becomes literally unthinkable.
            </p>
          </div>

          {/* Sub-tab Navigation Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-2xl border border-white/10 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveSubTab("synthesizer")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeSubTab === "synthesizer"
                  ? "bg-gradient-to-r from-sky-500/30 to-indigo-500/30 text-white border border-sky-400/40 shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Newspeak Synthesizer
            </button>
            <button
              onClick={() => setActiveSubTab("memoryhole")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeSubTab === "memoryhole"
                  ? "bg-gradient-to-r from-rose-500/30 to-amber-500/30 text-white border border-rose-400/40 shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Memory Hole Incinerator
            </button>
            <button
              onClick={() => setActiveSubTab("lexicon")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeSubTab === "lexicon"
                  ? "bg-gradient-to-r from-purple-500/30 to-sky-500/30 text-white border border-purple-400/40 shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
              11th Edition Lexicon
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: NEWSPEAK SYNTHESIZER                                           */}
      {/* ========================================================================= */}
      {activeSubTab === "synthesizer" && (
        <div className="space-y-6">
          {/* Preset Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              Load Historical Preset:
            </span>
            {SYNTHESIZER_PRESETS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPresetIndex(idx);
                  setInputText(p.text);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  selectedPresetIndex === idx
                    ? "bg-sky-500/25 border-sky-400/50 text-sky-200 shadow-md"
                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>

          {/* Interactive Dual-Pane Translation Desk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left: Oldspeak (Standard English) Input */}
            <div className="liquid-glass-bento rounded-3xl p-5 border border-white/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Oldspeak // Organic Human Expression
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {translationResult.wordsOld} Words
                  </span>
                </div>

                <label className="text-xs text-slate-400 block mb-2">
                  Type custom English prose or edit the preset below to observe linguistic reduction:
                </label>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={6}
                  className="w-full bg-black/40 border border-white/15 rounded-2xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-sky-400/60 transition-all resize-none font-serif leading-relaxed"
                  placeholder="Enter standard English to translate into Newspeak..."
                />
              </div>

              {/* Literary Analysis of Preset */}
              <div className="mt-4 p-3.5 rounded-2xl bg-sky-950/30 border border-sky-500/20 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-sky-300 block mb-1">
                  Orwellian Academic Context:
                </span>
                {SYNTHESIZER_PRESETS[selectedPresetIndex]?.explanation}
              </div>
            </div>

            {/* Right: Newspeak Synthesized Output */}
            <div className="liquid-glass-bento rounded-3xl p-5 border border-purple-400/30 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-300">
                      Newspeak // 11th Edition Orthodox Output
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-purple-300">
                    {translationResult.wordsNew} Words
                  </span>
                </div>

                <div className="min-h-[140px] bg-black/60 border border-purple-400/30 rounded-2xl p-4 font-mono text-sm leading-relaxed text-purple-100 relative shadow-inner">
                  {translationResult.translatedText}
                </div>

                {/* Linguistic Consciousness Reduction Meter */}
                <div className="mt-4 p-4 rounded-2xl bg-black/35 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Consciousness Range Reduction Metric
                    </span>
                    <span className="font-mono font-extrabold text-rose-400">
                      -{translationResult.reductionIndex}% Expressive Range
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 transition-all duration-500 rounded-full"
                      style={{ width: `${translationResult.reductionIndex}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    Syme to Winston: <em className="text-slate-300">&ldquo;Don&rsquo;t you see that the whole aim of Newspeak is to narrow the range of thought? In the end we shall make thoughtcrime literally impossible.&rdquo;</em>
                  </p>
                </div>
              </div>

              {/* Applied Rules Legend */}
              <div className="mt-4 space-y-2">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Active Morphological Rules Applied ({translationResult.appliedRules.length}):
                </span>
                <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto pr-1">
                  {translationResult.appliedRules.length === 0 ? (
                    <span className="text-xs text-slate-500 italic">No direct Newspeak transformations triggered for this text.</span>
                  ) : (
                    translationResult.appliedRules.map((r, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-mono bg-purple-500/20 text-purple-200 border border-purple-400/30"
                        title={r.rationale}
                      >
                        <span className="line-through text-rose-400">{r.original}</span>
                        <span className="text-sky-300">&rarr;</span>
                        <span className="font-bold text-emerald-300">{r.replaced}</span>
                        <span className="text-[9px] px-1 py-0.2 bg-white/10 rounded text-slate-300">
                          {r.vocab}
                        </span>
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: MINITRUE MEMORY HOLE INCINERATOR                               */}
      {/* ========================================================================= */}
      {activeSubTab === "memoryhole" && (
        <div className="space-y-6">
          <div className="liquid-glass-bento rounded-3xl p-6 border border-rose-500/30 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 mb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-400/30">
                    Records Department (Minitrue) // Desk 4-C
                  </span>
                  <span className="text-xs text-slate-400">
                    Case {currentTaskIndex + 1} of {REDACTION_TASKS.length}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-400" />
                  Historical Rectification &amp; Pneumatic Dispatch
                </h2>
              </div>

              {/* Task Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRedactedPhrases([]);
                    setIsDispatched(false);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Desk
                </button>
                <button
                  onClick={handleNextTask}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:brightness-110 transition-all cursor-pointer"
                >
                  Next Assignment &rarr;
                </button>
              </div>
            </div>

            {/* Minitrue Pneumatic Telegram Instruction */}
            <div className="mb-5 p-4 rounded-2xl bg-black/60 border border-amber-500/30 font-mono text-xs text-amber-300 flex items-start gap-3">
              <span className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 shrink-0">
                <Radio className="w-4 h-4 animate-pulse" />
              </span>
              <div>
                <span className="font-bold uppercase tracking-wider block text-amber-200 text-[10px] mb-0.5">
                  Incoming Telescreen / Pneumatic Tube Directive:
                </span>
                <span className="text-amber-100 tracking-wide font-mono text-sm">
                  &ldquo;{currentTask.telegram}&rdquo;
                </span>
                <p className="text-[11px] text-slate-400 mt-1 font-sans">
                  {currentTask.context}
                </p>
              </div>
            </div>

            {/* Interactive Document Redaction Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Document on Desk */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/15 relative">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
                  <span className="text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-sky-400" />
                    Times Archive Excerpt (Target for Redaction)
                  </span>
                  <span className="text-rose-400">
                    {redactedPhrases.length} / {currentTask.targetPhrases.length} Redacted
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-3">
                  Click on the heretical phrases below to incinerate them with the Minitrue redaction pen:
                </p>

                <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-sm leading-relaxed text-slate-200 font-serif relative">
                  {currentTask.originalArticle.split(".").map((sentence, sIdx) => {
                    if (!sentence.trim()) return null;
                    return (
                      <span key={sIdx} className="mr-1">
                        {currentTask.targetPhrases.reduce<React.ReactNode[]>((acc, phrase) => {
                          // Placeholder logic for phrase matching within sentence
                          return acc;
                        }, [sentence])}
                      </span>
                    );
                  })}
                  {/* Interactive Button Chips for Target Phrases */}
                  <div className="space-y-2 mt-4 pt-3 border-t border-white/10">
                    <span className="text-[11px] font-mono text-slate-400 block font-sans">
                      Detected Ingsoc Contradictions in this text:
                    </span>
                    <div className="flex flex-col gap-2">
                      {currentTask.targetPhrases.map((phrase, idx) => {
                        const isRedacted = redactedPhrases.includes(phrase);
                        return (
                          <button
                            key={idx}
                            onClick={() => toggleRedactPhrase(phrase)}
                            className={`p-2.5 rounded-xl text-xs text-left font-serif transition-all cursor-pointer flex items-center justify-between border ${
                              isRedacted
                                ? "bg-rose-950/40 border-rose-500/50 text-rose-300 line-through opacity-60"
                                : "bg-white/5 border-white/15 text-slate-100 hover:border-rose-400/50 hover:bg-rose-500/10"
                            }`}
                          >
                            <span>&ldquo;{phrase}&rdquo;</span>
                            <span className="font-mono text-[10px] uppercase font-bold shrink-0 ml-2 px-2 py-0.5 rounded-full bg-black/40">
                              {isRedacted ? "Incinerated" : "Click to Redact"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Pneumatic Tube Trigger Button */}
                <div className="mt-5">
                  <button
                    onClick={handleDispatchToMemoryHole}
                    disabled={redactedPhrases.length < currentTask.targetPhrases.length || isDispatched || isIncinerating}
                    className={`w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all ${
                      redactedPhrases.length >= currentTask.targetPhrases.length && !isDispatched
                        ? "bg-gradient-to-r from-rose-600 via-amber-600 to-rose-700 text-white cursor-pointer hover:brightness-110 active:scale-98"
                        : isDispatched
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 cursor-default"
                        : "bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed"
                    }`}
                  >
                    {isIncinerating ? (
                      <>
                        <Flame className="w-4 h-4 animate-spin text-amber-300" />
                        Incinerating in Memory Hole Flues...
                      </>
                    ) : isDispatched ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Rectified &amp; Re-filed into Oceania Records
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Dispatch to Memory Hole Tube ({redactedPhrases.length}/{currentTask.targetPhrases.length})
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right: Rectified Historical Palimpsest */}
              <div className="p-5 rounded-2xl bg-black/60 border border-emerald-500/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
                    <span className="text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Orthodox Rectification (The New Past)
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase">
                      Palimpsest Output
                    </span>
                  </div>

                  {isDispatched ? (
                    <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-sm leading-relaxed text-emerald-100 font-serif shadow-inner">
                      <p className="mb-3">{currentTask.replacementOption}</p>
                      <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-emerald-300 font-mono">
                        Archive Status: RE-INDEXED // CONTRADICTION EXTERMINATED
                      </div>
                    </div>
                  ) : (
                    <div className="h-44 flex flex-col items-center justify-center text-center p-6 rounded-xl border border-dashed border-white/15 text-slate-400 text-xs">
                      <Flame className="w-8 h-8 text-rose-400/60 mb-2 animate-bounce" />
                      <span>Incinerate all target phrases to generate the rectified official Oceania history.</span>
                    </div>
                  )}
                </div>

                {/* Literary Mechanism Quote */}
                <div className="mt-4 p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-purple-300 block mb-1">
                    George Orwell on the Mutability of the Past:
                  </span>
                  &ldquo;{currentTask.orwellQuote}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: 11TH EDITION LEXICON EXPLORER                                  */}
      {/* ========================================================================= */}
      {activeSubTab === "lexicon" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-400/30 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                Newspeak Eleventh Edition Classified Glossary
              </h3>
              <p className="text-xs text-slate-300">
                Curated by Syme and the Research Department of the Ministry of Truth.
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-purple-500/20 border border-purple-400/30 font-mono text-xs font-bold text-purple-200">
              {NEWSPEAK_LEXICON.length} Terms Curated
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {NEWSPEAK_LEXICON.map((item) => (
              <div
                key={item.term}
                className="rounded-2xl p-4 bg-black/40 border border-purple-400/25 flex flex-col justify-between hover:border-purple-400/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300">
                      {item.vocabularyClass}
                    </span>
                  </div>
                  <h4 className="text-base font-bold font-mono text-white mb-2">
                    {item.term}
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed mb-3">
                    {item.literalMeaning}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-white/10 text-xs text-purple-200">
                  <span className="font-bold text-white">Ideological Purpose: </span>
                  {item.ideologicalFunction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
