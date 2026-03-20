import { createSeedState, markPhraseSpoken, promotePhraseToCard } from "@/lib/app-state";

describe("phrase pipeline", () => {
  it("promotes inbox phrase to a new card", () => {
    const state = createSeedState(new Date("2026-03-20T10:00:00.000Z"));
    const phrase = state.phraseInbox.find((item) => item.status === "captured");
    expect(phrase).toBeDefined();

    const next = promotePhraseToCard(state, phrase!.id, new Date("2026-03-20T10:00:00.000Z"));
    expect(next.cards.some((card) => card.answerEs === phrase!.textEs)).toBe(true);
    expect(next.phraseInbox.find((item) => item.id === phrase!.id)?.status).toBe("carded");
  });

  it("marks phrase as spoken", () => {
    const state = createSeedState(new Date("2026-03-20T10:00:00.000Z"));
    const phrase = state.phraseInbox[0];

    const next = markPhraseSpoken(state, phrase.id, new Date("2026-03-20T10:00:00.000Z"));
    expect(next.phraseInbox.find((item) => item.id === phrase.id)?.status).toBe("spoken");
    expect(next.dailyLogs[0]?.spoke).toBe(true);
  });
});
