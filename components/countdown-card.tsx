"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import type { CountdownState, WorkSchedule } from "@/lib/types";
import { formatRemainingTime } from "@/lib/time";

type CountdownCardProps = {
  state: CountdownState;
  schedule: WorkSchedule;
  now: Date;
};

function modeLabel(mode: CountdownState["mode"]): string {
  switch (mode) {
    case "before_work":
      return "vor Arbeitsbeginn";
    case "in_work":
      return "im Arbeitstag";
    case "after_work":
      return "nach Feierabend";
    case "weekend":
      return "Wochenende";
    default:
      return mode;
  }
}

function weekdayLabel(value: number): string {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][value] ?? "?";
}

function formatTarget(targetIso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(targetIso));
}

function formatShort(targetIso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(new Date(targetIso));
}

function ClassicField({ label, value, subtle = false }: { label: string; value: string; subtle?: boolean }) {
  return (
    <div className="flex min-h-[24px] items-center gap-3">
      <div className="w-[126px] shrink-0 text-[12px] text-[#3a414a]">{label}</div>
      <div
        className={[
          "flex h-[24px] min-w-0 flex-1 items-center rounded-[4px] border border-[#8a96a3] px-[6px] text-[12px] tracking-[0.01em]",
          subtle ? "bg-[rgba(255,255,255,0.6)] text-[#6f747e]" : "bg-[rgba(255,255,255,0.9)] text-[#3a414a]"
        ].join(" ")}
      >
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}

function ClassicCard({ children }: { children: ReactNode }) {
  return <section className="rounded-[6px] border border-[#d5dbe3] bg-white p-3 shadow-[0_1px_1px_rgba(0,0,0,0.1),0_5px_14px_rgba(0,0,0,0.06)]">{children}</section>;
}

export function CountdownCard({ state, schedule, now }: CountdownCardProps) {
  const rows = [
    { id: "001", name: "Current status", type: "Mode", value: modeLabel(state.mode), meta: formatShort(state.targetIso) },
    { id: "002", name: "Remaining today", type: "Timer", value: formatRemainingTime(state.remainingMs), meta: schedule.endTime },
    { id: "003", name: "Current time", type: "Clock", value: now.toLocaleTimeString("en-GB", { hour12: false }), meta: now.toLocaleDateString("en-GB") },
    { id: "004", name: "Work days", type: "Schedule", value: schedule.workDays.map(weekdayLabel).join(", "), meta: `${schedule.startTime}-${schedule.endTime}` },
    { id: "005", name: "Target point", type: "Deadline", value: formatTarget(state.targetIso), meta: "Auto refresh" }
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 xl:grid-cols-3">
        <ClassicCard>
          <div className="space-y-2">
            <ClassicField label="Artikel Nr.: *" subtle value="CC-Workday-001" />
            <ClassicField label="Benennung" value="Classic Countdown Dashboard" />
            <ClassicField label="Zeichnung Nr.:" value={now.toLocaleDateString("en-GB")} />
            <ClassicField label="Artikelgruppe:" value={modeLabel(state.mode)} />
          </div>
        </ClassicCard>

        <ClassicCard>
          <div className="space-y-2">
            <ClassicField label="Status:" subtle value="3 freigegeben" />
            <ClassicField label="ME:" value="Stuck" />
            <ClassicField label="Attributklasse:" value="Workday timer" />
            <ClassicField label="Gewicht/manuell:" value={formatRemainingTime(state.remainingMs)} />
            <ClassicField label="Abmessung:" value={formatTarget(state.targetIso)} />
          </div>
        </ClassicCard>

        <ClassicCard>
          <div className="space-y-2">
            <ClassicField label="Status:" subtle value={modeLabel(state.mode)} />
            <ClassicField label="ME:" value="Stuck" />
            <ClassicField label="Attributklasse:" value={schedule.workDays.map(weekdayLabel).join(", ")} />
            <ClassicField label="Gewicht/manuell:" value={now.toLocaleString("en-GB", { hour12: false })} />
            <ClassicField label="Abmessung:" value={`${schedule.startTime} - ${schedule.endTime}`} />
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
            <ClassicField label="Warengruppe:" subtle value="3 freigegeben" />
            <ClassicField label="Konfigurator:" value={formatRemainingTime(state.remainingMs)} />
            <ClassicField label="Konfigurationsart:" value={modeLabel(state.mode)} />
            <ClassicField label="Kostenstelle" value={now.toLocaleString("en-GB", { hour12: false })} />
            <ClassicField label="Zolltarif-Nr.:" value={formatTarget(state.targetIso)} />
            <ClassicField label="Vorganger-Artikel:" value={`Start ${schedule.startTime}`} />
            <ClassicField label="Nachfolger-Artikel:" value={`Ende ${schedule.endTime}`} />
            <ClassicField label="Alternativ-Artikel:" value={schedule.workDays.map(weekdayLabel).join(", ")} />
          </div>

          <div className="grid content-start gap-3 text-[12px] text-[#3a414a]">
            {[
              ["Konfiguriert", true],
              ["keine Artikelstat.", state.mode === "after_work"],
              ["keine Intrastat.", state.mode === "weekend"],
              ["durchdisponiert", state.mode === "in_work"],
              ["zu verpacken", false],
              ["unvollstandig", false],
              ["keine Anzahlung", false]
            ].map(([label, checked]) => (
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

            <div className="pt-3">
              <Link
                className="inline-flex h-[28px] items-center rounded-[4px] border border-[#8a96a3] bg-white px-3 text-[12px] font-medium text-[#3a414a] hover:bg-[#f4f7fb]"
                href="/settings"
              >
                Einstellungen offnen
              </Link>
            </div>
          </div>
        </div>
      </ClassicCard>

      <ClassicCard>
        <div className="overflow-hidden rounded-[4px] border border-[#d7dce2]">
          <div className="grid grid-cols-[84px_minmax(240px,2fr)_140px_170px_170px_170px_170px_62px_52px] bg-[rgba(154,167,180,0.4)] text-[12px] font-medium text-[#3a414a]">
            {["ID", "Document Name", "Document Type", "Lorum Ipsum", "Lorum Ipsum", "Lorum Ipsum", "Lorum Ipsum", "Lorum...", "Che..."].map((header) => (
              <div className="border-r border-white px-2 py-[6px]" key={header}>
                {header}
              </div>
            ))}
          </div>

          {rows.map((row, index) => (
            <div
              className={[
                "grid grid-cols-[84px_minmax(240px,2fr)_140px_170px_170px_170px_170px_62px_52px] text-[12px] text-[#3a414a]",
                index % 2 === 1 ? "bg-[rgba(154,167,180,0.32)]" : "bg-white"
              ].join(" ")}
              key={row.id}
            >
              <div className="border-r border-[#8a96a3] px-2 py-[5px]">{row.id}</div>
              <div className="border-r border-[#8a96a3] px-2 py-[5px]">{row.name}</div>
              <div className="border-r border-[#8a96a3] px-2 py-[5px]">{row.type}</div>
              <div className="border-r border-[#8a96a3] px-2 py-[5px]">{row.value}</div>
              <div className="border-r border-[#8a96a3] px-2 py-[5px]">{row.meta}</div>
              <div className="border-r border-[#8a96a3] px-2 py-[5px]">{schedule.startTime}</div>
              <div className="border-r border-[#8a96a3] px-2 py-[5px]">{schedule.endTime}</div>
              <div className="border-r border-[#8a96a3] px-2 py-[5px] text-center">&gt;</div>
              <div className="px-2 py-[5px] text-center">o</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-6 text-[12px] text-[#3a414a]">
          <div className="flex items-center gap-2">
            <span>Rabat:</span>
            <span className="h-[22px] w-[170px] rounded-[4px] border border-[#8a96a3] bg-white" />
          </div>
          <div className="flex items-center gap-2">
            <span>Netto:</span>
            <span className="h-[22px] w-[170px] rounded-[4px] border border-[#8a96a3] bg-white" />
          </div>
          <div className="flex items-center gap-2">
            <span>+UST.:</span>
            <span className="h-[22px] w-[170px] rounded-[4px] border border-[#8a96a3] bg-white" />
          </div>
          <div className="flex items-center gap-2">
            <span>Brutto:</span>
            <span className="h-[22px] w-[170px] rounded-[4px] border border-[#8a96a3] bg-white" />
          </div>
        </div>
      </ClassicCard>
    </div>
  );
}
