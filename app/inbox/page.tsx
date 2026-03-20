"use client";

import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Panel, PrimaryButton, SectionTitle } from "@/components/ui";
import { useAppStore } from "@/hooks/use-app-store";
import { capturePhrase, getRecycleCandidates, markPhraseSpoken, promotePhraseToCard } from "@/lib/app-state";

export default function InboxPage() {
  const { hydrated, state, updateState } = useAppStore();
  const [draft, setDraft] = useState("");

  if (!hydrated || !state) {
    return (
      <AppShell subtitle="Ladujemy inbox fraz i pipeline Notice → Capture → Say." title="Inbox">
        <Panel>Trwa ladowanie inboxu...</Panel>
      </AppShell>
    );
  }

  const recycleCandidates = getRecycleCandidates(state);

  return (
    <AppShell subtitle="Inbox ma byc szybki, bez tarcia: capture w sekundach, a potem jedno klikniecie do SRS albo spoken." title="Inbox">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <Panel className="space-y-4">
            <SectionTitle subtitle="Dodawaj tylko frazy, ktore realnie wyobrazasz sobie powiedziec w tym tygodniu." title="Quick capture" />
            <textarea
              className="min-h-40 w-full rounded-[28px] border border-shell-line bg-shell-soft px-4 py-4 text-base text-shell-ink outline-none focus:border-accent-400"
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Np. Hoy quiero hablar un poco mas despacio."
              value={draft}
            />
            <PrimaryButton
              onClick={() => {
                updateState((current) => capturePhrase(current, draft, "inbox"));
                setDraft("");
              }}
            >
              Dodaj fraze
            </PrimaryButton>
          </Panel>

          <Panel className="space-y-4">
            <SectionTitle subtitle="To jest anty-passive guard: frazy powinny wyjsc poza samo zapisanie." title="Recycle task" />
            {recycleCandidates.length === 0 ? (
              <p className="text-sm leading-6 text-shell-mute">Nic nie czeka na szybkie odzyskanie glosowo w ciagu 48h.</p>
            ) : (
              recycleCandidates.map((item) => (
                <div className="rounded-[28px] bg-shell-soft p-4" key={item.id}>
                  <p className="text-base font-semibold text-shell-ink">{item.textEs}</p>
                  <p className="mt-1 text-sm text-shell-mute">Status: {item.status}</p>
                </div>
              ))
            )}
          </Panel>
        </div>

        <Panel className="space-y-4">
          <SectionTitle subtitle="Pipeline jest prosty: captured → carded → spoken." title="Frazy" />
          <div className="space-y-3">
            {state.phraseInbox.map((item) => (
              <div className="rounded-[28px] border border-shell-line bg-white p-4" key={item.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-shell-ink">{item.textEs}</p>
                    <p className="mt-1 text-sm text-shell-mute">
                      {item.source} • {item.status}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="rounded-full border border-shell-line px-4 py-2 text-sm font-medium text-shell-ink hover:bg-shell-soft"
                      onClick={() => updateState((current) => promotePhraseToCard(current, item.id))}
                      type="button"
                    >
                      To SRS
                    </button>
                    <button
                      className="rounded-full border border-shell-line px-4 py-2 text-sm font-medium text-shell-ink hover:bg-shell-soft"
                      onClick={() => updateState((current) => markPhraseSpoken(current, item.id))}
                      type="button"
                    >
                      Mark spoken
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
