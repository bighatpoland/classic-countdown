"use client";

import { AppShell } from "@/components/app-shell";
import { Panel, SectionTitle, StatChip } from "@/components/ui";
import { useAppStore } from "@/hooks/use-app-store";
import { getSnapshotTargets, getWeeklyLogs } from "@/lib/app-state";
import { formatShortDate } from "@/lib/date";

export default function ProgressPage() {
  const { hydrated, state } = useAppStore();

  if (!hydrated || !state) {
    return (
      <AppShell subtitle="Ladujemy logi dzienne i snapshoty mowienia." title="Progress">
        <Panel>Trwa ladowanie progresu...</Panel>
      </AppShell>
    );
  }

  const weeklyLogs = getWeeklyLogs(state);
  const snapshots = getSnapshotTargets(state);
  const totalReview = weeklyLogs.reduce((sum, entry) => sum + entry.reviewCount, 0);
  const totalMinutes = weeklyLogs.reduce((sum, entry) => sum + entry.totalMin, 0);
  const spokeDays = weeklyLogs.filter((entry) => entry.spoke).length;

  return (
    <AppShell subtitle="W MVP mierzymy regularnosc, obciazenie SRS i czy mowienie faktycznie wydarza sie w tygodniu." title="Progress">
      <div className="space-y-4">
        <Panel className="space-y-4">
          <SectionTitle subtitle="To jest lekki widok trendow tygodniowych zamiast pelnego dashboardu." title="Ostatnie 7 dni" />
          <div className="grid gap-3 sm:grid-cols-3">
            <StatChip label="Minuty" value={totalMinutes} />
            <StatChip label="Review" tone="warm" value={totalReview} />
            <StatChip label="Dni z mowa" tone="accent" value={spokeDays} />
          </div>

          <div className="space-y-3">
            {weeklyLogs.map((entry) => (
              <div className="rounded-[28px] bg-shell-soft p-4" key={entry.date}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-shell-ink">{formatShortDate(entry.date)}</p>
                    <p className="text-sm text-shell-mute">
                      {entry.totalMin} min • review {entry.reviewCount} • new {entry.newCount}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-shell-mute">
                    {entry.spoke ? "spoke" : "quiet only"} • stres {entry.stress}/5 • pewnosc {entry.confidence}/5
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="space-y-4">
          <SectionTitle subtitle="Snapshoty 1 / 7 / 14 pozwalaja szybko sprawdzic, czy wypowiedz staje sie plynniejsza i pewniejsza." title="Speaking snapshots" />
          <div className="grid gap-3 md:grid-cols-3">
            {snapshots.map((snapshot) => (
              <div className="rounded-[28px] border border-shell-line bg-white p-4" key={snapshot.day}>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shell-mute">Day {snapshot.day}</p>
                <p className="mt-2 text-lg font-semibold text-shell-ink">{snapshot.session ? "Zapisany" : snapshot.due ? "Do wykonania" : "Jeszcze nie"}</p>
                <p className="mt-2 text-sm leading-6 text-shell-mute">
                  {snapshot.session
                    ? `Sesja ${snapshot.session.durationMin} min • confidence ${snapshot.session.selfScores.confidence}/5`
                    : snapshot.due
                      ? "Wykonaj krotkie nagranie i zachowaj self-check."
                      : "Snapshot odblokuje sie pozniej w pilocie."}
                </p>
                {snapshot.session?.audioRef ? <audio className="mt-3 w-full" controls src={snapshot.session.audioRef} /> : null}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
