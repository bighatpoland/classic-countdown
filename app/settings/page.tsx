"use client";

import { ApplusShell } from "@/components/applus-shell";
import { SettingsForm } from "@/components/settings-form";
import { useWorkSchedule } from "@/hooks/use-work-schedule";

export default function SettingsPage() {
  const { loaded, schedule, updateSchedule } = useWorkSchedule();

  return (
    <ApplusShell activeRoute="/settings" title="Sub page 2">
      {!loaded ? (
        <div className="rounded border border-applus-border bg-white p-4 text-sm text-slate-600">Loading settings...</div>
      ) : (
        <SettingsForm onSave={updateSchedule} schedule={schedule} />
      )}
    </ApplusShell>
  );
}
