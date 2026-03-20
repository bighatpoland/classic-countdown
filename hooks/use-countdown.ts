"use client";

import { useEffect, useState } from "react";

import { computeCountdownState } from "@/lib/countdown";
import type { CountdownState, WorkSchedule } from "@/lib/types";

type CountdownHookResult = {
  now: Date;
  state: CountdownState;
};

export function useCountdown(schedule: WorkSchedule): CountdownHookResult {
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const now = Date.now();
      setNowMs(now);
      const delay = 1000 - (now % 1000) + 5;
      timeoutId = setTimeout(tick, delay);
    };

    tick();

    return () => clearTimeout(timeoutId);
  }, []);

  const now = new Date(nowMs);
  const state = computeCountdownState(now, schedule);
  return { now, state };
}

