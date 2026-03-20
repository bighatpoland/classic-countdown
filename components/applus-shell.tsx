"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

type ShellProps = {
  title: string;
  activeRoute: "/" | "/settings";
  children: ReactNode;
};

const leftMenuItems = [
  "Sales Board",
  "Address Info",
  "Record Document",
  "Countdown Dashboard",
  "Quotations",
  "Orders",
  "Invoices",
  "Master Data"
];

const rightFunctions = [
  "Open countdown",
  "Open settings",
  "Refresh target",
  "Mark day complete",
  "Adjust schedule",
  "Save as default"
];

function LeftNavigation({ activeRoute }: { activeRoute: "/" | "/settings" }) {
  return (
    <aside className="flex h-full flex-col border-r border-applus-border bg-white">
      <div className="border-b border-applus-border px-4 py-3">
        <h2 className="text-sm font-medium text-applus-text">Sales</h2>
      </div>
      <div className="px-3 py-2">
        <input
          aria-label="Search menu"
          className="w-full rounded border border-applus-border px-3 py-1.5 text-sm text-applus-text"
          placeholder="Search"
          type="text"
        />
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-1" aria-label="Main navigation">
        <ul className="space-y-1">
          {leftMenuItems.map((item) => {
            const isCountdown = item === "Countdown Dashboard";
            const isSettings = item === "Record Document";
            const isActive = (activeRoute === "/" && isCountdown) || (activeRoute === "/settings" && isSettings);

            const content = (
              <span
                className={[
                  "block rounded px-3 py-2 text-sm",
                  isActive ? "border border-applus-blue bg-blue-50 font-medium text-applus-text" : "text-applus-text hover:bg-slate-100"
                ].join(" ")}
              >
                {item}
              </span>
            );

            if (isCountdown) {
              return (
                <li key={item}>
                  <Link href="/">{content}</Link>
                </li>
              );
            }

            if (isSettings) {
              return (
                <li key={item}>
                  <Link href="/settings">{content}</Link>
                </li>
              );
            }

            return <li key={item}>{content}</li>;
          })}
        </ul>
      </nav>
    </aside>
  );
}

function RightFunctionsPanel({ activeRoute }: { activeRoute: "/" | "/settings" }) {
  return (
    <aside className="flex h-full flex-col border-l border-applus-border bg-white">
      <div className="flex items-center justify-between border-b border-applus-border px-4 py-3">
        <h2 className="text-sm font-semibold text-applus-text">Functions</h2>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Function shortcuts">
        <ul className="space-y-1 text-sm text-applus-text">
          {rightFunctions.map((fn) => {
            const isSelected = (activeRoute === "/" && fn === "Open countdown") || (activeRoute === "/settings" && fn === "Open settings");
            return (
              <li key={fn}>
                <span className={["block rounded px-3 py-2", isSelected ? "border-l-2 border-applus-blue bg-blue-50 font-medium" : "hover:bg-slate-100"].join(" ")}>
                  {fn}
                </span>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export function ApplusShell({ title, activeRoute, children }: ShellProps) {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-applus-text">
      <header className="relative z-30 border-b border-applus-border bg-white">
        <div className="h-2 w-full bg-applus-blue" />
        <div className="flex h-14 items-center gap-4 px-3 sm:px-4 lg:px-6">
          <button
            className="rounded bg-applus-accent px-3 py-1 text-sm font-medium text-applus-text lg:hidden"
            onClick={() => setLeftOpen((value) => !value)}
            type="button"
          >
            Menu
          </button>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="text-xs text-slate-500">Classic</span>
            <span className="truncate text-sm font-semibold">{title}</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Link className="rounded border border-applus-blue px-3 py-1 text-sm text-applus-blue" href="/">
              Countdown
            </Link>
            <Link className="rounded border border-applus-border px-3 py-1 text-sm text-applus-text" href="/settings">
              Settings
            </Link>
          </div>
          <button
            className="rounded border border-applus-border px-3 py-1 text-sm lg:hidden"
            onClick={() => setRightOpen((value) => !value)}
            type="button"
          >
            Functions
          </button>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_260px]">
        <div className="hidden lg:block">
          <LeftNavigation activeRoute={activeRoute} />
        </div>

        <main className="overflow-y-auto bg-[linear-gradient(180deg,rgba(10,112,235,0.08)_0%,rgba(255,255,255,1)_30%)] p-3 sm:p-4 lg:p-5">
          {children}
        </main>

        <div className="hidden lg:block">
          <RightFunctionsPanel activeRoute={activeRoute} />
        </div>
      </div>

      {(leftOpen || rightOpen) && (
        <button
          aria-label="Close overlays"
          className="fixed inset-0 z-30 bg-black/25 lg:hidden"
          onClick={() => {
            setLeftOpen(false);
            setRightOpen(false);
          }}
          type="button"
        />
      )}

      <div className={["fixed inset-y-0 left-0 z-40 w-72 transform bg-white transition-transform duration-200 lg:hidden", leftOpen ? "translate-x-0" : "-translate-x-full"].join(" ")}>
        <LeftNavigation activeRoute={activeRoute} />
      </div>

      <div className={["fixed inset-y-0 right-0 z-40 w-72 transform bg-white transition-transform duration-200 lg:hidden", rightOpen ? "translate-x-0" : "translate-x-full"].join(" ")}>
        <RightFunctionsPanel activeRoute={activeRoute} />
      </div>
    </div>
  );
}
