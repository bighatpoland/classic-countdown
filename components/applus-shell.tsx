"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

type ShellProps = {
  title: string;
  activeRoute: "/" | "/today" | "/settings";
  children: ReactNode;
};

const leftMenuItems = [
  "Sales Board",
  "Address Info",
  "Record Document",
  "Item Text",
  "Quotations",
  "Orders",
  "Invoices",
  "Agreements",
  "Price Lists",
  "Costing",
  "Payment Plans",
  "Master Data"
];

const workflowSteps = [
  "1 angelegt",
  "2 bereit zur Freigabe",
  "3 freigegeben",
  "4 bestatigt",
  "5 versendet",
  "6 geliefert",
  "7 fakturiert",
  "8 storniert",
  "9 Muster"
];

const rightFunctions = [
  "Neue Position anlegen",
  "Aktion anlegen",
  "Aktivitat anlegen",
  "Wettbewerber anlegen",
  "Auftrag erstellen",
  "Beleg erfassen",
  "Vorkalkulation ausfuhren",
  "Ersetzen",
  "Item Text",
  "Vorkalkulation",
  "Verfugbarkeit prufen",
  "Kreditlimitprufung",
  "GAEB-Angebot",
  "Protokolle Attributwert...",
  "Anlage zuordnen"
];

const toolbarIcons = ["|<", "<", "12 / 200", ">", ">|", "Q", "X", "+", "S", "D", "P", "F", "A", "T"];

function IconBullet() {
  return <span className="h-[18px] w-[18px] rounded-[4px] border border-[#8a96a3] bg-[linear-gradient(180deg,#fefefe_0%,#eef3f9_100%)]" />;
}

function LeftNavigation({ activeRoute }: { activeRoute: "/" | "/today" | "/settings" }) {
  return (
    <aside className="flex h-full flex-col border-r border-[#d7dce2] bg-white">
      <div className="border-b border-[#e0e2e7] px-2 py-3">
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#3a414a]">
          <div className="flex h-[20px] w-[20px] items-center justify-center rounded-[4px] bg-[#0a70eb] text-[10px] font-bold text-white">S</div>
          <span>Sales</span>
        </div>
      </div>

      <div className="px-2 py-2">
        <div className="flex items-center gap-2 rounded-[4px] border border-[#ced4db] bg-white px-3 py-2 text-[12px] text-[#6f747e]">
          <span className="text-[11px]">Q</span>
          <span>Search</span>
        </div>
      </div>

      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-2 pb-4">
        <ul className="space-y-[2px]">
          {leftMenuItems.map((item) => {
            const isGroup = item === "Item Text";
            const isCountdownRoute = activeRoute === "/" || activeRoute === "/today";
            const isActive = isCountdownRoute ? item === "Item Text" : item === "Record Document";
            const content = (
              <span
                className={[
                  "flex items-center gap-2 rounded-[4px] px-3 py-[7px] text-[12px] text-[#3a414a] transition-colors",
                  isActive ? "border border-[#0a70eb] bg-[rgba(10,112,235,0.08)] font-medium" : "hover:bg-[#f4f7fb]"
                ].join(" ")}
              >
                <IconBullet />
                <span className="truncate">{item}</span>
              </span>
            );

            return (
              <li key={item}>
                {isActive ? (
                  isCountdownRoute ? (
                    <Link href="/today">{content}</Link>
                  ) : (
                    <Link href="/settings">{content}</Link>
                  )
                ) : (
                  content
                )}

                {isGroup && isCountdownRoute && (
                  <div className="ml-2 mt-[2px] space-y-[2px] border-l-2 border-[rgba(10,112,235,0.65)] pl-2">
                    {["Item Text", "Item Text", "Item Text"].map((subItem, index) => (
                      <span
                        className={[
                          "flex items-center gap-2 rounded-[4px] px-3 py-[7px] text-[12px] text-[#3a414a]",
                          index === 2 ? "border border-[#0a70eb] bg-[rgba(10,112,235,0.08)] font-medium" : "hover:bg-[#f4f7fb]"
                        ].join(" ")}
                        key={`${subItem}-${index}`}
                      >
                        <IconBullet />
                        <span>{subItem}</span>
                      </span>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function RightFunctionsPanel({ activeRoute }: { activeRoute: "/" | "/today" | "/settings" }) {
  return (
    <aside className="flex h-full flex-col border-l border-[#d7dce2] bg-white">
      <div className="flex items-center justify-between border-b border-[#e0e2e7] px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-[16px] text-[#6f747e]">&gt;</span>
          <h2 className="text-[13px] font-medium text-[#3a414a]">Functions</h2>
        </div>
        <span className="text-[14px] text-[#6f747e]">Q</span>
      </div>

      <nav aria-label="Function shortcuts" className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-[2px]">
          {rightFunctions.map((item) => {
            const isSelected = (activeRoute === "/" || activeRoute === "/today") && item === "Item Text";

            return (
              <li key={item}>
                <span
                  className={[
                    "flex items-center gap-2 rounded-[4px] px-3 py-[7px] text-[12px] text-[#3a414a]",
                    isSelected ? "border-l-2 border-[#0a70eb] bg-[rgba(10,112,235,0.08)] font-medium" : "hover:bg-[#f4f7fb]"
                  ].join(" ")}
                >
                  {item === "Item Text" ? <IconBullet /> : null}
                  <span>{item}</span>
                  {item === "Item Text" && isSelected ? <span className="ml-auto text-[14px] text-[#6f747e]">^</span> : null}
                </span>

                {isSelected && (
                  <div className="ml-2 mt-[2px] space-y-[2px] border-l-2 border-[rgba(10,112,235,0.65)] pl-2">
                    {["Item Text", "Item Text", "Item Text"].map((subItem, index) => (
                      <span className="flex items-center gap-2 rounded-[4px] px-3 py-[7px] text-[12px] text-[#3a414a] hover:bg-[#f4f7fb]" key={`${subItem}-${index}`}>
                        <IconBullet />
                        <span>{subItem}</span>
                      </span>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function ToolbarButton({ label, highlighted = false }: { label: string; highlighted?: boolean }) {
  return (
    <button
      className={[
        "flex h-[26px] min-w-[26px] items-center justify-center rounded-[14px] border px-2 text-[11px] leading-none transition-colors",
        highlighted ? "border-[#0a70eb] bg-[#0a70eb] text-white" : "border-transparent text-[#5a6470] hover:border-[#ced4db] hover:bg-[#f4f7fb]"
      ].join(" ")}
      type="button"
    >
      {label}
    </button>
  );
}

function WorkflowRibbon() {
  return (
    <div className="rounded-t-[4px] bg-[linear-gradient(180deg,rgba(10,112,235,0.18)_0%,rgba(10,112,235,0.06)_100%)] px-4 pb-4 pt-3 shadow-[0_0_9px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-9 gap-4 text-[11px] font-medium text-[#3a414a]">
        {workflowSteps.map((step) => (
          <div className="text-center" key={step}>
            {step}
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-9 items-center gap-4">
        {workflowSteps.map((step, index) => (
          <div className="flex items-center" key={step}>
            <span className="h-[8px] w-[8px] rounded-full border border-white bg-white shadow-[0_0_0_2px_rgba(10,112,235,0.45)]" />
            {index < workflowSteps.length - 1 ? <span className="h-[3px] flex-1 bg-[#0a70eb]" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ApplusShell({ title, activeRoute, children }: ShellProps) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_70%,rgba(251,218,97,0.05)_100%)] text-[#3a414a]">
      <header className="relative z-30 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="h-2 w-full bg-[#0a70eb]" />

        <div className="grid min-h-[92px] grid-cols-[84px_minmax(0,1fr)]">
          <div className="row-span-2 flex items-start justify-center rounded-br-[26px] bg-[#f3c340] pt-3 text-[22px] font-medium text-white shadow-[4px_0_16px_rgba(0,0,0,0.1)]">
            ap+
          </div>

          <div className="flex min-h-[54px] items-center justify-between border-b border-[#e0e2e7] px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex flex-col justify-center">
                <span className="text-[11px] leading-none text-[#6f747e]">Classic</span>
                <span className="mt-1 text-[15px] font-medium text-[#202020]">{title}</span>
              </div>
              <span className="text-[#6f747e]">&gt;</span>
              <span className="text-[14px] text-[#3a414a]">Sub page 1</span>
              <span className="text-[#6f747e]">&gt;</span>
              <span className="text-[14px] font-medium text-[#202020]">Sub page 2</span>
            </div>

            <div className="hidden items-center gap-4 xl:flex">
              <button className="rounded-[10px] border border-[#0a70eb] px-4 py-2 text-[13px] font-medium text-[#0a70eb]" type="button">
                + Ask Elly
              </button>
              <span className="text-[15px] text-[#6f747e]">o</span>
              <div className="flex items-center gap-3">
                <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[rgba(10,112,235,0.16)] text-[22px] text-[#0a70eb]">o</div>
                <div className="text-[12px] leading-[1.15]">
                  <div className="max-w-[160px] truncate text-[#3a414a]">Sophie Anna PPP Schneid...</div>
                  <div className="font-medium text-[#0a70eb]">AP_AG</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <button className="rounded border border-[#8a96a3] px-3 py-1 text-[12px]" onClick={() => setLeftOpen((value) => !value)} type="button">
                Menu
              </button>
              <button className="rounded border border-[#8a96a3] px-3 py-1 text-[12px]" onClick={() => setRightOpen((value) => !value)} type="button">
                Functions
              </button>
            </div>
          </div>

          <div className="flex min-h-[38px] flex-wrap items-center gap-3 px-5 py-2">
            <div className="flex flex-wrap items-center gap-1">
              {toolbarIcons.map((icon) => (
                <ToolbarButton highlighted={icon === "12 / 200"} key={icon} label={icon} />
              ))}
            </div>

            <div className="ml-auto flex items-center gap-4">
              <button className="flex h-[28px] items-center gap-2 rounded-[4px] border border-[#8a96a3] bg-white px-3 text-[12px] text-[#3a414a]" type="button">
                <span>Sorting</span>
                <span className="text-[10px]">AZ</span>
              </button>
              <button className="flex h-[28px] min-w-[188px] items-center justify-between rounded-[4px] border border-[#8a96a3] bg-white px-3 text-[12px] text-[#3a414a]" type="button">
                <span>Documentation</span>
                <span className="text-[10px]">v</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-100px)] grid-cols-1 xl:grid-cols-[200px_minmax(0,1fr)_210px]">
        <div className="hidden xl:block">
          <LeftNavigation activeRoute={activeRoute} />
        </div>

        <main className="overflow-x-auto bg-[linear-gradient(180deg,rgba(10,112,235,0.09)_0%,rgba(255,255,255,1)_18%,rgba(255,255,255,1)_100%)]">
          <WorkflowRibbon />
          <div className="px-4 pb-4 pt-3">{children}</div>
        </main>

        <div className="hidden xl:block">
          <RightFunctionsPanel activeRoute={activeRoute} />
        </div>
      </div>

      {(leftOpen || rightOpen) && (
        <button
          aria-label="Close overlays"
          className="fixed inset-0 z-30 bg-black/20 xl:hidden"
          onClick={() => {
            setLeftOpen(false);
            setRightOpen(false);
          }}
          type="button"
        />
      )}

      <div className={["fixed inset-y-0 left-0 z-40 w-[280px] transform bg-white transition-transform duration-200 xl:hidden", leftOpen ? "translate-x-0" : "-translate-x-full"].join(" ")}>
        <LeftNavigation activeRoute={activeRoute} />
      </div>

      <div className={["fixed inset-y-0 right-0 z-40 w-[280px] transform bg-white transition-transform duration-200 xl:hidden", rightOpen ? "translate-x-0" : "translate-x-full"].join(" ")}>
        <RightFunctionsPanel activeRoute={activeRoute} />
      </div>
    </div>
  );
}
