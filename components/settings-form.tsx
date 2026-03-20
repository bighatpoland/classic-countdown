"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

import { DAY_LABELS } from "@/lib/defaults";
import type { WorkSchedule } from "@/lib/types";
import { isValidTimeString } from "@/lib/time";

type SettingsFormProps = {
  schedule: WorkSchedule;
  onSave: (schedule: WorkSchedule) => void;
};

export function SettingsForm({ schedule, onSave }: SettingsFormProps) {
  const router = useRouter();
  const [startTime, setStartTime] = useState(schedule.startTime);
  const [endTime, setEndTime] = useState(schedule.endTime);
  const [workDays, setWorkDays] = useState<number[]>(schedule.workDays);
  const [error, setError] = useState("");

  function toggleDay(day: number) {
    setWorkDays((current) => (current.includes(day) ? current.filter((value) => value !== day) : [...current, day].sort((a, b) => a - b)));
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!isValidTimeString(startTime) || !isValidTimeString(endTime)) {
      setError("Start and end time must use HH:mm format.");
      return;
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const startMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    if (endMinutes <= startMinutes) {
      setError("End time must be greater than start time.");
      return;
    }

    if (workDays.length === 0) {
      setError("Select at least one work day.");
      return;
    }

    onSave({
      startTime,
      endTime,
      workDays
    });

    router.push("/");
  }

  return (
    <form className="rounded border border-applus-border bg-white p-4 shadow-panel" onSubmit={handleSave}>
      <h1 className="text-lg font-semibold text-applus-text">Schedule settings</h1>
      <p className="mt-1 text-sm text-slate-600">Configure your workday to drive countdown calculation.</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium text-applus-text">
          Start time
          <input
            className="h-10 rounded border border-applus-border px-3 text-sm outline-none focus:border-applus-blue focus:ring-2 focus:ring-blue-200"
            onChange={(event) => setStartTime(event.target.value)}
            required
            type="time"
            value={startTime}
          />
        </label>

        <label className="grid gap-1 text-sm font-medium text-applus-text">
          End time
          <input
            className="h-10 rounded border border-applus-border px-3 text-sm outline-none focus:border-applus-blue focus:ring-2 focus:ring-blue-200"
            onChange={(event) => setEndTime(event.target.value)}
            required
            type="time"
            value={endTime}
          />
        </label>
      </div>

      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-medium text-applus-text">Working days</legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {DAY_LABELS.map((day) => {
            const selected = workDays.includes(day.value);
            return (
              <label
                className={[
                  "flex cursor-pointer items-center justify-center rounded border px-3 py-2 text-sm",
                  selected ? "border-applus-blue bg-blue-50 font-medium text-applus-text" : "border-applus-border text-applus-text hover:bg-slate-100"
                ].join(" ")}
                key={day.value}
              >
                <input checked={selected} className="sr-only" onChange={() => toggleDay(day.value)} type="checkbox" />
                {day.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <p className="mt-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button className="h-10 rounded bg-applus-blue px-4 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-applus-blue" type="submit">
          Save and return
        </button>
        <Link className="inline-flex h-10 items-center rounded border border-applus-border px-4 text-sm font-medium text-applus-text hover:bg-slate-100" href="/">
          Cancel
        </Link>
      </div>
    </form>
  );
}
