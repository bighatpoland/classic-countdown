export type StudyMode = "quiet" | "voice";

export type SessionTemplate = "standard" | "minimum";

export type Card = {
  id: string;
  promptPl: string;
  answerEs: string;
  tags: string[];
  ease: number;
  interval: number;
  dueAt: string;
  lapses: number;
  createdAt: string;
};

export type Review = {
  id: string;
  cardId: string;
  grade: 0 | 1 | 2 | 3 | 4 | 5;
  reviewedAt: string;
  responseMs: number;
};

export type PhraseStatus = "captured" | "carded" | "spoken";

export type PhraseInboxItem = {
  id: string;
  textEs: string;
  source: string;
  status: PhraseStatus;
  createdAt: string;
  lastUsedAt?: string;
};

export type SpeakingSelfScores = {
  stumbles: number;
  connectors: number;
  clarity: number;
  confidence: number;
};

export type SpeakingSession = {
  id: string;
  date: string;
  promptId: string;
  mode: StudyMode;
  durationMin: number;
  audioRef?: string;
  selfScores: SpeakingSelfScores;
};

export type DailyLog = {
  date: string;
  totalMin: number;
  reviewCount: number;
  newCount: number;
  spoke: boolean;
  stress: number;
  confidence: number;
  mode: StudyMode;
  completed: boolean;
  sessionTemplate: SessionTemplate;
};

export type TutorNote = {
  id: string;
  lessonDate: string;
  topic: string;
  mistakes: string[];
  correctedForms: string[];
  promotedToCards: string[];
};

export type AppSettings = {
  dailyMinutes: number;
  newCardsCap: number;
  srsMinutesCap: number;
  locale: string;
};

export type DailyPlanRecord = {
  date: string;
  mode: StudyMode;
  template: SessionTemplate;
  completedStepIds: string[];
};

export type AppState = {
  createdAt: string;
  cards: Card[];
  reviews: Review[];
  phraseInbox: PhraseInboxItem[];
  speakingSessions: SpeakingSession[];
  dailyLogs: DailyLog[];
  dailyPlans: DailyPlanRecord[];
  tutorNotes: TutorNote[];
  settings: AppSettings;
};

export type TodayPlanStep = {
  id: "srs" | "input" | "speak";
  title: string;
  minutes: number;
  description: string;
  route: string;
};

export type TodayPlanView = {
  date: string;
  mode: StudyMode;
  template: SessionTemplate;
  steps: Array<TodayPlanStep & { completed: boolean }>;
  completedCount: number;
};

export type StudyMaterial = {
  id: string;
  title: string;
  kind: "dialog" | "text" | "audio";
  durationMin: number;
  level: string;
  summary: string;
  linkLabel?: string;
  href?: string;
  phrases: string[];
};

export type SpeakPrompt = {
  id: string;
  topic: string;
  prompt: string;
  support: string[];
};
