"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { LiquidGlassLogo } from "./liquid-glass-logo";

const APP_LOGO_SVG = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0ibm9uZSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im9yd2VsbEN5YW5HcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2JhZTZmZCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIzMCUiIHN0b3AtY29sb3I9IiMzOGJkZjgiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iNzAlIiBzdG9wLWNvbG9yPSIjMDI4NGM3IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMzY5YTEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJvcndlbGxDeWFuQXVyYSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzM4YmRmOCIgc3RvcC1vcGFjaXR5PSIwLjQiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iNjAlIiBzdG9wLWNvbG9yPSIjMDI4NGM3IiBzdG9wLW9wYWNpdHk9IjAuMTUiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAyODRjNyIgc3RvcC1vcGFjaXR5PSIwIiAvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ib3J3ZWxsUGFydHlSZWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmNhNWE1IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjM1JSIgc3RvcC1jb2xvcj0iI2VmNDQ0NCIgLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI3NSUiIHN0b3AtY29sb3I9IiNkYzI2MjYiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzk5MWIxYiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im9yd2VsbFB5cmFtaWRHcmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTI5M2IiIHN0b3Atb3BhY2l0eT0iMC45IiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwZjE3MmEiIHN0b3Atb3BhY2l0eT0iMC45NSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjQwIiBmaWxsPSJ1cmwoI29yd2VsbEN5YW5BdXJhKSIgLz4KICA8Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjIzMCIgZmlsbD0iIzBiMTMyMiIgc3Ryb2tlPSJ1cmwoI29yd2VsbEN5YW5HcmFkKSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2Utb3BhY2l0eT0iMC45IiAvPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iMjE0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzOGJkZjgiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iOCA4IiBzdHJva2Utb3BhY2l0eT0iMC42IiAvPgogIDxwb2x5Z29uIHBvaW50cz0iMjU2LDc2IDM5NCwzNzQgMTE4LDM3NCIgZmlsbD0idXJsKCNvcndlbGxQeXJhbWlkR3JhZCkiIHN0cm9rZT0idXJsKCNvcndlbGxDeWFuR3JhZCkiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIgLz4KICA8bGluZSB4MT0iMjU2IiB5MT0iNzYiIHgyPSIyNTYiIHkyPSIzNzQiIHN0cm9rZT0iIzM4YmRmOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utb3BhY2l0eT0iMC40IiAvPgogIDxsaW5lIHgxPSIyNTYiIHkxPSIzNiIgeDI9IjI1NiIgeTI9Ijc2IiBzdHJva2U9IiMzOGJkZjgiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiAvPgogIDxsaW5lIHgxPSIyNTYiIHkxPSI0MzYiIHgyPSIyNTYiIHkyPSI0NzYiIHN0cm9rZT0iIzM4YmRmOCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgPGxpbmUgeDE9IjM2IiB5MT0iMjU2IiB4Mj0iNzYiIHkyPSIyNTYiIHN0cm9rZT0iIzM4YmRmOCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+CiAgPGxpbmUgeDE9IjQzNiIgeTE9IjI1NiIgeDI9IjQ3NiIgeTI9IjI1NiIgc3Ryb2tlPSIjMzhiZGY4IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgLz4KICA8cGF0aCBkPSJNIDk2IDI1NiBDIDE2MCAxNDgsIDM1MiAxNDgsIDQxNiAyNTYgQyAzNTIgMzY0LCAxNjAgMzY0LCA5NiAyNTYgWiIgZmlsbD0iIzA3MGUxYiIgc3Ryb2tlPSJ1cmwoI29yd2VsbEN5YW5HcmFkKSIgc3Ryb2tlLXdpZHRoPSIxNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgLz4KICA8cGF0aCBkPSJNIDEzMiAyNTYgQyAxODAgMTgyLCAzMzIgMTgyLCAzODAgMjU2IEMgMzMyIDMzMCwgMTgwIDMzMCwgMTMyIDI1NiBaIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMjg0YzciIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWRhc2hhcnJheT0iNiA2IiBzdHJva2Utb3BhY2l0eT0iMC44IiAvPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iNjgiIGZpbGw9InVybCgjb3J3ZWxsUGFydHlSZWQpIiBzdHJva2U9IiNmZWUyZTIiIHN0cm9rZS13aWR0aD0iMy41IiAvPgogIDxjaXJjbGUgY3g9IjI1NiIgY3k9IjI1NiIgcj0iNTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZlY2FjYSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI0IDQiIHN0cm9rZS1vcGFjaXR5PSIwLjciIC8+CiAgPGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiByPSIzMiIgZmlsbD0iIzAyMDYxNyIgc3Ryb2tlPSIjMzhiZGY4IiBzdHJva2Utd2lkdGg9IjIiIC8+CiAgPGNpcmNsZSBjeD0iMjU2IiBjeT0iMjU2IiByPSIxNCIgZmlsbD0iIzM4YmRmOCIgLz4KICA8Y2lyY2xlIGN4PSIyNzAiIGN5PSIyNDIiIHI9IjgiIGZpbGw9IiNmZmZmZmYiIC8+CiAgPGNpcmNsZSBjeD0iMjQ0IiBjeT0iMjY4IiByPSIzLjUiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC44NSIgLz4KICA8Y2lyY2xlIGN4PSIyNTYiIGN5PSIyNTYiIHI9IjEzMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzhiZGY4IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWRhc2hhcnJheT0iMyAxNCIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIgLz4KPC9zdmc+";

interface CinematicStartupIntroProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const CinematicStartupIntro: React.FC<CinematicStartupIntroProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const isDismissingRef = useRef(false);

  const handleDismiss = useCallback(() => {
    if (isDismissingRef.current) return;
    isDismissingRef.current = true;
    onClose();
    onComplete?.();
  }, [onClose, onComplete]);

  // Automatic dismiss after the liquid glass simulation finishes (~4.5s)
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      handleDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [isOpen, handleDismiss]);

  // Keyboard shortcut listener (Space, Enter, Esc)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleDismiss();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleDismiss]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      }}
      onClick={handleDismiss}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 select-none bg-[#070b14] overflow-hidden cursor-pointer"
      style={{
        background: "radial-gradient(circle at 50% 50%, #0d1e38 0%, #071020 50%, #070b14 100%)",
      }}
    >
      {/* Center Liquid Glass Logo Animation */}
      <div className="relative w-full max-w-3xl flex flex-col items-center justify-center pointer-events-none">
        <div className="w-full h-72 sm:h-80 flex items-center justify-center">
          <LiquidGlassLogo
            logo={APP_LOGO_SVG}
            mark="logo"
            text="1984"
            ending="wordmark"
            fontSize={54}
            fontFamily="'Cinzel', 'Times New Roman', Georgia, serif"
            fontWeight={800}
            letterSpacing={0.12}
            theme="dark"
            logoColor="original"
            logoRelief={0.8}
            textColor="#e0f2fe"
            tileColor="#0a1526"
            background="transparent"
            depth={1.3}
            dispersion={1.2}
            relief={1.0}
            caustics={1.35}
            highlights={1.25}
            bloom={0.55}
            speed={1.0}
            loop={false}
            style={{ background: "transparent" }}
            className="w-full h-full"
          />
        </div>

        {/* Elegant Minimalist Wordmark Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex flex-col items-center gap-1.5 text-center"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-sky-300 uppercase">
              MINITRUE ARCHIVE · OCEANIA STUDY SUITE
            </span>
          </div>
          <p className="text-xs text-sky-200/50 font-serif italic">
            George Orwell · Nineteen Eighty-Four
          </p>
        </motion.div>
      </div>

      {/* Subtle Bottom Skip Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 inset-x-0 text-center pointer-events-none"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
          Click anywhere or press Space to continue
        </span>
      </motion.div>
    </motion.div>
  );
};

export default CinematicStartupIntro;
