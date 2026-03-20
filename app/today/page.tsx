"use client";

import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { ActionLink, Eyebrow, Panel, PrimaryButton, ProgressBar, SectionTitle, StatChip, TogglePill } from "@/components/ui";
import { useAppStore } from "@/hooks/use-app-store";
import { getTodayLog, setTodayMode, setTodayTemplate, toggleTodayStep, updateDailyReflection } from "@/lib/app-state";
import { formatLongDate } from "@/lib/date";

export default function TodayPage() {
  const { hydrated, state, derived, updateState } = useAppStore();

  if (!hydrated || !state || !derived) {
    return (
      <AppShell subtitle="Przygotowujemy dzienny plan, kolejke SRS i twoje ostatnie notatki." title="Today">
        <Panel>Trwa ladowanie planu dnia...</Panel>
      </AppShell>
    );
  }

  const { today, dashboard } = derived;
  const todayLog = getTodayLog(state);
  const totalPlanned = today.steps.reduce((sum, step) => sum + step.minutes, 0);

  return (
    <AppShell subtitle="Jedna klarowna sesja dzienna: SRS, latwy input i blok mowienia dopasowany do trybu quiet albo voice." title="Today">
      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
        <Panel className="space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-2">
              <Eyebrow>{formatLongDate(today.date)}</Eyebrow>
              <SectionTitle subtitle="Twoj rytm dnia jest celowo maly, zeby utrzymac regularnosc bez rozjechania backlogu." title="Plan dnia" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <StatChip label="Review due" tone="warm" value={dashboard.dueCards.length} />
              <StatChip label="Dzisiaj" tone="accent" value={`${today.completedCount}/${today.steps.length}`} />
            </div>
          </div>

          <div className="space-y-3 rounded-[28px] bg-shell-soft p-4">
            <div className="flex flex-wrap gap-2">
              <TogglePill active={today.mode === "quiet"} label="Quiet / public" onClick={() => updateState((current) => setTodayMode(current, "quiet"))} />
              <TogglePill active={today.mode === "voice"} label="Voice / private" onClick={() => updateState((current) => setTodayMode(current, "voice"))} />
            </div>

            <div className="flex flex-wrap gap-2">
              <TogglePill active={today.template === "standard"} label="Standard 20 min" onClick={() => updateState((current) => setTodayTemplate(current, "standard"))} />
              <TogglePill active={today.template === "minimum"} label="Minimum 5+5+5" onClick={() => updateState((current) => setTodayTemplate(current, "minimum"))} />
            </div>
          </div>

          <ProgressBar max={today.steps.length} value={today.completedCount} />

          <div className="space-y-3">
            {today.steps.map((step) => (
              <div className="rounded-[28px] border border-shell-line bg-white p-4" key={step.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-shell-ink">{step.title}</h3>
                      <span className="rounded-full bg-shell-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-shell-mute">{step.minutes} min</span>
                    </div>
                    <p className="text-sm leading-6 text-shell-mute">{step.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link className="rounded-full border border-shell-line px-4 py-2 text-sm font-medium text-shell-ink hover:bg-shell-soft" href={step.route}>
                      Otworz
                    </Link>
                    <button
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${step.completed ? "bg-accent-100 text-shell-ink" : "bg-shell-ink text-white"}`}
                      onClick={() => updateState((current) => toggleTodayStep(current, step.id))}
                      type="button"
                    >
                      {step.completed ? "Cofnij" : "Zrobione"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="rounded-[28px] border border-shell-line bg-white p-4 text-sm text-shell-mute">
              Stres
              <input
                className="mt-3 w-full accent-[#dc7c38]"
                max={5}
                min={1}
                onChange={(event) => updateState((current) => updateDailyReflection(current, { stress: Number(event.target.value), confidence: todayLog.confidence }))}
                type="range"
                value={todayLog.stress}
              />
              <span className="mt-2 block text-base font-semibold text-shell-ink">{todayLog.stress}/5</span>
            </label>

            <label className="rounded-[28px] border border-shell-line bg-white p-4 text-sm text-shell-mute">
              Pewnosc
              <input
                className="mt-3 w-full accent-[#24313c]"
                max={5}
                min={1}
                onChange={(event) => updateState((current) => updateDailyReflection(current, { stress: todayLog.stress, confidence: Number(event.target.value) }))}
                type="range"
                value={todayLog.confidence}
              />
              <span className="mt-2 block text-base font-semibold text-shell-ink">{todayLog.confidence}/5</span>
            </label>
          </div>
        </Panel>

        <div className="space-y-4">
          <Panel className="space-y-4">
            <SectionTitle subtitle="Ten panel zbiera minimum potrzebne do oceny dnia bez rozbudowanej analityki." title="Dzisiejszy log" />
            <div className="grid grid-cols-2 gap-3">
              <StatChip label="Minuty" value={todayLog.totalMin} />
              <StatChip label="Review" value={todayLog.reviewCount} />
              <StatChip label="New" value={todayLog.newCount} />
              <StatChip label="Spoke" value={todayLog.spoke ? "Tak" : "Nie"} />
            </div>
            <p className="text-sm leading-6 text-shell-mute">
              Szablon dnia: <strong>{today.template === "standard" ? `${totalPlanned} minut` : "minimum viable day"}</strong>. Status:{" "}
              <strong>{todayLog.completed ? "dzien domkniety" : "w toku"}</strong>.
            </p>
          </Panel>

          <Panel className="space-y-4">
            <SectionTitle subtitle="Nowe karty sa blokowane, kiedy review backlog robi sie zbyt duzy." title="SRS pressure" />
            <p className="text-sm leading-6 text-shell-mute">
              {dashboard.backlogBlocked
                ? "Backlog jest przeciążony, więc dzisiaj skupiamy sie na review i mowieniu."
                : "Mozesz dorzucic kilka nowych kart, ale trzymaj sie dziennego limitu."}
            </p>
            <ActionLink href="/study/srs">Przejdz do kolejki review</ActionLink>
          </Panel>

          <Panel className="space-y-4">
            <SectionTitle subtitle="Frazy z pipeline powinny zostac uzyte glosno w ciagu 48h." title="Recycle reminders" />
            {dashboard.recycleCandidates.length === 0 ? (
              <p className="text-sm leading-6 text-shell-mute">Brak pilnych fraz do odzyskania glosowo.</p>
            ) : (
              <div className="space-y-3">
                {dashboard.recycleCandidates.map((item) => (
                  <div className="rounded-3xl bg-shell-soft p-4" key={item.id}>
                    <p className="text-base font-semibold text-shell-ink">{item.textEs}</p>
                    <p className="mt-1 text-sm text-shell-mute">
                      Zrodlo: {item.source} • status: {item.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <ActionLink href="/inbox">Otworz inbox</ActionLink>
          </Panel>

          <PrimaryButton onClick={() => updateState((current) => setTodayTemplate(current, "minimum"))}>Przelacz na minimum viable day</PrimaryButton>
        </div>
      </div>
    </AppShell>
  );
}
