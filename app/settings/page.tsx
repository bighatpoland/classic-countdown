"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Panel, PrimaryButton, SectionTitle } from "@/components/ui";
import { useAppStore } from "@/hooks/use-app-store";
import { updateSettings } from "@/lib/app-state";

export default function SettingsPage() {
  const { hydrated, state, updateState } = useAppStore();

  const [formState, setFormState] = useState({
    dailyMinutes: 20,
    newCardsCap: 5,
    srsMinutesCap: 8,
    locale: "es-ES"
  });

  useEffect(() => {
    if (!state) {
      return;
    }

    setFormState(state.settings);
  }, [state]);

  if (!hydrated || !state) {
    return (
      <AppShell subtitle="Ladujemy lokalne ustawienia PWA i limity nauki." title="Settings">
        <Panel>Trwa ladowanie ustawien...</Panel>
      </AppShell>
    );
  }

  return (
    <AppShell subtitle="Tu ustawiasz domyslny rytm dnia, limity nowych kart i tryb solo-local." title="Settings">
      <Panel className="space-y-5">
        <SectionTitle subtitle="Bez konta, bez syncu, wszystko zapisuje sie lokalnie w przegladarce." title="Preferencje MVP" />

        <label className="grid gap-2 text-sm text-shell-mute">
          Dzienny cel minut
          <input
            className="rounded-2xl border border-shell-line bg-shell-soft px-4 py-3 text-base text-shell-ink outline-none focus:border-accent-400"
            min={15}
            onChange={(event) => setFormState((current) => ({ ...current, dailyMinutes: Number(event.target.value) }))}
            type="number"
            value={formState.dailyMinutes}
          />
        </label>

        <label className="grid gap-2 text-sm text-shell-mute">
          Limit nowych kart / dzien
          <input
            className="rounded-2xl border border-shell-line bg-shell-soft px-4 py-3 text-base text-shell-ink outline-none focus:border-accent-400"
            min={1}
            onChange={(event) => setFormState((current) => ({ ...current, newCardsCap: Number(event.target.value) }))}
            type="number"
            value={formState.newCardsCap}
          />
        </label>

        <label className="grid gap-2 text-sm text-shell-mute">
          Cap minut SRS
          <input
            className="rounded-2xl border border-shell-line bg-shell-soft px-4 py-3 text-base text-shell-ink outline-none focus:border-accent-400"
            min={5}
            max={10}
            onChange={(event) => setFormState((current) => ({ ...current, srsMinutesCap: Number(event.target.value) }))}
            type="number"
            value={formState.srsMinutesCap}
          />
        </label>

        <label className="grid gap-2 text-sm text-shell-mute">
          Locale tresci
          <select
            className="rounded-2xl border border-shell-line bg-shell-soft px-4 py-3 text-base text-shell-ink outline-none focus:border-accent-400"
            onChange={(event) => setFormState((current) => ({ ...current, locale: event.target.value }))}
            value={formState.locale}
          >
            <option value="es-ES">es-ES</option>
          </select>
        </label>

        <div className="rounded-3xl border border-shell-line bg-accent-50 p-4 text-sm leading-6 text-shell-mute">
          AI pozostaje opcjonalne. Bez klucza srodowiskowego aplikacja dalej dziala w calosci lokalnie: Today, SRS, Inbox, notes i progress.
        </div>

        <div className="rounded-3xl border border-shell-line bg-white p-4 text-sm leading-6 text-shell-mute">
          Gotowe endpointy AI:
          <br />
          <code>POST /api/ai/prompt</code>
          <br />
          <code>POST /api/ai/feedback</code>
          <br />
          Aktywacja nastepuje tylko przy ustawionym <code>OPENAI_API_KEY</code>.
        </div>

        <PrimaryButton
          onClick={() =>
            updateState((current) =>
              updateSettings(current, {
                dailyMinutes: formState.dailyMinutes,
                newCardsCap: formState.newCardsCap,
                srsMinutesCap: formState.srsMinutesCap,
                locale: formState.locale
              })
            )
          }
        >
          Zapisz ustawienia
        </PrimaryButton>
      </Panel>
    </AppShell>
  );
}
