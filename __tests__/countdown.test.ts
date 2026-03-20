import { computeCountdownState } from "@/lib/countdown";
import { DEFAULT_WORK_SCHEDULE } from "@/lib/defaults";

describe("computeCountdownState", () => {
  it("returns before_work before start time on a weekday", () => {
    const now = new Date("2026-03-16T08:59:00");
    const state = computeCountdownState(now, DEFAULT_WORK_SCHEDULE);
    const target = new Date(state.targetIso);
    expect(state.mode).toBe("before_work");
    expect(target.getHours()).toBe(17);
    expect(target.getMinutes()).toBe(0);
    expect(target.getDate()).toBe(now.getDate());
  });

  it("returns in_work at start boundary", () => {
    const now = new Date("2026-03-16T09:00:00");
    const state = computeCountdownState(now, DEFAULT_WORK_SCHEDULE);
    expect(state.mode).toBe("in_work");
  });

  it("returns in_work right before end", () => {
    const now = new Date("2026-03-16T16:59:00");
    const state = computeCountdownState(now, DEFAULT_WORK_SCHEDULE);
    expect(state.mode).toBe("in_work");
    expect(state.remainingMs).toBe(60_000);
  });

  it("returns after_work at end boundary", () => {
    const now = new Date("2026-03-16T17:00:00");
    const state = computeCountdownState(now, DEFAULT_WORK_SCHEDULE);
    expect(state.mode).toBe("after_work");
  });

  it("rolls Friday evening to Monday target", () => {
    const now = new Date("2026-03-20T18:00:00");
    const state = computeCountdownState(now, DEFAULT_WORK_SCHEDULE);
    const target = new Date(state.targetIso);
    expect(state.mode).toBe("after_work");
    expect(target.getDay()).toBe(1);
    expect(target.getHours()).toBe(17);
    expect(target.getMinutes()).toBe(0);
  });

  it("marks weekend mode on Saturday", () => {
    const now = new Date("2026-03-21T10:00:00");
    const state = computeCountdownState(now, DEFAULT_WORK_SCHEDULE);
    expect(state.mode).toBe("weekend");
  });

  it("falls back to defaults on invalid schedule", () => {
    const now = new Date("2026-03-16T10:00:00");
    const state = computeCountdownState(now, {
      startTime: "18:00",
      endTime: "09:00",
      workDays: []
    });
    expect(state.mode).toBe("in_work");
  });
});
