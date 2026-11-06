"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ALL_CHAPTERS, THEMES_TAXONOMY, ThemeId } from "@/data";
import { Network, Quote as QuoteIcon, X } from "lucide-react";

const ACCENT = "#00FFFF";
const SECONDARY = "#00A8A8";

interface QuoteNode {
  id: string;
  quote: string;
  speaker: string;
  context: string;
  analysis: string;
  chapterCode: string;
  themes: ThemeId[];
}

function MagneticNode({
  children,
  className,
  onClick,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  accent: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 });

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const dx = (event.clientX - rect.left) / rect.width - 0.5;
        const dy = (event.clientY - rect.top) / rect.height - 0.5;
        x.set(dx * 18);
        y.set(dy * 18);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ scale: 1.025 }}
      style={{ x: springX, y: springY, borderColor: `${accent}55` }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function QuoteNetwork() {
  const [activeTheme, setActiveTheme] = useState<ThemeId | "all">("all");
  const [selected, setSelected] = useState<QuoteNode | null>(null);
  const themes = useMemo(() => Object.values(THEMES_TAXONOMY), []);

  const quotes = useMemo<QuoteNode[]>(() => {
    return ALL_CHAPTERS.flatMap((chapter) =>
      chapter.quotes.map((quote) => ({
        id: quote.id,
        quote: quote.quote,
        speaker: quote.speaker,
        context: quote.context,
        analysis: quote.analysis,
        chapterCode: chapter.displayCode,
        themes: quote.themes,
      }))
    )
      .filter((quote) => activeTheme === "all" || quote.themes.includes(activeTheme))
      .slice(0, 18);
  }, [activeTheme]);

  return (
    <div className="ultraThinMaterial rounded-3xl p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="rounded-xl border p-2" style={{ borderColor: `${ACCENT}66`, backgroundColor: `${ACCENT}16`, color: "#b8ffff" }}>
            <Network className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-base font-bold text-white">Quote Network · Panoptic Theme Topology</h3>
            <p className="text-[11px] text-slate-400">
              Magnetic node parallax with shared <code>layoutId</code> transitions and the neon-cyan radial glow.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setActiveTheme("all")}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-slate-300 transition hover:bg-white/10"
        >
          Reset · {quotes.length} nodes
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setActiveTheme("all")}
          className="rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition"
          style={
            activeTheme === "all"
              ? { backgroundColor: ACCENT, color: "#001010", boxShadow: `0 0 18px -4px ${ACCENT}` }
              : { backgroundColor: "rgba(255,255,255,0.06)", color: "#cbd5e1" }
          }
        >
          All Themes
        </button>
        {themes.map((theme) => {
          const isActive = activeTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => setActiveTheme(isActive ? "all" : (theme.id as ThemeId))}
              className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition"
              style={{
                backgroundColor: isActive ? theme.color : "rgba(255,255,255,0.05)",
                borderColor: `${theme.color}66`,
                color: isActive ? "#001010" : theme.badgeText,
                boxShadow: isActive ? `0 0 18px -4px ${theme.color}` : "none",
              }}
            >
              {theme.shortName}
            </button>
          );
        })}
      </div>

      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 p-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(0,255,255,0.14), transparent 45%), radial-gradient(circle at 85% 80%, rgba(0,168,168,0.12), transparent 50%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 34px 34px, 34px 34px",
        }}
      >
        <div className="relative flex flex-wrap items-stretch gap-2.5">
          {quotes.map((quote, index) => {
            const primaryTheme = THEMES_TAXONOMY[quote.themes[0]];
            return (
              <div
                key={quote.id}
                className="w-full sm:w-[calc(50%-0.4rem)] xl:w-[calc(33.333%-0.5rem)]"
                style={{ marginTop: index % 3 === 1 ? 18 : index % 3 === 2 ? 8 : 0 }}
              >
                <MagneticNode
                  onClick={() => setSelected(quote)}
                  accent={primaryTheme?.color || ACCENT}
                  className="group h-full w-full rounded-2xl border bg-black/45 p-3 text-left backdrop-blur-md transition-shadow hover:bg-black/65"
                >
                  <motion.div layoutId={`orwell-quote-${quote.id}`} className="flex h-full flex-col justify-between gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold"
                        style={{ backgroundColor: `${primaryTheme?.color || ACCENT}1f`, color: primaryTheme?.badgeText || "#c8ffff" }}
                      >
                        {quote.chapterCode}
                      </span>
                      <QuoteIcon className="h-3 w-3 opacity-60 transition-opacity group-hover:opacity-100" style={{ color: primaryTheme?.color || ACCENT }} />
                    </div>
                    <p className="line-clamp-3 font-serif text-[11px] italic leading-relaxed text-cyan-50">“{quote.quote}”</p>
                    <div className="flex flex-wrap gap-1">
                      {quote.themes.slice(0, 2).map((themeId) => {
                        const meta = THEMES_TAXONOMY[themeId];
                        return meta ? (
                          <span
                            key={themeId}
                            className="rounded-full px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider"
                            style={{ backgroundColor: `${meta.color}1f`, color: meta.badgeText }}
                          >
                            {meta.shortName}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </motion.div>
                </MagneticNode>
              </div>
            );
          })}
        </div>

        {quotes.length === 0 && (
          <p className="py-8 text-center text-xs text-slate-400">No quotes match this theme filter.</p>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`orwell-quote-${selected.id}`}
              transition={{ type: "spring", stiffness: 210, damping: 26 }}
              onClick={(event) => event.stopPropagation()}
              className="ultraThinMaterial relative w-full max-w-2xl rounded-3xl p-6"
              style={{
                backgroundImage:
                  "radial-gradient(120% 140% at 0% 0%, rgba(0,255,255,0.2), transparent 58%), radial-gradient(120% 140% at 100% 100%, rgba(0,168,168,0.18), transparent 60%)",
                boxShadow: `0 30px 90px -30px #000, 0 0 70px -20px ${ACCENT}`,
              }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 rounded-full border border-white/15 bg-white/10 p-1.5 text-slate-200 hover:bg-white/20"
                aria-label="Close quote"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-cyan-900/40 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-200">{selected.chapterCode}</span>
                {selected.themes.map((themeId) => {
                  const meta = THEMES_TAXONOMY[themeId];
                  return meta ? (
                    <span
                      key={themeId}
                      className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                      style={{ borderColor: `${meta.color}66`, backgroundColor: `${meta.color}1f`, color: meta.badgeText }}
                    >
                      {meta.shortName}
                    </span>
                  ) : null;
                })}
              </div>

              <blockquote className="font-serif text-xl italic leading-relaxed text-cyan-50">“{selected.quote}”</blockquote>
              <p className="mt-2 font-mono text-[11px] text-cyan-300/90">— {selected.speaker} · {selected.context}</p>
              <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-relaxed text-slate-200">{selected.analysis}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
