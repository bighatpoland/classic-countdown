import { addDays, toDateKey } from "@/lib/date";
import type { AppSettings, Card, DailyLog, DailyPlanRecord, PhraseInboxItem, SpeakPrompt, SpeakingSession, StudyMaterial, TutorNote } from "@/lib/types";

export const DEFAULT_SETTINGS: AppSettings = {
  dailyMinutes: 20,
  newCardsCap: 5,
  srsMinutesCap: 8,
  locale: "es-ES"
};

export const INPUT_LIBRARY: StudyMaterial[] = [
  {
    id: "mat-rutina",
    title: "Mi rutina de la manana",
    kind: "dialog",
    durationMin: 4,
    level: "A1",
    summary: "Krotki dialog o poranku z powtorzeniami wysokiej czestotliwosci.",
    phrases: ["Primero preparo cafe.", "Luego salgo de casa.", "Hoy tengo clase por la tarde."]
  },
  {
    id: "mat-cafe",
    title: "Pedir en una cafeteria",
    kind: "audio",
    durationMin: 3,
    level: "A1",
    summary: "Skupia sie na prosbach, uprzejmosci i liczbach.",
    phrases: ["Queria un cafe con leche.", "Para llevar, por favor.", "Cuanto cuesta?"]
  },
  {
    id: "mat-finde",
    title: "Planes del fin de semana",
    kind: "text",
    durationMin: 5,
    level: "A1-A2",
    summary: "Mini tekst o planach, idealny do retellu i zamiany osob.",
    phrases: ["Este sabado quiero descansar.", "Tambien me gustaria salir a caminar.", "Si hace buen tiempo, iremos a la playa."]
  }
];

export const SPEAK_PROMPTS: SpeakPrompt[] = [
  {
    id: "speak-rutina",
    topic: "Rutyna",
    prompt: "Opowiedz przez minute, jak wyglada twoj zwykly poranek po hiszpansku.",
    support: ["Empieza con 'Normalmente...'", "Uzyj 'primero', 'despues', 'luego'.", "Dodaj jedna opinie o porankach."]
  },
  {
    id: "speak-lekcja",
    topic: "Przed lekcja",
    prompt: "Jakie trzy rzeczy chcesz dzis powiedziec lektorowi po hiszpansku?",
    support: ["Zacznij od 'Hoy quiero hablar de...'", "Dodaj jedno pytanie.", "Dodaj jedno zdanie w czasie terazniejszym."]
  },
  {
    id: "speak-opinia",
    topic: "Opinia",
    prompt: "Powiedz, co lubisz robic po pracy i dlaczego.",
    support: ["Uzyj 'me gusta' lub 'prefiero'.", "Dodaj kontrast z 'pero'.", "Zakoncz planem na ten tydzien."]
  }
];

export function createSeedCards(now = new Date()): Card[] {
  return [
    {
      id: "card-rutina",
      promptPl: "Powiedz po hiszpansku: Zwykle zaczynam od kawy.",
      answerEs: "Normalmente empiezo con un cafe.",
      tags: ["today", "routine"],
      ease: 2.5,
      interval: 2,
      dueAt: addDays(now, -1).toISOString(),
      lapses: 0,
      createdAt: addDays(now, -8).toISOString()
    },
    {
      id: "card-clase",
      promptPl: "Powiedz po hiszpansku: Dzis po poludniu mam lekcje.",
      answerEs: "Hoy por la tarde tengo clase.",
      tags: ["today", "tutor"],
      ease: 2.3,
      interval: 3,
      dueAt: addDays(now, -2).toISOString(),
      lapses: 1,
      createdAt: addDays(now, -12).toISOString()
    },
    {
      id: "card-cafe",
      promptPl: "Powiedz po hiszpansku: Poprosze kawe z mlekiem na wynos.",
      answerEs: "Queria un cafe con leche para llevar.",
      tags: ["survival"],
      ease: 2.4,
      interval: 5,
      dueAt: addDays(now, 1).toISOString(),
      lapses: 0,
      createdAt: addDays(now, -10).toISOString()
    },
    {
      id: "card-descansar",
      promptPl: "Powiedz po hiszpansku: W sobote chce odpoczac.",
      answerEs: "El sabado quiero descansar.",
      tags: ["today", "weekend"],
      ease: 2.6,
      interval: 4,
      dueAt: addDays(now, -3).toISOString(),
      lapses: 0,
      createdAt: addDays(now, -6).toISOString()
    }
  ];
}

export function createSeedPhraseInbox(now = new Date()): PhraseInboxItem[] {
  return [
    {
      id: "phrase-1",
      textEs: "Voy poco a poco, pero sigo hablando.",
      source: "lesson",
      status: "captured",
      createdAt: addDays(now, -1).toISOString()
    },
    {
      id: "phrase-2",
      textEs: "Me cuesta, pero lo entiendo mejor.",
      source: "input",
      status: "carded",
      createdAt: addDays(now, -1).toISOString()
    },
    {
      id: "phrase-3",
      textEs: "Hoy quiero practicar conectores basicos.",
      source: "self",
      status: "spoken",
      createdAt: addDays(now, -2).toISOString(),
      lastUsedAt: addDays(now, -1).toISOString()
    }
  ];
}

export function createSeedTutorNotes(now = new Date()): TutorNote[] {
  return [
    {
      id: "tutor-1",
      lessonDate: addDays(now, -2).toISOString(),
      topic: "Rutina y conectores",
      mistakes: ["*Yo voy a trabajo a las ocho.*", "*Me gusta mucho practicar, porque es dificil pero quiero.*"],
      correctedForms: ["Voy al trabajo a las ocho.", "Me gusta practicar aunque sea dificil."],
      promotedToCards: []
    }
  ];
}

export function createDefaultDailyLog(date = toDateKey(new Date())): DailyLog {
  return {
    date,
    totalMin: 0,
    reviewCount: 0,
    newCount: 0,
    spoke: false,
    stress: 3,
    confidence: 3,
    mode: "quiet",
    completed: false,
    sessionTemplate: "standard"
  };
}

export function createDefaultDailyPlan(date = toDateKey(new Date())): DailyPlanRecord {
  return {
    date,
    mode: "quiet",
    template: "standard",
    completedStepIds: []
  };
}

export function createSeedSpeakingSessions(): SpeakingSession[] {
  return [];
}
