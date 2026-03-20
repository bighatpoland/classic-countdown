"use client";

import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Panel, PrimaryButton, SectionTitle } from "@/components/ui";
import { useAppStore } from "@/hooks/use-app-store";
import { completeTodayStep, capturePhrase } from "@/lib/app-state";
import { INPUT_LIBRARY, SPEAK_PROMPTS } from "@/lib/defaults";

export default function StudyInputPage() {
  const { hydrated, state, updateState } = useAppStore();
  const [captureText, setCaptureText] = useState("");

  if (!hydrated || !state) {
    return (
      <AppShell subtitle="Ladujemy biblioteke latwych materialow i phrase pipeline." title="Input">
        <Panel>Trwa ladowanie materialow...</Panel>
      </AppShell>
    );
  }

  return (
    <AppShell subtitle="Bardzo latwy input, kilka dobrych fraz, a potem szybkie przejscie do mowienia lub cichego retellu." title="Input">
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Panel className="space-y-4">
          <SectionTitle subtitle="Zamiast gonic za nowoscia, wybieramy krotkie materialy, ktore latwo powtorzyc i przetworzyc na mowienie." title="Biblioteka materialow" />
          <div className="space-y-3">
            {INPUT_LIBRARY.map((item) => (
              <article className="rounded-[28px] border border-shell-line bg-shell-soft p-4" key={item.id}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-shell-mute">
                      {item.kind} • {item.level} • {item.durationMin} min
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-shell-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-shell-mute">{item.summary}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.phrases.map((phrase) => (
                    <button
                      className="rounded-full border border-shell-line bg-white px-3 py-2 text-sm text-shell-ink hover:bg-accent-50"
                      key={phrase}
                      onClick={() => updateState((current) => capturePhrase(current, phrase, item.id))}
                      type="button"
                    >
                      Capture: {phrase}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <PrimaryButton onClick={() => updateState((current) => completeTodayStep(current, "input"))}>Oznacz blok input jako zrobiony</PrimaryButton>
        </Panel>

        <div className="space-y-4">
          <Panel className="space-y-4">
            <SectionTitle subtitle="Manualny capture powinien byc szybki i bez edytora pelnoekranowego." title="Quick capture" />
            <textarea
              className="min-h-32 w-full rounded-[28px] border border-shell-line bg-shell-soft px-4 py-4 text-base text-shell-ink outline-none focus:border-accent-400"
              onChange={(event) => setCaptureText(event.target.value)}
              placeholder="Wklej fraze, ktora chcesz przerobic na mowienie lub karte..."
              value={captureText}
            />
            <PrimaryButton
              onClick={() => {
                updateState((current) => capturePhrase(current, captureText, "quick-capture"));
                setCaptureText("");
              }}
            >
              Dodaj do inboxu
            </PrimaryButton>
          </Panel>

          <Panel className="space-y-4">
            <SectionTitle subtitle="Tematy tygodnia pozniej trafiaja do bloku Speak albo Session Prep." title="Tematy do retellu" />
            <div className="space-y-3">
              {SPEAK_PROMPTS.map((prompt) => (
                <div className="rounded-3xl bg-shell-soft p-4" key={prompt.id}>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shell-mute">{prompt.topic}</p>
                  <p className="mt-2 text-base font-semibold text-shell-ink">{prompt.prompt}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
