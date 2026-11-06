"use client";

import { useEffect, useRef } from "react";
import { useStudyStore } from "@/store/useStudyStore";
import { syncWidgetSnapshot } from "@/lib/widgetBridge";

export function WidgetBridge() {
  const lastStateKeyRef = useRef<string>("");

  useEffect(() => {
    // 1. Initial snapshot on mount
    syncWidgetSnapshot("init");

    // 2. React to store updates with instant push
    const unsubscribe = useStudyStore.subscribe((currState) => {
      const activeId = currState.activeChapterId;
      const completedCount = Object.values(currState.completedChapters || {}).filter(Boolean).length;
      const stateKey = `${activeId}:${completedCount}`;

      if (stateKey !== lastStateKeyRef.current) {
        lastStateKeyRef.current = stateKey;
        syncWidgetSnapshot("state-change");
      }
    });

    // 3. Heartbeat sync every 4 seconds to guarantee desktop widget freshness
    const heartbeat = setInterval(() => {
      syncWidgetSnapshot("heartbeat");
    }, 4000);

    return () => {
      unsubscribe();
      clearInterval(heartbeat);
    };
  }, []);

  return null;
}
