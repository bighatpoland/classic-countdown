import { addDays, daysBetween } from "@/lib/date";
import type { AppSettings, Card, Review } from "@/lib/types";

const MIN_EASE = 1.3;

function priorityScore(tags: string[]): number {
  if (tags.includes("today")) {
    return 3;
  }
  if (tags.includes("tutor")) {
    return 2;
  }
  if (tags.includes("survival")) {
    return 1;
  }
  return 0;
}

export function sortReviewQueue(cards: Card[], now = new Date()): Card[] {
  return [...cards]
    .filter((card) => new Date(card.dueAt).getTime() <= now.getTime())
    .sort((left, right) => {
      const overdueDelta = daysBetween(left.dueAt, now) - daysBetween(right.dueAt, now);
      if (overdueDelta !== 0) {
        return overdueDelta < 0 ? 1 : -1;
      }

      const priorityDelta = priorityScore(right.tags) - priorityScore(left.tags);
      if (priorityDelta !== 0) {
        return priorityDelta;
      }

      return new Date(left.dueAt).getTime() - new Date(right.dueAt).getTime();
    });
}

export function isBacklogOverloaded(cards: Card[], settings: AppSettings, now = new Date()): boolean {
  const dueCount = sortReviewQueue(cards, now).length;
  return dueCount >= Math.max(12, settings.newCardsCap * 4);
}

export function canCreateNewCards(cards: Card[], settings: AppSettings, todayNewCount: number, now = new Date()): boolean {
  if (todayNewCount >= settings.newCardsCap) {
    return false;
  }

  return !isBacklogOverloaded(cards, settings, now);
}

export function applySm2Review(card: Card, grade: Review["grade"], now = new Date()): Card {
  let ease = card.ease;
  let interval = card.interval;
  let lapses = card.lapses;

  if (grade < 3) {
    lapses += 1;
    interval = 1;
  } else {
    if (interval <= 0) {
      interval = 1;
    } else if (interval === 1) {
      interval = 3;
    } else {
      interval = Math.max(2, Math.round(interval * ease));
    }

    ease = Math.max(MIN_EASE, ease + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));
  }

  return {
    ...card,
    ease,
    interval,
    lapses,
    dueAt: addDays(now, interval).toISOString()
  };
}
