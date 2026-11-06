"use client";

import { ALL_CHAPTERS, BOOK_PARTS } from "@/data";
import { useStudyStore } from "@/store/useStudyStore";

export type WidgetSyncTrigger = "init" | "flip" | "topic-complete" | "navigation" | "heartbeat" | "force" | "state-change" | "native-load";

interface NativeMessageHandler {
  postMessage: (payload: unknown) => void;
}

function writeWidgetData(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  const jsonString = JSON.stringify(payload);

  const handler = (
    window as unknown as {
      webkit?: { messageHandlers?: { studySync?: NativeMessageHandler } };
    }
  ).webkit?.messageHandlers?.studySync;

  if (handler) {
    try {
      handler.postMessage(jsonString);
    } catch (err) {
      console.warn("[WidgetBridge] Failed to postMessage:", err);
    }
  }

  try {
    window.localStorage.setItem("widget_data", jsonString);
    window.localStorage.setItem("study_widget_orwell", jsonString);
  } catch {
    // LocalStorage fallback
  }
}

export function syncWidgetSnapshot(trigger: WidgetSyncTrigger = "init") {
  const state = useStudyStore.getState();
  const activeChapter =
    ALL_CHAPTERS.find((chapter) => chapter.id === state.activeChapterId) ||
    ALL_CHAPTERS[0];
  const activePart =
    BOOK_PARTS.find((part) => part.id === activeChapter?.partId) || BOOK_PARTS[0];
  const currentIndex = ALL_CHAPTERS.findIndex(
    (chapter) => chapter.id === activeChapter?.id
  );
  const nextChapter =
    currentIndex >= 0 && currentIndex < ALL_CHAPTERS.length - 1
      ? ALL_CHAPTERS[currentIndex + 1]
      : null;
  const completed = Object.values(state.completedChapters || {}).filter(Boolean).length;
  const total = ALL_CHAPTERS.length || 24;
  const masteryPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  writeWidgetData({
    appId: "orwell",
    appTitle: "MINITRUE // 1984",
    subjectBadge: "OCEANIA CODEX",
    iconSystemName: "eye.fill",
    subjectName: "1984",
    activeUnit: activePart?.title || "Part I • London",
    activeTopicTitle: activeChapter?.title || "The Telescreen & The Diary",
    activeRevisionModule: `${activeChapter?.displayCode || "I.1"} · ${activeChapter?.title || ""}`,
    nextTopicTitle: nextChapter?.title || "Appendix complete",
    completedTopics: completed,
    totalTopics: total,
    masteryPercentage,
    remainingMinutes: activeChapter?.readingTimeMinutes || 30,
    highlightQuoteOrFormula:
      activeChapter?.quotes?.[0]?.quote || activeChapter?.summary || "WAR IS PEACE • FREEDOM IS SLAVERY • IGNORANCE IS STRENGTH",
    examTip: activeChapter?.examPromptTakeaway || "AO2/AO3: Panoptic surveillance, psychological conditioning & Newspeak erasure.",
    accentColorHex: "#06B6D4",
    secondaryColorHex: "#EF4444",
    telemetryTag: "MINITRUE • SYNCED",
    trigger,
    lastUpdated: Date.now() / 1000 - 978307200,
  });
}

if (typeof window !== "undefined") {
  (window as unknown as { __syncStudyWidget?: (trigger?: string) => void }).__syncStudyWidget = (t) => {
    syncWidgetSnapshot((t as WidgetSyncTrigger) || "init");
  };
}
