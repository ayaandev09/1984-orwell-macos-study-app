"use client";

import React, { useState, useRef } from "react";
import {
  PenLine,
  Copy,
  Check,
  Trash2,
  ListPlus,
  Quote,
  Sparkles,
} from "lucide-react";

interface AcademicNotesSurfaceProps {
  note: string;
  onChange: (newNote: string) => void;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  accentColor?: string;
  itemCode?: string;
  minRows?: number;
}

export function AcademicNotesSurface({
  note,
  onChange,
  title = "Academic Marginalia & Notes",
  subtitle = "Saved automatically to your offline codex",
  placeholder = "Write your essay thesis hooks, lecture takeaways, quotes to memorize, or seminar observations here in your handwritten scholar script...",
  accentColor = "#f59e0b",
  itemCode,
  minRows = 6,
}: AcademicNotesSurfaceProps) {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordsCount = note.trim() ? note.trim().split(/\s+/).length : 0;
  const charsCount = note.length;

  const handleCopy = () => {
    if (note.trim()) {
      navigator.clipboard.writeText(note);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleInsertBullet = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const prefix = note.length === 0 || note.endsWith("\n") ? "• " : "\n• ";
    const updated = note.slice(0, start) + prefix + note.slice(end);
    onChange(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 10);
  };

  const handleInsertQuote = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = note.slice(start, end);
    const snippet = selected ? `"${selected}"` : `"[Quote]"`;
    const updated = note.slice(0, start) + snippet + note.slice(end);
    onChange(updated);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    }, 10);
  };

  const handleClear = () => {
    if (note.trim() && window.confirm("Clear your notes for this section?")) {
      onChange("");
    }
  };

  return (
    <div className="w-full rounded-2xl border border-white/15 bg-gradient-to-b from-amber-500/[0.04] via-black/40 to-black/60 backdrop-blur-xl overflow-hidden shadow-xl transition-all duration-300">
      {/* Top Academic Toolbar */}
      <div className="px-3.5 py-2.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 bg-white/[0.02]">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border"
            style={{
              backgroundColor: `${accentColor}20`,
              borderColor: `${accentColor}40`,
              color: accentColor,
            }}
          >
            <PenLine className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-300 truncate">
                {title} {itemCode ? `(${itemCode})` : ""}
              </span>
              <span className="text-xs font-mono px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300/80 border border-amber-400/20 hidden sm:inline-block">
                Academic Script
              </span>
            </div>
            <span className="text-xs text-slate-400 block truncate">
              {subtitle}
            </span>
          </div>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-1.5 text-xs shrink-0">
          <button
            type="button"
            onClick={handleInsertBullet}
            title="Insert bullet point"
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ListPlus className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">Bullet</span>
          </button>

          <button
            type="button"
            onClick={handleInsertQuote}
            title="Insert quotation format"
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <Quote className="w-3 h-3 text-amber-300" />
            <span className="hidden sm:inline">Quote</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            title="Copy notes"
            className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          {note.trim() && (
            <button
              type="button"
              onClick={handleClear}
              title="Clear notes"
              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Lined Notebook Writing Surface */}
      <div className="relative p-3.5">
        <textarea
          ref={textareaRef}
          value={note}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={minRows}
          style={{
            fontFamily:
              "'Caveat', 'Kalam', 'Noteworthy', 'Snell Roundhand', 'Chalkboard', cursive, sans-serif",
            fontSize: "1.2rem",
            lineHeight: "28px",
            letterSpacing: "0.025em",
            backgroundImage:
              "repeating-linear-gradient(transparent, transparent 27px, rgba(255, 255, 255, 0.06) 28px)",
            backgroundAttachment: "local",
          }}
          className="w-full bg-transparent text-amber-100 placeholder:text-amber-200/25 placeholder:italic focus:outline-none resize-y transition-all leading-[28px]"
        />

        {/* Bottom Footer Info */}
        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>
              {wordsCount} {wordsCount === 1 ? "word" : "words"}
            </span>
            <span>•</span>
            <span>{charsCount} chars</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300/70">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Oxford / Cambridge Marginalia Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
}
