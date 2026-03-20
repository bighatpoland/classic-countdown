"use client";

import { useEffect, useState, startTransition } from "react";

import { DEFAULT_WORK_SCHEDULE } from "@/lib/defaults";
import { normalizeSchedule } from "@/lib/countdown";
import { readStoredSchedule, storageKey, writeStoredSchedule } from "@/lib/storage";
import type { WorkSchedule } from "@/lib/types";

export function useWorkSchedule() {
  const [schedule, setSchedule] = useState<WorkSchedule>(DEFAULT_WORK_SCHEDULE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const initial = readStoredSchedule();
    setSchedule(initial);
    setLoaded(true);
  }, []);

  useEffect(() => {
    function syncFromStorage(event: StorageEvent) {
      if (event.key !== storageKey()) {
        return;
      }
      startTransition(() => {
        setSchedule(readStoredSchedule());
      });
    }

    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  function updateSchedule(next: WorkSchedule) {
    const normalized = normalizeSchedule(next);
    setSchedule(normalized);
    writeStoredSchedule(normalized);
  }

  return {
    schedule,
    loaded,
    updateSchedule
  };
}
