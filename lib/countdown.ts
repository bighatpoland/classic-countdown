import { DEFAULT_WORK_SCHEDULE } from "@/lib/defaults";
import type { CountdownMode, CountdownState, WorkSchedule } from "@/lib/types";
import { parseTimeToMinutes, toDateAtMinutes } from "@/lib/time";

function sanitizeWorkDays(days: number[]): number[] {
  return Array.from(new Set(days.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6))).sort((a, b) => a - b);
}

export function normalizeSchedule(schedule: WorkSchedule): WorkSchedule {
  const workDays = sanitizeWorkDays(schedule.workDays);

  const startMinutes = parseTimeToMinutes(schedule.startTime);
  const endMinutes = parseTimeToMinutes(schedule.endTime);

  if (Number.isNaN(startMinutes) || Number.isNaN(endMinutes) || endMinutes <= startMinutes || workDays.length === 0) {
    return DEFAULT_WORK_SCHEDULE;
  }

  return {
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    workDays
  };
}

function nextWorkDayEnd(now: Date, schedule: WorkSchedule): Date {
  const endMinutes = parseTimeToMinutes(schedule.endTime);
  for (let offset = 1; offset <= 14; offset += 1) {
    const candidate = new Date(now);
    candidate.setDate(candidate.getDate() + offset);
    if (schedule.workDays.includes(candidate.getDay())) {
      return toDateAtMinutes(candidate, endMinutes);
    }
  }
  return toDateAtMinutes(new Date(now.getTime() + 24 * 3600 * 1000), endMinutes);
}

export function computeCountdownState(now: Date, incomingSchedule: WorkSchedule): CountdownState {
  const schedule = normalizeSchedule(incomingSchedule);
  const startMinutes = parseTimeToMinutes(schedule.startTime);
  const endMinutes = parseTimeToMinutes(schedule.endTime);

  const todayIsWorkDay = schedule.workDays.includes(now.getDay());
  const startOfToday = toDateAtMinutes(now, startMinutes);
  const endOfToday = toDateAtMinutes(now, endMinutes);

  let mode: CountdownMode;
  let target: Date;

  if (todayIsWorkDay) {
    if (now < startOfToday) {
      mode = "before_work";
      target = endOfToday;
    } else if (now < endOfToday) {
      mode = "in_work";
      target = endOfToday;
    } else {
      mode = "after_work";
      target = nextWorkDayEnd(now, schedule);
    }
  } else {
    mode = now.getDay() === 0 || now.getDay() === 6 ? "weekend" : "after_work";
    target = nextWorkDayEnd(now, schedule);
  }

  return {
    mode,
    targetIso: target.toISOString(),
    remainingMs: Math.max(0, target.getTime() - now.getTime())
  };
}
