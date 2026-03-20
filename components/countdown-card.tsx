"use client";

import Link from "next/link";

import type { CountdownState, WorkSchedule } from "@/lib/types";
import { formatRemainingTime } from "@/lib/time";

type CountdownCardProps = {
  state: CountdownState;
  schedule: WorkSchedule;
  now: Date;
};

function modeLabel(mode: CountdownState["mode"]): string {
  switch (mode) {
    case "before_work":
      return "Before work";
    case "in_work":
      return "In work";
    case "after_work":
      return "After work";
    case "weekend":
      return "Weekend";
    default:
      return mode;
  }
}

function weekdayLabel(value: number): string {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][value] ?? "?";
}

function formatTarget(targetIso: string): string {
  const date = new Date(targetIso);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

export function CountdownCard({ state, schedule, now }: CountdownCardProps) {
  return (
    <section aria-labelledby="countdown-heading" className="space-y-4">
      <div className="rounded border border-applus-border bg-white p-4 shadow-panel">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-applus-border pb-3">
          <h1 className="text-lg font-semibold text-applus-text" id="countdown-heading">
            Workday countdown
          </h1>
          <span className="rounded bg-blue-100 px-3 py-1 text-xs font-medium text-applus-blue">{modeLabel(state.mode)}</span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm text-slate-600">Time remaining to end of current/next workday</p>
            <p className="mt-2 font-mono text-4xl font-semibold tracking-wide text-applus-text sm:text-5xl">{formatRemainingTime(state.remainingMs)}</p>
          </div>
          <Link className="inline-flex h-10 items-center rounded border border-applus-border px-4 text-sm font-medium text-applus-text hover:bg-slate-100" href="/settings">
            Open settings
          </Link>
        </div>

        <div className="mt-5 grid gap-3 rounded border border-applus-border bg-slate-50 p-3 text-sm text-applus-text md:grid-cols-2">
          <p>
            <span className="font-medium">Current time:</span> {now.toLocaleString("en-GB", { hour12: false })}
          </p>
          <p>
            <span className="font-medium">Target:</span> {formatTarget(state.targetIso)}
          </p>
          <p>
            <span className="font-medium">Start:</span> {schedule.startTime}
          </p>
          <p>
            <span className="font-medium">End:</span> {schedule.endTime}
          </p>
          <p className="md:col-span-2">
            <span className="font-medium">Working days:</span> {schedule.workDays.map(weekdayLabel).join(", ")}
          </p>
        </div>
      </div>
    </section>
  );
}

