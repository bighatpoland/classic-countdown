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
    <div className="flex min-h-[24px] items-center gap-[8px]">
      <div className="w-[126px] shrink-0 text-[12px] leading-[1.25] text-[#3a414a]">{label}</div>
      <div
        className={[
          "flex h-[23px] min-w-0 flex-1 items-center rounded-[3px] border border-[#95a1ac] bg-white px-[6px] text-[12px] tracking-[0.01em]",
          subtle ? "bg-[rgba(255,255,255,0.7)] text-[#b6bcc4]" : "text-[#3a414a]"
        ].join(" ")}
      >
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}

function ClassicCard({ children }: { children: ReactNode }) {
  return <section className="rounded-[5px] border border-[#dbe0e6] bg-white p-[12px] shadow-[0_1px_1px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06),0_10px_14px_rgba(10,112,235,0.05)]">{children}</section>;
}

function ClassicCheckbox({ checked = false }: { checked?: boolean }) {
  return (
    <span
      className={[
        "flex h-[15px] w-[15px] items-center justify-center rounded-[4px] border border-[#8a96a3] bg-white text-[10px] leading-none",
        checked ? "text-[#0a70eb]" : "text-transparent"
      ].join(" ")}
    >
      x
    </span>
  );
}

function ChevronCell() {
  return <span className="text-[14px] text-[#6f747e]">&gt;</span>;
}

function FieldWithAction({
  label,
  value,
  action = "[]",
  subtle = false
}: {
  label: string;
  value: string;
  action?: string;
  subtle?: boolean;
}) {
  return (
    <div className="flex min-h-[24px] items-center gap-[8px]">
      <div className="w-[126px] shrink-0 text-[12px] leading-[1.25] text-[#3a414a]">{label}</div>
      <div className="flex min-w-0 flex-1 items-center gap-[0]">
        <div
          className={[
            "flex h-[23px] min-w-0 flex-1 items-center rounded-l-[3px] border border-r-0 border-[#95a1ac] bg-white px-[6px] text-[12px] tracking-[0.01em]",
            subtle ? "bg-[rgba(255,255,255,0.7)] text-[#b6bcc4]" : "text-[#3a414a]"
          ].join(" ")}
        >
          <span className="truncate">{value}</span>
        </div>
        <span className="flex h-[23px] w-[24px] items-center justify-center border border-[#95a1ac] bg-[#f7f9fb] text-[10px] text-[#6f747e]">{action}</span>
      </div>
    </div>
  );
}

export function CountdownCard({ state, schedule, now }: CountdownCardProps) {
  const rows = [
    { id: "001", name: "Current status", type: "Mode", value: modeLabel(state.mode), meta: formatShort(state.targetIso) },
    { id: "002", name: "Remaining today", type: "Timer", value: formatRemainingTime(state.remainingMs), meta: schedule.endTime },
    { id: "003", name: "Current time", type: "Clock", value: now.toLocaleTimeString("en-GB", { hour12: false }), meta: now.toLocaleDateString("en-GB") },
    { id: "004", name: "Work days", type: "Schedule", value: schedule.workDays.map(weekdayLabel).join(", "), meta: `${schedule.startTime}-${schedule.endTime}` },
    { id: "005", name: "Target point", type: "Deadline", value: formatTarget(state.targetIso), meta: "Auto refresh" }
  ];
  const checkboxRows: Array<{ label: string; checked: boolean }> = [
    { label: "Konfiguriert", checked: true },
    { label: "keine Artikelstat.", checked: state.mode === "after_work" },
    { label: "keine Intrastat.", checked: state.mode === "weekend" },
    { label: "durchdisponiert", checked: state.mode === "in_work" },
    { label: "zu verpacken", checked: false },
    { label: "unvollstandig", checked: false },
    { label: "keine Anzahlung", checked: false }
  ];

  return (
    <div className="space-y-[14px]">
      <div className="grid gap-[14px] xl:grid-cols-[1.08fr_1.04fr_1.04fr]">
        <ClassicCard>
          <div className="space-y-2">
            <ClassicField label="Artikel Nr.: *" subtle value="IT-Test-3" />
            <ClassicField label="Benennung" value={`IT-Artikel Test - ${formatRemainingTime(state.remainingMs)}`} />
            <ClassicField label="Zeichnung Nr.:" value={`CC-${now.toLocaleDateString("en-GB")}`} />
            <ClassicField label="Artikelgruppe:" value={`Internal Countdown / ${modeLabel(state.mode)}`} />
          </div>
        </ClassicCard>

        <ClassicCard>
          <div className="space-y-2">
            <ClassicField label="Status:" subtle value="3 freigegeben" />
            <ClassicField label="ME:" value="Stuck" />
            <FieldWithAction label="Attributklasse:" value="Internal Countdown" />
            <FieldWithAction label="Gewicht/manuell:" action="v" value={formatRemainingTime(state.remainingMs)} />
            <ClassicField label="Abmessung:" value={formatTarget(state.targetIso)} />
          </div>
        </ClassicCard>

        <ClassicCard>
          <div className="space-y-2">
            <ClassicField label="Status:" subtle value={modeLabel(state.mode)} />
            <FieldWithAction label="ME:" action="v" value="Stuck" />
            <FieldWithAction label="Attributklasse:" value={schedule.workDays.map(weekdayLabel).join(", ")} />
            <FieldWithAction label="Gewicht/manuell:" action="v" value={now.toLocaleString("en-GB", { hour12: false })} />
            <ClassicField label="Abmessung:" value={`${schedule.startTime} - ${schedule.endTime}`} />
          </div>
        </ClassicCard>
      </div>

      <ClassicCard>
        <div className="flex items-center justify-between border-b border-[#d7dce2] bg-[linear-gradient(180deg,rgba(208,214,221,0.7)_0%,rgba(228,233,238,0.82)_100%)] px-[8px] py-[4px] text-[12px] text-[#3a414a]">
          <div className="flex flex-wrap gap-[16px]">
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

        <div className="grid gap-[18px] px-[10px] py-[10px] xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-[8px]">
            <div className="flex min-h-[24px] items-center gap-[8px]">
              <div className="w-[126px] shrink-0 text-[12px] leading-[1.25] text-[#3a414a]">Warengruppe:</div>
              <div className="grid min-w-0 flex-1 grid-cols-[126px_minmax(0,1fr)_24px_24px] gap-0">
                <div className="flex h-[23px] items-center rounded-l-[3px] border border-r-0 border-[#95a1ac] bg-[rgba(255,255,255,0.7)] px-[6px] text-[12px] text-[#b6bcc4]">
                  3 freigegeben
                </div>
                <div className="flex h-[23px] items-center border border-r-0 border-[#95a1ac] bg-white px-[6px] text-[12px] text-[#3a414a]">Lorem Ipsum</div>
                <span className="flex h-[23px] items-center justify-center border border-r-0 border-[#95a1ac] bg-[#f7f9fb] text-[10px] text-[#6f747e]">[]</span>
                <span className="flex h-[23px] items-center justify-center rounded-r-[3px] border border-[#95a1ac] bg-[#f7f9fb] text-[11px] text-[#6f747e]">&gt;</span>
              </div>
            </div>
            <FieldWithAction action="v" label="Konfigurator:" value={formatRemainingTime(state.remainingMs)} />
            <FieldWithAction label="Konfigurationsart:" value={modeLabel(state.mode)} />
            <FieldWithAction action="v" label="Kostenstelle" value={now.toLocaleString("en-GB", { hour12: false })} />
            <ClassicField label="Zolltarif-Nr.:" value={formatTarget(state.targetIso)} />
            <ClassicField label="Vorganger-Artikel:" value={`Start ${schedule.startTime}`} />
            <ClassicField label="Nachfolger-Artikel:" value={`Ende ${schedule.endTime}`} />
            <ClassicField label="Alternativ-Artikel:" value={schedule.workDays.map(weekdayLabel).join(", ")} />
          </div>

          <div className="grid content-start gap-[9px] text-[12px] text-[#3a414a]">
            {checkboxRows.map(({ label, checked }) => (
              <div className="flex items-center justify-between gap-4" key={label}>
                <span>{label}</span>
                <ClassicCheckbox checked={checked} />
              </div>
            ))}

            <div className="pt-[6px]">
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
          <div className="grid grid-cols-[84px_minmax(240px,2fr)_170px_164px_164px_164px_164px_62px_52px] bg-[linear-gradient(180deg,rgba(205,212,219,0.88)_0%,rgba(224,229,234,0.96)_100%)] text-[12px] font-medium text-[#3a414a]">
            {["ID", "Document Name", "Document Type", "Lorum Ipsum", "Lorum Ipsum", "Lorum Ipsum", "Lorum Ipsum", "Lorum...", "Che..."].map((header) => (
              <div className="border-r border-[rgba(255,255,255,0.72)] px-[8px] py-[6px]" key={header}>
                {header}
              </div>
            ))}
          </div>

          {rows.map((row, index) => (
            <div
              className={[
                "grid grid-cols-[84px_minmax(240px,2fr)_170px_164px_164px_164px_164px_62px_52px] text-[12px] text-[#3a414a]",
                index % 2 === 1 ? "bg-[rgba(205,212,219,0.5)]" : "bg-white"
              ].join(" ")}
              key={row.id}
            >
              <div className="border-r border-[#8a96a3] px-[8px] py-[5px]">{row.id}</div>
              <div className="border-r border-[#8a96a3] px-[8px] py-[5px]">{row.name}</div>
              <div className="border-r border-[#8a96a3] px-[8px] py-[5px]">{row.type}</div>
              <div className="border-r border-[#8a96a3] px-[8px] py-[5px]">{row.value}</div>
              <div className="border-r border-[#8a96a3] px-[8px] py-[5px]">{row.meta}</div>
              <div className="border-r border-[#8a96a3] px-[8px] py-[5px]">{schedule.startTime}</div>
              <div className="border-r border-[#8a96a3] px-[8px] py-[5px]">{schedule.endTime}</div>
              <div className="border-r border-[#8a96a3] px-[8px] py-[5px] text-center">
                <ChevronCell />
              </div>
              <div className="flex items-center justify-center px-[8px] py-[5px]">
                <ClassicCheckbox checked={index === 1 || index === 4} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[14px] flex justify-end gap-[18px] text-[12px] text-[#3a414a]">
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
