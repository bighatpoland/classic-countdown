import { DEFAULT_WORK_SCHEDULE } from "@/lib/defaults";
import { normalizeSchedule } from "@/lib/countdown";
import type { WorkSchedule } from "@/lib/types";

const STORAGE_KEY = "classic-countdown.work-schedule.v1";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readStoredSchedule(): WorkSchedule {
  if (!canUseStorage()) {
    return DEFAULT_WORK_SCHEDULE;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return DEFAULT_WORK_SCHEDULE;
  }

  try {
    const parsed = JSON.parse(raw) as WorkSchedule;
    return normalizeSchedule(parsed);
  } catch {
    return DEFAULT_WORK_SCHEDULE;
  }
}

export function writeStoredSchedule(schedule: WorkSchedule): void {
  if (!canUseStorage()) {
    return;
  }
  const normalized = normalizeSchedule(schedule);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

export function storageKey(): string {
  return STORAGE_KEY;
}

