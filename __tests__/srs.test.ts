import { DEFAULT_SETTINGS, createSeedCards } from "@/lib/defaults";
import { applySm2Review, canCreateNewCards, isBacklogOverloaded } from "@/lib/srs";

describe("SRS scheduling", () => {
  it("schedules successful review forward with updated ease", () => {
    const [card] = createSeedCards(new Date("2026-03-20T10:00:00.000Z"));
    const reviewed = applySm2Review(card, 5, new Date("2026-03-20T10:00:00.000Z"));

    expect(reviewed.interval).toBeGreaterThan(card.interval);
    expect(reviewed.ease).toBeGreaterThan(card.ease);
    expect(new Date(reviewed.dueAt).getTime()).toBeGreaterThan(new Date(card.dueAt).getTime());
  });

  it("resets interval to one day on low grade", () => {
    const [card] = createSeedCards(new Date("2026-03-20T10:00:00.000Z"));
    const reviewed = applySm2Review(card, 1, new Date("2026-03-20T10:00:00.000Z"));

    expect(reviewed.interval).toBe(1);
    expect(reviewed.lapses).toBe(card.lapses + 1);
  });
});

describe("new card limits", () => {
  it("blocks new cards when backlog is overloaded", () => {
    const now = new Date("2026-03-20T10:00:00.000Z");
    const cards = Array.from({ length: 24 }, (_, index) => ({
      id: `card-${index}`,
      promptPl: `Prompt ${index}`,
      answerEs: `Respuesta ${index}`,
      tags: ["today"],
      ease: 2.5,
      interval: 1,
      dueAt: new Date("2026-03-19T10:00:00.000Z").toISOString(),
      lapses: 0,
      createdAt: now.toISOString()
    }));

    expect(isBacklogOverloaded(cards, DEFAULT_SETTINGS, now)).toBe(true);
    expect(canCreateNewCards(cards, DEFAULT_SETTINGS, 0, now)).toBe(false);
  });
});
