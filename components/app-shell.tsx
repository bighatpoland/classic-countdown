"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type AppShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const navItems = [
  { href: "/today", label: "Today" },
  { href: "/study/srs", label: "SRS" },
  { href: "/study/input", label: "Input" },
  { href: "/study/speak", label: "Speak" },
  { href: "/inbox", label: "Inbox" },
  { href: "/tutor", label: "Tutor" },
  { href: "/progress", label: "Progress" },
  { href: "/settings", label: "Settings" }
];

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-shell-bg">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row lg:gap-6 lg:px-6 lg:py-6">
        <aside className="hidden w-64 shrink-0 rounded-[32px] border border-shell-line bg-white/80 p-5 shadow-panel backdrop-blur lg:block">
          <div className="rounded-[28px] bg-gradient-to-br from-accent-100 via-white to-shell-soft p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-shell-mute">Classic SRS</p>
            <h1 className="mt-3 font-serif-display text-3xl text-shell-ink">Speaking</h1>
            <p className="mt-3 text-sm leading-6 text-shell-mute">Codzienny rytm 20 minut, z naciskiem na mowienie i lekka kontrola backlogu.</p>
          </div>

          <nav aria-label="Main" className="mt-6 space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? "bg-shell-ink text-white" : "text-shell-ink hover:bg-shell-soft"}`}
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-shell-line bg-shell-bg/90 px-4 py-4 backdrop-blur lg:px-0 lg:pt-0">
            <div className="rounded-[30px] border border-shell-line bg-white/85 px-5 py-4 shadow-panel backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-shell-mute">Classic SRS Speaking</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <h1 className="font-serif-display text-3xl text-shell-ink">{title}</h1>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-shell-mute">{subtitle}</p>
                </div>
                <Link className="hidden rounded-full border border-shell-line px-4 py-2 text-sm font-medium text-shell-ink hover:bg-shell-soft sm:inline-flex" href="/today">
                  Wroc do planu dnia
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 pb-28 pt-5 lg:px-0 lg:pb-6">{children}</main>

          <nav aria-label="Bottom navigation" className="fixed inset-x-0 bottom-0 z-30 border-t border-shell-line bg-white/95 px-3 py-3 backdrop-blur lg:hidden">
            <div className="mx-auto grid max-w-xl grid-cols-4 gap-2">
              {navItems.slice(0, 4).concat(navItems.slice(4, 8)).map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    className={`rounded-2xl px-2 py-2 text-center text-xs font-medium transition ${active ? "bg-shell-ink text-white" : "bg-shell-soft text-shell-mute"}`}
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
