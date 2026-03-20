export type CountdownMode = "before_work" | "in_work" | "after_work" | "weekend";

export type WorkSchedule = {
  startTime: string;
  endTime: string;
  workDays: number[];
};

export type CountdownState = {
  mode: CountdownMode;
  targetIso: string;
  remainingMs: number;
};

