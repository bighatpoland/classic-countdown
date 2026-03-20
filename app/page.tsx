"use client";

import { ApplusShell } from "@/components/applus-shell";
import { CountdownCard } from "@/components/countdown-card";
import { useCountdown } from "@/hooks/use-countdown";
import { useWorkSchedule } from "@/hooks/use-work-schedule";

export default function CountdownPage() {
  const { schedule, loaded } = useWorkSchedule();
  const { now, state } = useCountdown(schedule);

  return (
    <ApplusShell activeRoute="/" title="Sub page 2">
      {!loaded ? (
        <div className="rounded border border-applus-border bg-white p-4 text-sm text-slate-600">Loading schedule...</div>
      ) : (
        <CountdownCard now={now} schedule={schedule} state={state} />
      )}
    </ApplusShell>
  );
}

