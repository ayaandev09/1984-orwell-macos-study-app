"use client";

import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

export interface MasteryRingProps {
  appId: string;
  appTitle: string;
  subjectBadge: string;
  subjectName?: string;
  iconSystemName: string;
  activeUnit: string;
  activeTopicTitle: string;
  nextTopicTitle: string;
  completed: number;
  total: number;
  remainingMinutes?: number;
  highlightQuoteOrFormula?: string;
  examTip?: string;
  accent: string;
  secondary: string;
  telemetryTag?: string;
}

interface StudySyncBridge {
  postMessage: (payload: Record<string, unknown>) => void;
}

const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function MasteryRing({
  appId,
  appTitle,
  subjectBadge,
  subjectName,
  iconSystemName,
  activeUnit,
  activeTopicTitle,
  nextTopicTitle,
  completed,
  total,
  remainingMinutes = 0,
  highlightQuoteOrFormula = "",
  examTip = "",
  accent,
  secondary,
  telemetryTag = "120 FPS NOMINAL",
}: MasteryRingProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const dashoffset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  const payload = useMemo(
    () => ({
      appId,
      appTitle,
      subjectBadge,
      subjectName: subjectName ?? subjectBadge,
      iconSystemName,
      activeUnit,
      activeTopicTitle,
      nextTopicTitle,
      completedTopics: completed,
      totalTopics: total,
      masteryPercentage: percentage,
      remainingMinutes,
      highlightQuoteOrFormula,
      examTip,
      accentColorHex: accent,
      secondaryColorHex: secondary,
      telemetryTag,
      activeRevisionModule: activeTopicTitle,
      trigger: "mastery-ring",
      lastUpdated: Date.now() / 1000 - 978307200,
    }),
    [
      appId,
      appTitle,
      subjectBadge,
      iconSystemName,
      activeUnit,
      activeTopicTitle,
      nextTopicTitle,
      completed,
      total,
      percentage,
      remainingMinutes,
      highlightQuoteOrFormula,
      examTip,
      accent,
      secondary,
      telemetryTag,
    ]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const bridge = (
      window as unknown as {
        webkit?: { messageHandlers?: { studySync?: StudySyncBridge } };
      }
    ).webkit?.messageHandlers?.studySync;

    if (bridge?.postMessage) {
      try {
        bridge.postMessage(payload);
      } catch {
        // Native bridge unavailable in browser preview.
      }
    }

    try {
      window.localStorage.setItem(
        `study-mastery-${appId}`,
        JSON.stringify(payload)
      );
    } catch {
      // Storage may be blocked in private contexts.
    }
  }, [payload, appId]);

  return (
    <div
      className="ultraThinMaterial flex items-center gap-3 rounded-2xl px-3.5 py-2"
      title={`Synced to group.com.ayaan.studyapps — ${percentage}% mastery`}
      style={{ boxShadow: `0 0 24px -12px ${accent}` }}
    >
      <div className="relative h-[74px] w-[74px] shrink-0">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="7"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: dashoffset }}
            transition={{ type: "spring", stiffness: 80, damping: 18, mass: 0.8 }}
            style={{ filter: `drop-shadow(0 0 5px ${secondary})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-base font-bold leading-none text-white">
            {percentage}%
          </span>
          <span className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-400">
            mastered
          </span>
        </div>
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 6px ${accent}` }}
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
            Syllabus Mastery
          </span>
        </div>
        <p className="truncate text-xs font-semibold text-white">
          {completed} / {total} modules
        </p>
        <p className="truncate font-mono text-[10px] text-slate-400">
          Oceania Codex · Live Desktop Widget
        </p>
      </div>
    </div>
  );
}
