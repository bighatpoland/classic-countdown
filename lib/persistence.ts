import { createSeedState, ensureAppStateDefaults } from "@/lib/app-state";
import { APP_STATE_RECORD_ID, getDatabase } from "@/lib/db";
import type { AppState } from "@/lib/types";

const LOCAL_STORAGE_KEY = "classic-srs-speaking.app-state.v1";

function canUseLocalStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function canUseDexie(): boolean {
  return typeof window !== "undefined" && typeof indexedDB !== "undefined";
}

export async function loadAppState(): Promise<AppState> {
  const seeded = createSeedState();

  if (canUseDexie()) {
    try {
      const stored = await getDatabase().state.get(APP_STATE_RECORD_ID);

      if (stored?.data) {
        return ensureAppStateDefaults(stored.data);
      }
    } catch {
      return readFromLocalStorage(seeded);
    }
  }

  return readFromLocalStorage(seeded);
}

function readFromLocalStorage(fallback: AppState): AppState {
  if (!canUseLocalStorage()) {
    return fallback;
  }

  const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) {
    return fallback;
  }

  try {
    return ensureAppStateDefaults(JSON.parse(raw) as AppState);
  } catch {
    return fallback;
  }
}

export async function persistAppState(state: AppState): Promise<void> {
  if (canUseDexie()) {
    try {
      await getDatabase().state.put({
        id: APP_STATE_RECORD_ID,
        data: state,
        updatedAt: new Date().toISOString()
      });
      return;
    } catch {
      writeToLocalStorage(state);
      return;
    }
  }

  writeToLocalStorage(state);
}

function writeToLocalStorage(state: AppState): void {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
}
