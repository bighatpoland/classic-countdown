"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import type { ReactNode } from "react";
import { useState } from "react";

import { DAY_LABELS } from "@/lib/defaults";
import type { WorkSchedule } from "@/lib/types";
import { isValidTimeString } from "@/lib/time";

type SettingsFormProps = {
  schedule: WorkSchedule;
  onSave: (schedule: WorkSchedule) => void;
};

function ClassicFieldRow({
  label,
  children,
  compact = false
}: {
  label: string;
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={["flex items-center gap-3", compact ? "min-h-[24px]" : "min-h-[30px]"].join(" ")}>
      <div className="w-[126px] shrink-0 text-[12px] text-[#3a414a]">{label}</div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function ClassicCard({ children }: { children: ReactNode }) {
  return <section className="rounded-[6px] border border-[#d5dbe3] bg-white p-3 shadow-[0_1px_1px_rgba(0,0,0,0.1),0_5px_14px_rgba(0,0,0,0.06)]">{children}</section>;
}

export function SettingsForm({ schedule, onSave }: SettingsFormProps) {
  const router = useRouter();
  const [startTime, setStartTime] = useState(schedule.startTime);
  const [endTime, setEndTime] = useState(schedule.endTime);
  const [workDays, setWorkDays] = useState<number[]>(schedule.workDays);
  const [error, setError] = useState("");
  const checkboxRows: Array<{ label: string; checked: boolean }> = [
    { label: "Konfiguriert", checked: true },
    { label: "keine Artikelstat.", checked: false },
    { label: "keine Intrastat.", checked: false },
    { label: "durchdisponiert", checked: true },
    { label: "zu verpacken", checked: false },
    { label: "unvollstandig", checked: false },
    { label: "keine Anzahlung", checked: false }
  ];

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
    <form className="space-y-4" onSubmit={handleSave}>
      <div className="grid gap-4 xl:grid-cols-3">
        <ClassicCard>
          <div className="space-y-2">
            <ClassicFieldRow label="Artikel Nr.: *" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-[rgba(255,255,255,0.8)] px-[6px] text-[12px] text-[#6f747e]">CC-Workday-001</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="Benennung" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Classic Countdown Settings</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="Zeichnung Nr.:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Arbeitszeitmodell</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="Artikelgruppe:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Mon-Fri</div>
            </ClassicFieldRow>
          </div>
        </ClassicCard>

        <ClassicCard>
          <div className="space-y-2">
            <ClassicFieldRow label="Status:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-[rgba(255,255,255,0.8)] px-[6px] text-[12px] text-[#6f747e]">3 freigegeben</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="ME:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Stuck</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="Attributklasse:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Workday schedule</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="Gewicht/manuell:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">{startTime}</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="Abmessung:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">{endTime}</div>
            </ClassicFieldRow>
          </div>
        </ClassicCard>

        <ClassicCard>
          <div className="space-y-2">
            <ClassicFieldRow label="Status:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-[rgba(255,255,255,0.8)] px-[6px] text-[12px] text-[#6f747e]">Arbeitswoche</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="ME:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Stuck</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="Attributklasse:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">{workDays.map((day) => DAY_LABELS.find((entry) => entry.value === day)?.label ?? "").join(", ")}</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="Gewicht/manuell:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Desktop first</div>
            </ClassicFieldRow>
            <ClassicFieldRow label="Abmessung:" compact>
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">{`${startTime} - ${endTime}`}</div>
            </ClassicFieldRow>
          </div>
        </ClassicCard>
      </div>

      <ClassicCard>
        <div className="flex items-center justify-between border-b border-[#d7dce2] bg-[rgba(154,167,180,0.25)] px-2 py-1 text-[12px] text-[#3a414a]">
          <div className="flex flex-wrap gap-5">
            <span>Lorem Ipsum</span>
            <span>Lorem Ipsum</span>
            <span>Lorem Ipsum</span>
            <span>Lorem Ipsum</span>
            <span>Comments</span>
            <span>Actions</span>
            <span>Lorem Ipsum</span>
            <span>Lorem Ipsum</span>
          </div>
          <span className="text-[11px]">v</span>
        </div>

        <div className="grid gap-6 px-3 py-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-3">
            <ClassicFieldRow label="Warengruppe:">
              <div className="grid grid-cols-[126px_minmax(0,1fr)] gap-2">
                <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-[rgba(255,255,255,0.8)] px-[6px] text-[12px] text-[#6f747e]">3 freigegeben</div>
                <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Countdown</div>
              </div>
            </ClassicFieldRow>

            <ClassicFieldRow label="Konfigurator:">
              <input
                className="h-[24px] w-full rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a] outline-none focus:border-[#0a70eb]"
                onChange={(event) => setStartTime(event.target.value)}
                type="time"
                value={startTime}
              />
            </ClassicFieldRow>

            <ClassicFieldRow label="Konfigurationsart:">
              <input
                className="h-[24px] w-full rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a] outline-none focus:border-[#0a70eb]"
                onChange={(event) => setEndTime(event.target.value)}
                type="time"
                value={endTime}
              />
            </ClassicFieldRow>

            <ClassicFieldRow label="Kostenstelle">
              <div className="grid grid-cols-2 gap-2">
                {DAY_LABELS.map((day) => {
                  const selected = workDays.includes(day.value);
                  return (
                    <label
                      className={[
                        "flex h-[24px] cursor-pointer items-center justify-center rounded-[4px] border px-[6px] text-[12px]",
                        selected ? "border-[#0a70eb] bg-[rgba(10,112,235,0.1)] font-medium text-[#3a414a]" : "border-[#8a96a3] bg-white text-[#3a414a]"
                      ].join(" ")}
                      key={day.value}
                    >
                      <input checked={selected} className="sr-only" onChange={() => toggleDay(day.value)} type="checkbox" />
                      {day.label}
                    </label>
                  );
                })}
              </div>
            </ClassicFieldRow>

            <ClassicFieldRow label="Zolltarif-Nr.:">
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">{workDays.length} active days</div>
            </ClassicFieldRow>

            <ClassicFieldRow label="Vorganger-Artikel:">
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Start {startTime}</div>
            </ClassicFieldRow>

            <ClassicFieldRow label="Nachfolger-Artikel:">
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Ende {endTime}</div>
            </ClassicFieldRow>

            <ClassicFieldRow label="Alternativ-Artikel:">
              <div className="flex h-[24px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-[6px] text-[12px] text-[#3a414a]">Browser local storage</div>
            </ClassicFieldRow>
          </div>

          <div className="grid content-start gap-3 text-[12px] text-[#3a414a]">
            {checkboxRows.map(({ label, checked }) => (
              <div className="flex items-center justify-between gap-4" key={label}>
                <span>{label}</span>
                <span
                  className={[
                    "flex h-[15px] w-[15px] items-center justify-center rounded-[4px] border border-[#8a96a3] bg-white text-[10px]",
                    checked ? "text-[#0a70eb]" : "text-transparent"
                  ].join(" ")}
                >
                  x
                </span>
              </div>
            ))}

            {error ? (
              <p className="rounded-[4px] border border-[#d47777] bg-[#fff0f0] px-3 py-2 text-[12px] text-[#9c2f2f]" role="alert">
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-2 pt-3">
              <button className="inline-flex h-[28px] items-center rounded-[4px] border border-[#0a70eb] bg-[#0a70eb] px-3 text-[12px] font-medium text-white" type="submit">
                Speichern
              </button>
              <Link className="inline-flex h-[28px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-3 text-[12px] font-medium text-[#3a414a]" href="/">
                Abbrechen
              </Link>
            </div>
          </div>
        </div>
      </ClassicCard>
    </form>
  );
}
