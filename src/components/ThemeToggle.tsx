"use client";

import React, { useEffect, useState } from "react";

const KEY = "study-app-theme";

function apply(theme: "dark" | "light") {
  const el = document.documentElement;
  el.classList.toggle("theme-light", theme === "light");
  el.style.colorScheme = theme;
}

/** Floating light/dark switch. Persisted in localStorage; applied pre-paint by an inline script. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    const t = saved === "light" ? "light" : "dark";
    setTheme(t);
    apply(t);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={theme === "light"}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className="theme-toggle-fab no-invert"
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">{theme === "dark" ? "🌙" : "☀️"}</span>
      </span>
    </button>
  );
}
