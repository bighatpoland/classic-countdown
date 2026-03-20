import type { WorkSchedule } from "@/lib/types";

export const DEFAULT_WORK_SCHEDULE: WorkSchedule = {
  startTime: "09:00",
  endTime: "17:00",
  workDays: [1, 2, 3, 4, 5]
};

export const DAY_LABELS: Array<{ value: number; label: string }> = [
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
  { value: 0, label: "Sun" }
];

