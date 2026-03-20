import Link from "next/link";
import type { ReactNode } from "react";

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-[28px] border border-shell-line bg-white/95 p-5 shadow-panel ${className}`}>{children}</section>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.24em] text-shell-mute">{children}</p>;
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-semibold text-shell-ink">{title}</h2>
      {subtitle ? <p className="text-sm leading-6 text-shell-mute">{subtitle}</p> : null}
    </div>
  );
}

export function StatChip({ label, value, tone = "neutral" }: { label: string; value: string | number; tone?: "neutral" | "accent" | "warm" }) {
  const toneClass =
    tone === "accent"
      ? "border-accent-300 bg-accent-50 text-accent-800"
      : tone === "warm"
        ? "border-amber-300 bg-amber-50 text-amber-800"
        : "border-shell-line bg-shell-soft text-shell-ink";

  return (
    <div className={`rounded-2xl border px-3 py-2 ${toneClass}`}>
      <p className="text-[11px] uppercase tracking-[0.18em]">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

export function ActionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="inline-flex items-center justify-center rounded-full border border-shell-line px-4 py-2 text-sm font-medium text-shell-ink transition hover:border-accent-400 hover:bg-accent-50" href={href}>
      {children}
    </Link>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      className="inline-flex items-center justify-center rounded-full bg-shell-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-shell-ink/90 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export function TogglePill({
  active,
  label,
  onClick
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${active ? "bg-shell-ink text-white" : "bg-shell-soft text-shell-ink hover:bg-white"}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const ratio = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="h-3 overflow-hidden rounded-full bg-shell-soft">
      <div className="h-full rounded-full bg-gradient-to-r from-accent-500 via-shell-ink to-accent-300" style={{ width: `${ratio}%` }} />
    </div>
  );
}
