"use client";

import { useState } from "react";

import { AppShell } from "@/components/app-shell";
import { VoiceRecorder } from "@/components/voice-recorder";
import { Panel, PrimaryButton, SectionTitle, TogglePill } from "@/components/ui";
import { useAppStore } from "@/hooks/use-app-store";
import { completeTodayStep, getTodayPlanView, saveSpeakingSession, setTodayMode } from "@/lib/app-state";
import { SPEAK_PROMPTS } from "@/lib/defaults";

export default function StudySpeakPage() {
  const { hydrated, state, updateState } = useAppStore();
  const [selectedPromptId, setSelectedPromptId] = useState(SPEAK_PROMPTS[0].id);
  const [audioRef, setAudioRef] = useState<string>();
  const [durationMin, setDurationMin] = useState(7);
  const [scores, setScores] = useState({
    stumbles: 3,
    connectors: 3,
    clarity: 3,
    confidence: 3
  });
  const [aiPromptText, setAiPromptText] = useState("");
  const [transcript, setTranscript] = useState("");
  const [aiFeedbackText, setAiFeedbackText] = useState("");
  const [aiPromptLoading, setAiPromptLoading] = useState(false);
  const [aiFeedbackLoading, setAiFeedbackLoading] = useState(false);

  if (!hydrated || !state) {
    return (
      <AppShell subtitle="Ladujemy prompty mowione i lokalne nagranie." title="Speak">
        <Panel>Trwa ladowanie promptow...</Panel>
      </AppShell>
    );
  }

  const today = getTodayPlanView(state);
  const selectedPrompt = SPEAK_PROMPTS.find((prompt) => prompt.id === selectedPromptId) ?? SPEAK_PROMPTS[0];
  const recentPhrases = state.phraseInbox.slice(0, 3).map((item) => item.textEs);

  async function handleAiPrompt() {
    setAiPromptLoading(true);

    try {
      const response = await fetch("/api/ai/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          topic: selectedPrompt.topic,
          mode: today.mode,
          recentPhrases
        })
      });

      const data = (await response.json()) as { text?: string };
      setAiPromptText(data.text ?? "Brak odpowiedzi AI.");
    } catch {
      setAiPromptText("Nie udalo sie pobrac promptu AI.");
    } finally {
      setAiPromptLoading(false);
    }
  }

  async function handleAiFeedback() {
    setAiFeedbackLoading(true);

    try {
      const response = await fetch("/api/ai/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: transcript,
          focus: "plynnosc, naturalnosc, przydatne korekty pod mowienie"
        })
      });

      const data = (await response.json()) as { text?: string };
      setAiFeedbackText(data.text ?? "Brak odpowiedzi AI.");
    } catch {
      setAiFeedbackText("Nie udalo sie pobrac feedbacku AI.");
    } finally {
      setAiFeedbackLoading(false);
    }
  }

  return (
    <AppShell subtitle="Blok mowienia jest prosty: prompt, glos albo cichy retell, a potem szybki self-check." title="Speak">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel className="space-y-4">
          <SectionTitle subtitle="Tryb dnia wplywa tylko na formę wykonania, nie na glowny cel: aktywne wydobycie i uzycie fraz." title="Prompt dnia" />

          <div className="flex flex-wrap gap-2">
            <TogglePill active={today.mode === "quiet"} label="Quiet / public" onClick={() => updateState((current) => setTodayMode(current, "quiet"))} />
            <TogglePill active={today.mode === "voice"} label="Voice / private" onClick={() => updateState((current) => setTodayMode(current, "voice"))} />
          </div>

          <div className="grid gap-3">
            {SPEAK_PROMPTS.map((prompt) => (
              <button
                className={`rounded-[28px] border px-4 py-4 text-left ${selectedPromptId === prompt.id ? "border-accent-400 bg-accent-50" : "border-shell-line bg-shell-soft"}`}
                key={prompt.id}
                onClick={() => setSelectedPromptId(prompt.id)}
                type="button"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-shell-mute">{prompt.topic}</p>
                <p className="mt-2 text-base font-semibold text-shell-ink">{prompt.prompt}</p>
              </button>
            ))}
          </div>

          <div className="rounded-[28px] bg-shell-soft p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-shell-mute">Support</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-shell-mute">
              {selectedPrompt.support.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-shell-line bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-shell-ink">Opcjonalny prompt AI</p>
                <p className="mt-1 text-sm leading-6 text-shell-mute">Jesli klucz srodowiskowy nie jest ustawiony, aplikacja po prostu odda lokalny fallback.</p>
              </div>
              <PrimaryButton disabled={aiPromptLoading} onClick={handleAiPrompt}>
                {aiPromptLoading ? "Generowanie..." : "Wygeneruj"}
              </PrimaryButton>
            </div>
            {aiPromptText ? <div className="mt-4 rounded-[24px] bg-shell-soft p-4 text-sm leading-6 text-shell-mute whitespace-pre-wrap">{aiPromptText}</div> : null}
          </div>

          {today.mode === "voice" ? <VoiceRecorder onRecordingReady={setAudioRef} /> : null}

          {today.mode === "quiet" ? (
            <div className="rounded-[28px] border border-shell-line bg-shell-soft p-4 text-sm leading-6 text-shell-mute">
              W trybie quiet skup sie na cichym retellu lub odpowiadaniu po cichu. Mozesz mimo to zapisac self-check i oznaczyc blok jako wykonany.
            </div>
          ) : null}
        </Panel>

        <Panel className="space-y-4">
          <SectionTitle subtitle="Self-check jest krótki i praktyczny: ma wspierac regularnosc, a nie perfekcjonizm." title="Po wypowiedzi" />

          <label className="grid gap-2 text-sm text-shell-mute">
            Dlugosc bloku (min)
            <input
              className="rounded-2xl border border-shell-line bg-shell-soft px-4 py-3 text-base text-shell-ink outline-none focus:border-accent-400"
              max={20}
              min={3}
              onChange={(event) => setDurationMin(Number(event.target.value))}
              type="number"
              value={durationMin}
            />
          </label>

          {[
            { key: "stumbles", label: "Zaciecia" },
            { key: "connectors", label: "Laczniki" },
            { key: "clarity", label: "Zrozumialosc" },
            { key: "confidence", label: "Pewnosc" }
          ].map((item) => (
            <label className="block rounded-[24px] bg-shell-soft p-4 text-sm text-shell-mute" key={item.key}>
              {item.label}
              <input
                className="mt-3 w-full accent-[#24313c]"
                max={5}
                min={1}
                onChange={(event) => setScores((current) => ({ ...current, [item.key]: Number(event.target.value) }))}
                type="range"
                value={scores[item.key as keyof typeof scores]}
              />
              <span className="mt-2 block text-base font-semibold text-shell-ink">{scores[item.key as keyof typeof scores]}/5</span>
            </label>
          ))}

          <div className="flex flex-wrap gap-3">
            <PrimaryButton
              onClick={() =>
                updateState((current) =>
                  saveSpeakingSession(current, {
                    promptId: selectedPrompt.id,
                    mode: today.mode,
                    durationMin,
                    audioRef,
                    selfScores: scores
                  })
                )
              }
            >
              Zapisz sesje
            </PrimaryButton>
            <button
              className="rounded-full border border-shell-line px-4 py-2 text-sm font-medium text-shell-ink hover:bg-shell-soft"
              onClick={() => updateState((current) => completeTodayStep(current, "speak"))}
              type="button"
            >
              Oznacz blok jako zrobiony
            </button>
          </div>

          <div className="rounded-[28px] border border-shell-line bg-white p-4">
            <p className="text-sm font-semibold text-shell-ink">Opcjonalny feedback AI do transkrypcji</p>
            <p className="mt-1 text-sm leading-6 text-shell-mute">Wklej swoja transkrypcje albo kilka zdan po sesji. Bez klucza AI zostanie zwrocona podpowiedz lokalna.</p>
            <textarea
              className="mt-4 min-h-32 w-full rounded-[24px] border border-shell-line bg-shell-soft px-4 py-4 text-base text-shell-ink outline-none focus:border-accent-400"
              onChange={(event) => setTranscript(event.target.value)}
              placeholder="Np. Hoy quiero hablar de mi rutina y explicar por que me cuesta hablar mas despacio..."
              value={transcript}
            />
            <div className="mt-4">
              <PrimaryButton disabled={aiFeedbackLoading || !transcript.trim()} onClick={handleAiFeedback}>
                {aiFeedbackLoading ? "Analiza..." : "Pobierz feedback"}
              </PrimaryButton>
            </div>
            {aiFeedbackText ? <div className="mt-4 rounded-[24px] bg-shell-soft p-4 text-sm leading-6 text-shell-mute whitespace-pre-wrap">{aiFeedbackText}</div> : null}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
