"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { Panel, PrimaryButton, SectionTitle, StatChip } from "@/components/ui";
import { useAppStore } from "@/hooks/use-app-store";
import { completeTodayStep, getDueCards, getTodayLog, promotePhraseToCard, recordReview } from "@/lib/app-state";
import { canCreateNewCards } from "@/lib/srs";

export default function StudySrsPage() {
  const { hydrated, state, updateState } = useAppStore();
  const [revealed, setRevealed] = useState(false);
  const [startedAt, setStartedAt] = useState(Date.now());

  useEffect(() => {
    setStartedAt(Date.now());
    setRevealed(false);
  }, [state?.reviews.length]);

  if (!hydrated || !state) {
    return (
      <AppShell subtitle="Ladujemy kolejke review i limity nowych kart." title="SRS">
        <Panel>Trwa ladowanie kolejki...</Panel>
      </AppShell>
    );
  }

  const dueCards = getDueCards(state);
  const currentCard = dueCards[0];
  const todayLog = getTodayLog(state);
  const canAddNew = canCreateNewCards(state.cards, state.settings, todayLog.newCount);
  const captured = state.phraseInbox.filter((item) => item.status === "captured").slice(0, 3);

  return (
    <AppShell subtitle="Tylko produkcja: prompt po polsku, odpowiedz po hiszpansku. Bez niekontrolowanego wzrostu backlogu." title="SRS">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Panel className="space-y-4">
          <SectionTitle subtitle="Najpierw review, potem ewentualnie kilka nowych kart z inboxu." title="Kolejka review" />
          <div className="grid grid-cols-3 gap-3">
            <StatChip label="Due now" tone="warm" value={dueCards.length} />
            <StatChip label="New dzis" value={todayLog.newCount} />
            <StatChip label="Review dzis" tone="accent" value={todayLog.reviewCount} />
          </div>

          {currentCard ? (
            <div className="space-y-4 rounded-[30px] bg-shell-soft p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-shell-mute">Prompt PL</p>
                <h3 className="mt-2 text-2xl font-semibold text-shell-ink">{currentCard.promptPl}</h3>
              </div>

              {revealed ? (
                <div className="rounded-[24px] border border-shell-line bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-shell-mute">Odpowiedz ES</p>
                  <p className="mt-2 text-xl font-semibold text-shell-ink">{currentCard.answerEs}</p>
                </div>
              ) : (
                <PrimaryButton onClick={() => setRevealed(true)}>Pokaz odpowiedz</PrimaryButton>
              )}

              {revealed ? (
                <div className="space-y-3">
                  <p className="text-sm leading-6 text-shell-mute">Oceń odpowiedz zgodnie z tym, jak szybko i pewnie przyszla ci produkcja.</p>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {[0, 1, 2, 3, 4, 5].map((grade) => (
                      <button
                        className="rounded-2xl border border-shell-line bg-white px-3 py-3 text-sm font-semibold text-shell-ink hover:bg-accent-50"
                        key={grade}
                        onClick={() =>
                          updateState((current) => recordReview(current, currentCard.id, grade as 0 | 1 | 2 | 3 | 4 | 5, Date.now() - startedAt))
                        }
                        type="button"
                      >
                        {grade}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-shell-line bg-shell-soft p-5 text-sm leading-6 text-shell-mute">
              Kolejka review jest pusta. To dobry moment na zamkniecie bloku SRS albo dodanie kilku nowych kart z inboxu, jesli backlog nie jest przeciazony.
            </div>
          )}

          <PrimaryButton onClick={() => updateState((current) => completeTodayStep(current, "srs"))}>Oznacz blok SRS jako zrobiony</PrimaryButton>
        </Panel>

        <div className="space-y-4">
          <Panel className="space-y-4">
            <SectionTitle subtitle="Przeciążenie review blokuje nowe karty automatycznie." title="Nowe karty" />
            <p className="text-sm leading-6 text-shell-mute">
              {canAddNew
                ? `Mozesz jeszcze dodac ${Math.max(state.settings.newCardsCap - todayLog.newCount, 0)} kart(y) dzisiaj.`
                : "Nowe karty sa zablokowane. Najpierw odciaz review queue."}
            </p>
            <div className="space-y-3">
              {captured.length === 0 ? (
                <p className="text-sm leading-6 text-shell-mute">Brak fraz oczekujacych na awans do SRS.</p>
              ) : (
                captured.map((phrase) => (
                  <div className="rounded-3xl bg-shell-soft p-4" key={phrase.id}>
                    <p className="text-base font-semibold text-shell-ink">{phrase.textEs}</p>
                    <p className="mt-1 text-sm text-shell-mute">Zrodlo: {phrase.source}</p>
                    <button
                      className="mt-3 rounded-full border border-shell-line px-4 py-2 text-sm font-medium text-shell-ink hover:bg-white disabled:opacity-50"
                      disabled={!canAddNew}
                      onClick={() => updateState((current) => promotePhraseToCard(current, phrase.id))}
                      type="button"
                    >
                      Zamien w karte
                    </button>
                  </div>
                ))
              )}
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
