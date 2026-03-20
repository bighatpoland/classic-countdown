"use client";

import { useEffect, useState } from "react";

import { createSeedState, ensureAppStateDefaults, getDashboardSummary, getTodayPlanView } from "@/lib/app-state";
import { loadAppState, persistAppState } from "@/lib/persistence";
import type { AppState } from "@/lib/types";

type Updater = (state: AppState) => AppState;

export function useAppStore() {
  const [state, setState] = useState<AppState | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    void loadAppState().then((loaded) => {
      if (!active) {
        return;
      }
      setState(ensureAppStateDefaults(loaded));
      setHydrated(true);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated || !state) {
      return;
    }
    void persistAppState(state);
  }, [hydrated, state]);

  const updateState = (updater: Updater) => {
    setState((current) => updater(ensureAppStateDefaults(current ?? createSeedState())));
  };

  const derived = state
    ? {
        today: getTodayPlanView(state),
        dashboard: getDashboardSummary(state)
      }
    : null;

  return {
    hydrated,
    state,
    derived,
    updateState
  };
}
