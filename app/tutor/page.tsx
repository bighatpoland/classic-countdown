"use client";

import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Panel, PrimaryButton, SectionTitle } from "@/components/ui";
import { useAppStore } from "@/hooks/use-app-store";
import { promoteTutorCorrection, saveTutorNote } from "@/lib/app-state";

function splitLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function TutorPage() {
  const { hydrated, state, updateState } = useAppStore();
  const [topic, setTopic] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [corrected, setCorrected] = useState("");

  if (!hydrated || !state) {
    return (
      <AppShell subtitle="Ladujemy plan przygotowania i notatki po lekcji." title="Tutor">
        <Panel>Trwa ladowanie notatek lektorskich...</Panel>
      </AppShell>
    );
  }

  return (
    <AppShell subtitle="Wsparcie lekcji jest lekkie: prep przed spotkaniem i szybki transfer dobrych zdań do SRS." title="Tutor">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <Panel className="space-y-4">
            <SectionTitle subtitle="Przed lekcja chcesz miec kilka tematow i gotowych pytan, zeby wykorzystac czas z lektorem." title="Session prep" />
            <ul className="space-y-3 text-sm leading-6 text-shell-mute">
              <li>• Co chcesz opowiedziec o swoim tygodniu w 3 prostych zdaniach?</li>
              <li>• Jakie pytanie o korekte lub naturalniejsze brzmienie chcesz zadac?</li>
              <li>• Ktore 1-2 laczniki chcesz dzis przetestowac glosno?</li>
            </ul>
          </Panel>

          <Panel className="space-y-4">
            <SectionTitle subtitle="Po lekcji zachowujemy tylko to, co pomoze w kolejnych 48 godzinach." title="Post-lesson notes" />
            <input
              className="w-full rounded-[24px] border border-shell-line bg-shell-soft px-4 py-3 text-base text-shell-ink outline-none focus:border-accent-400"
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Temat lekcji"
              value={topic}
            />
            <textarea
              className="min-h-32 w-full rounded-[24px] border border-shell-line bg-shell-soft px-4 py-4 text-base text-shell-ink outline-none focus:border-accent-400"
              onChange={(event) => setMistakes(event.target.value)}
              placeholder="Bledy, po jednym w linii"
              value={mistakes}
            />
            <textarea
              className="min-h-32 w-full rounded-[24px] border border-shell-line bg-shell-soft px-4 py-4 text-base text-shell-ink outline-none focus:border-accent-400"
              onChange={(event) => setCorrected(event.target.value)}
              placeholder="Poprawne zdania, po jednym w linii"
              value={corrected}
            />
            <PrimaryButton
              onClick={() => {
                updateState((current) => saveTutorNote(current, topic || "Lekcja", splitLines(mistakes), splitLines(corrected)));
                setTopic("");
                setMistakes("");
                setCorrected("");
              }}
            >
              Zapisz notatke
            </PrimaryButton>
          </Panel>
        </div>

        <Panel className="space-y-4">
          <SectionTitle subtitle="Kazda dobra korekta moze trafic prosto do pipeline albo do nowych kart." title="Twoje notatki" />
          <div className="space-y-4">
            {state.tutorNotes.map((note) => (
              <article className="rounded-[28px] border border-shell-line bg-white p-4" key={note.id}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-shell-mute">{note.topic}</p>
                <div className="mt-3 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-shell-ink">Bledy</p>
                    <ul className="mt-2 space-y-2 text-sm leading-6 text-shell-mute">
                      {note.mistakes.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-shell-ink">Poprawne wersje</p>
                    <div className="mt-2 space-y-2">
                      {note.correctedForms.map((item) => {
                        const promoted = note.promotedToCards.includes(item);
                        return (
                          <div className="rounded-2xl bg-shell-soft p-3" key={item}>
                            <p className="text-sm font-medium text-shell-ink">{item}</p>
                            <button
                              className="mt-2 rounded-full border border-shell-line px-4 py-2 text-sm font-medium text-shell-ink hover:bg-white disabled:opacity-50"
                              disabled={promoted}
                              onClick={() => updateState((current) => promoteTutorCorrection(current, note.id, item))}
                              type="button"
                            >
                              {promoted ? "Juz w SRS" : "Dodaj do SRS"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
