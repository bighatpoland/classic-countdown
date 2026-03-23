"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

type ShellRoute = "/" | "/today" | "/settings";

type ShellProps = {
  title: string;
  activeRoute: ShellRoute;
  children: ReactNode;
};

const leftMenuItems = [
  "Sales Board",
  "Address Info",
  "Record Document",
  "Item Text",
  "Quotations",
  "Orders",
  "Goods Issues",
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

const toolbarIcons = ["first", "prev", "counter", "next", "last", "search", "clear", "add", "save", "delete", "print", "find", "attach", "tree", "route"];

function LogoMark() {
  return (
    <div className="flex h-[60px] w-[84px] items-center justify-center rounded-br-[26px] bg-[linear-gradient(180deg,#f8cd53_0%,#f0bd2f_100%)] shadow-[8px_0_18px_rgba(0,0,0,0.14)]">
      <div className="translate-y-[-1px] text-[25px] font-medium tracking-[-0.07em] text-white">ap+</div>
    </div>
  );
}

function Glyph({ kind, className = "h-[16px] w-[16px]" }: { kind: string; className?: string }) {
  const base = "none";
  const stroke = "#6f747e";

  switch (kind) {
    case "grid":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <path d="M3 3.2h3v3H3zm0 6.6h3v3H3zm6.6-6.6h3v3h-3zm0 6.6h3v3h-3z" fill={stroke} />
        </svg>
      );
    case "search":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <circle cx="7" cy="7" fill="none" r="4.2" stroke={stroke} strokeWidth="1.4" />
          <path d="m10.4 10.4 3 3" stroke={stroke} strokeLinecap="round" strokeWidth="1.4" />
        </svg>
      );
    case "clear":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <path d="M4 4 12 12M12 4 4 12" stroke={stroke} strokeLinecap="round" strokeWidth="1.5" />
        </svg>
      );
    case "add":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <circle cx="8" cy="8" fill={stroke} r="7" opacity="0.13" />
          <path d="M8 4.3v7.4M4.3 8h7.4" stroke="#5f6670" strokeLinecap="round" strokeWidth="1.4" />
        </svg>
      );
    case "save":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <path d="M3 3.2h8.7l1.3 1.3v8.3H3z" fill="none" stroke={stroke} strokeWidth="1.2" />
          <path d="M5 3.8h4.4v3H5zM5 10.2h6" stroke={stroke} strokeWidth="1.1" />
        </svg>
      );
    case "delete":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <path d="M5.2 5.4v6M8 5.4v6m2.8-6v6M4.2 4h7.6M6 4V2.8h4V4m-6 0 1 9h6l1-9" stroke={stroke} strokeLinecap="round" strokeWidth="1.2" />
        </svg>
      );
    case "print":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <path d="M4.3 5V2.8h7.4V5M4.3 10.8h7.4v2.4H4.3z" stroke={stroke} strokeWidth="1.2" />
          <rect fill="none" height="5" rx="1.2" stroke={stroke} strokeWidth="1.2" width="10.8" x="2.6" y="5.2" />
        </svg>
      );
    case "find":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <path d="M4 2.8h5.8l2.2 2.2v8.2H4z" fill="none" stroke={stroke} strokeWidth="1.2" />
          <circle cx="8.2" cy="9.3" fill="none" r="1.9" stroke={stroke} strokeWidth="1.1" />
          <path d="m9.6 10.7 1.6 1.6" stroke={stroke} strokeLinecap="round" strokeWidth="1.1" />
        </svg>
      );
    case "attach":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <path d="M5.6 8.4 9.8 4.2a2.1 2.1 0 1 1 3 3L7.3 12.8a3.1 3.1 0 1 1-4.4-4.4l4.9-4.9" stroke={stroke} strokeLinecap="round" strokeWidth="1.2" />
        </svg>
      );
    case "tree":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <rect fill="none" height="3" stroke={stroke} strokeWidth="1.1" width="3" x="2.4" y="2.6" />
          <rect fill="none" height="3" stroke={stroke} strokeWidth="1.1" width="3" x="10.6" y="2.6" />
          <rect fill="none" height="3" stroke={stroke} strokeWidth="1.1" width="3" x="10.6" y="10.4" />
          <path d="M5.4 4.1H8v7.8h2.6M8 8h2.6" stroke={stroke} strokeWidth="1.1" />
        </svg>
      );
    case "route":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <path d="m3.1 12.4 3.1-8.8M5.5 9.2h3.3l2.8-5.6M8.7 9.2l2.7 3.2" stroke={stroke} strokeLinecap="round" strokeWidth="1.2" />
        </svg>
      );
    case "first":
    case "prev":
    case "next":
    case "last":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          {kind === "first" ? (
            <>
              <path d="M11 4 6.5 8 11 12" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
              <path d="M4.4 4v8" stroke={stroke} strokeLinecap="round" strokeWidth="1.4" />
            </>
          ) : null}
          {kind === "prev" ? <path d="M10.6 4.2 5.8 8l4.8 3.8" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" /> : null}
          {kind === "next" ? <path d="M5.4 4.2 10.2 8l-4.8 3.8" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" /> : null}
          {kind === "last" ? (
            <>
              <path d="M5 4 9.5 8 5 12" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" />
              <path d="M11.6 4v8" stroke={stroke} strokeLinecap="round" strokeWidth="1.4" />
            </>
          ) : null}
        </svg>
      );
    case "nav":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <path d="M2.8 4.1h5.6M2.8 7.9h7.6M2.8 11.7h4.9" stroke={stroke} strokeLinecap="round" strokeWidth="1.4" />
          <path d="m11 4.3 2.2 2.2-3 3L8 9l-.6-2.2z" fill="none" stroke={stroke} strokeLinejoin="round" strokeWidth="1.1" />
        </svg>
      );
    case "person":
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <circle cx="8" cy="5.4" fill="none" r="2.2" stroke="#0a70eb" strokeWidth="1.3" />
          <path d="M3.8 13c.7-2.2 2.2-3.3 4.2-3.3s3.5 1.1 4.2 3.3" stroke="#0a70eb" strokeLinecap="round" strokeWidth="1.3" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill={base} viewBox="0 0 16 16">
          <circle cx="8" cy="8" fill={stroke} r="1.8" />
        </svg>
      );
  }
}

function NavGlyph() {
  return (
    <div className="flex h-[24px] w-[24px] items-center justify-center rounded-[6px]">
      <Glyph kind="nav" />
    </div>
  );
}

function LeftNavigation({ activeRoute }: { activeRoute: ShellRoute }) {
  const isCountdownRoute = activeRoute === "/" || activeRoute === "/today";

  return (
    <aside className="flex h-full flex-col border-r border-[#d7dce2] bg-white shadow-[inset_-1px_0_0_rgba(215,220,226,0.95)]">
      <div className="border-b border-[#e0e2e7] px-2 py-[9px]">
        <div className="flex items-center gap-2 text-[13px] font-medium text-[#3a414a]">
          <div className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-[#0a70eb] text-[10px] font-bold text-white">S</div>
          <span>Sales</span>
        </div>
      </div>

      <div className="px-[8px] py-[8px]">
        <div className="flex h-[32px] items-center gap-2 rounded-[4px] border border-[#ced4db] bg-[#fbfcfd] px-[10px] text-[12px] text-[#6f747e]">
          <Glyph className="h-[15px] w-[15px]" kind="search" />
          <span>Search</span>
        </div>
      </div>

      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-[8px] pb-4">
        <ul className="space-y-[1px]">
          {leftMenuItems.map((item) => {
            const isGroup = item === "Item Text";
            const isActive = isCountdownRoute ? item === "Item Text" : item === "Record Document";
            const content = (
              <span
                className={[
                  "flex items-center gap-2 rounded-[4px] px-[10px] py-[6px] text-[12px] leading-[1.25] text-[#3a414a] transition-colors",
                  isActive
                    ? "border border-[#0a70eb] bg-[linear-gradient(180deg,rgba(223,237,255,0.88)_0%,rgba(243,248,255,0.92)_100%)] font-medium shadow-[inset_2px_0_0_#0a70eb]"
                    : "hover:bg-[#f4f7fb]"
                ].join(" ")}
              >
                <NavGlyph />
                <span className="truncate">{item}</span>
                {isGroup ? <span className="ml-auto text-[13px] text-[#6f747e]">{isCountdownRoute ? "^" : "v"}</span> : null}
              </span>
            );

            return (
              <li key={item}>
                {isActive ? isCountdownRoute ? <Link href="/today">{content}</Link> : <Link href="/settings">{content}</Link> : content}
                {isGroup && isCountdownRoute ? (
                  <div className="ml-[11px] mt-[2px] space-y-[1px] border-l-2 border-[#0a70eb] pl-[8px]">
                    {["Item Text", "Item Text", "Item Text"].map((subItem, index) => (
                      <span
                        className={[
                          "flex items-center gap-2 rounded-[4px] px-[10px] py-[6px] text-[12px] text-[#3a414a]",
                          index === 2
                            ? "border border-[#0a70eb] bg-[linear-gradient(180deg,rgba(223,237,255,0.88)_0%,rgba(243,248,255,0.92)_100%)] font-medium shadow-[inset_2px_0_0_#0a70eb]"
                            : "hover:bg-[#f4f7fb]"
                        ].join(" ")}
                        key={`${subItem}-${index}`}
                      >
                        <NavGlyph />
                        <span>{subItem}</span>
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function RightFunctionsPanel({ activeRoute }: { activeRoute: ShellRoute }) {
  const isCountdownRoute = activeRoute === "/" || activeRoute === "/today";

  return (
    <aside className="flex h-full flex-col border-l border-[#d7dce2] bg-white shadow-[inset_1px_0_0_rgba(215,220,226,0.95)]">
      <div className="flex h-[42px] items-center justify-between border-b border-[#e0e2e7] px-4">
        <div className="flex items-center gap-3">
          <span className="text-[16px] text-[#6f747e]">&gt;</span>
          <h2 className="text-[13px] font-medium text-[#3a414a]">Functions</h2>
        </div>
        <Glyph className="h-[15px] w-[15px]" kind="search" />
      </div>

      <nav aria-label="Function shortcuts" className="flex-1 overflow-y-auto px-[8px] py-[10px]">
        <ul className="space-y-[1px]">
          {rightFunctions.map((item) => {
            const isSelected = isCountdownRoute && item === "Item Text";

            return (
              <li key={item}>
                <span
                  className={[
                    "flex items-center gap-2 rounded-[4px] px-[10px] py-[6px] text-[12px] text-[#3a414a]",
                    isSelected
                      ? "border-l-2 border-[#0a70eb] bg-[linear-gradient(180deg,rgba(223,237,255,0.9)_0%,rgba(243,248,255,0.94)_100%)] font-medium"
                      : "hover:bg-[#f4f7fb]"
                  ].join(" ")}
                >
                  {item === "Item Text" ? <NavGlyph /> : null}
                  <span className="truncate">{item}</span>
                  {item === "Item Text" && isSelected ? <span className="ml-auto text-[13px] text-[#6f747e]">^</span> : null}
                </span>

                {isSelected ? (
                  <div className="ml-[11px] mt-[2px] space-y-[1px] border-l-2 border-[#0a70eb] pl-[8px]">
                    {["Item Text", "Item Text", "Item Text"].map((subItem, index) => (
                      <span className="flex items-center gap-2 rounded-[4px] px-[10px] py-[6px] text-[12px] text-[#3a414a] hover:bg-[#f4f7fb]" key={`${subItem}-${index}`}>
                        <NavGlyph />
                        <span>{subItem}</span>
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function ToolbarButton({ kind, highlighted = false }: { kind: string; highlighted?: boolean }) {
  if (kind === "counter") {
    return (
      <button className="flex h-[24px] min-w-[72px] items-center justify-center rounded-[12px] bg-[#0a70eb] px-[10px] text-[11px] font-medium text-white shadow-[0_1px_4px_rgba(10,112,235,0.26)]" type="button">
        12 / 200
      </button>
    );
  }

  return (
    <button
      className={[
        "flex h-[24px] w-[24px] items-center justify-center rounded-[6px] transition-colors",
        highlighted ? "bg-[#e8f1fd]" : "hover:bg-[#f4f7fb]"
      ].join(" ")}
      type="button"
    >
      <Glyph className="h-[16px] w-[16px]" kind={kind} />
    </button>
  );
}

function WorkflowRibbon() {
  return (
    <div className="rounded-t-[4px] bg-[linear-gradient(180deg,rgba(10,112,235,0.24)_0%,rgba(10,112,235,0.08)_100%)] px-[16px] pb-[10px] pt-[8px] shadow-[0_0_10px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-9 gap-4 text-[10px] font-medium leading-[1.25] text-[#3a414a]">
        {workflowSteps.map((step) => (
          <div className="text-left" key={step}>
            {step}
          </div>
        ))}
      </div>
      <div className="mt-[8px] grid grid-cols-9 items-center gap-4">
        {workflowSteps.map((step, index) => (
          <div className="flex items-center" key={step}>
            <span className="h-[8px] w-[8px] rounded-full border border-white bg-white shadow-[0_0_0_2px_rgba(10,112,235,0.4)]" />
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_bottom,rgba(244,207,95,0.18)_0%,rgba(255,255,255,0)_24%),linear-gradient(180deg,rgba(10,112,235,0.10)_0%,rgba(255,255,255,0.94)_14%,rgba(255,255,255,1)_100%)] text-[#3a414a]">
      <header className="relative z-30 bg-white shadow-[0_0_10px_rgba(0,0,0,0.08)]">
        <div className="h-[6px] w-full bg-[#0a70eb]" />

        <div className="grid min-h-[96px] grid-cols-[84px_minmax(0,1fr)]">
          <div className="row-span-2">
            <LogoMark />
          </div>

          <div className="flex min-h-[54px] items-center justify-between border-b border-[#e0e2e7] px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex flex-col justify-center">
                <span className="text-[11px] leading-none text-[#6f747e]">Classic</span>
              </div>
              <Glyph className="h-[15px] w-[15px]" kind="grid" />
              <span className="text-[14px] text-[#3a414a]">Sub page 1</span>
              <span className="text-[#6f747e]">&gt;</span>
              <span className="text-[14px] font-medium text-[#202020]">{title}</span>
              <span className="text-[11px] text-[#6f747e]">v</span>
            </div>

            <div className="hidden items-center gap-4 xl:flex">
              <button className="rounded-[10px] border border-[#0a70eb] bg-white px-4 py-[7px] text-[13px] font-medium text-[#0a70eb] shadow-[0_1px_4px_rgba(10,112,235,0.16)]" type="button">
                + Ask Elly
              </button>
              <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full text-[#6f747e]">
                <Glyph className="h-[15px] w-[15px]" kind="tree" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[rgba(10,112,235,0.16)]">
                  <Glyph className="h-[28px] w-[28px]" kind="person" />
                </div>
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

          <div className="flex min-h-[36px] flex-wrap items-center gap-3 px-5 py-[5px]">
            <div className="flex flex-wrap items-center gap-[6px]">
              {toolbarIcons.map((kind) => (
                <ToolbarButton highlighted={kind === "counter"} key={kind} kind={kind} />
              ))}
            </div>

            <div className="ml-auto flex items-center gap-4">
              <button className="flex h-[24px] items-center gap-[8px] rounded-[4px] border border-[#8a96a3] bg-white px-[10px] text-[12px] text-[#3a414a]" type="button">
                <span>Sorting</span>
                <span className="text-[10px]">AZ</span>
              </button>
              <button className="flex h-[24px] min-w-[186px] items-center justify-between rounded-[4px] border border-[#8a96a3] bg-white px-[10px] text-[12px] text-[#3a414a]" type="button">
                <span>Documentation</span>
                <span className="text-[10px]">v</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-96px)] grid-cols-1 xl:grid-cols-[200px_minmax(0,1fr)_208px]">
        <div className="hidden xl:block">
          <LeftNavigation activeRoute={activeRoute} />
        </div>

        <main className="overflow-x-auto bg-[linear-gradient(180deg,rgba(10,112,235,0.13)_0%,rgba(255,255,255,0.94)_16%,rgba(255,255,255,1)_100%)]">
          <WorkflowRibbon />
          <div className="px-[14px] pb-[16px] pt-[8px]">{children}</div>
        </main>

        <div className="hidden xl:block">
          <RightFunctionsPanel activeRoute={activeRoute} />
        </div>
      </div>

      {(leftOpen || rightOpen) ? (
        <button
          aria-label="Close overlays"
          className="fixed inset-0 z-30 bg-black/20 xl:hidden"
          onClick={() => {
            setLeftOpen(false);
            setRightOpen(false);
          }}
          type="button"
        />
      ) : null}

      <div className={["fixed inset-y-0 left-0 z-40 w-[280px] transform bg-white transition-transform duration-200 xl:hidden", leftOpen ? "translate-x-0" : "-translate-x-full"].join(" ")}>
        <LeftNavigation activeRoute={activeRoute} />
      </div>

      <div className={["fixed inset-y-0 right-0 z-40 w-[280px] transform bg-white transition-transform duration-200 xl:hidden", rightOpen ? "translate-x-0" : "translate-x-full"].join(" ")}>
        <RightFunctionsPanel activeRoute={activeRoute} />
      </div>
    </div>
  );
}
