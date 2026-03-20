import Dexie, { type Table } from "dexie";

import type { AppState } from "@/lib/types";

type AppStateRecord = {
  id: string;
  data: AppState;
  updatedAt: string;
};

export const APP_STATE_RECORD_ID = "app-state";

export class ClassicSrsDatabase extends Dexie {
  state!: Table<AppStateRecord, string>;

  public constructor() {
    super("classic-srs-speaking");
    this.version(1).stores({
      state: "id, updatedAt"
    });
  }
}

let database: ClassicSrsDatabase | null = null;

export function getDatabase(): ClassicSrsDatabase {
  if (!database) {
    database = new ClassicSrsDatabase();
  }

  return database;
}
