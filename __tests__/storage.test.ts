import { DEFAULT_WORK_SCHEDULE } from "@/lib/defaults";
import { readStoredSchedule, storageKey, writeStoredSchedule } from "@/lib/storage";

describe("schedule storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns defaults when no value exists", () => {
    expect(readStoredSchedule()).toEqual(DEFAULT_WORK_SCHEDULE);
  });

  it("writes and reads valid schedule", () => {
    const next = {
      startTime: "08:00",
      endTime: "16:00",
      workDays: [1, 2, 3, 4]
    };

    writeStoredSchedule(next);
    expect(readStoredSchedule()).toEqual(next);
  });

  it("returns defaults when storage payload is invalid", () => {
    window.localStorage.setItem(storageKey(), "{invalid-json");
    expect(readStoredSchedule()).toEqual(DEFAULT_WORK_SCHEDULE);
  });
});

