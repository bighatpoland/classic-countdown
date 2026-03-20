export function toDateKey(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toISOString().slice(0, 10);
}

export function addDays(value: Date | string, days: number): Date {
  const date = new Date(typeof value === "string" ? value : value.toISOString());
  date.setDate(date.getDate() + days);
  return date;
}

export function hoursBetween(fromValue: Date | string, toValue: Date | string): number {
  const from = new Date(typeof fromValue === "string" ? fromValue : fromValue.toISOString());
  const to = new Date(typeof toValue === "string" ? toValue : toValue.toISOString());
  return Math.round((to.getTime() - from.getTime()) / 3_600_000);
}

export function daysBetween(fromValue: Date | string, toValue: Date | string): number {
  const from = new Date(typeof fromValue === "string" ? fromValue : fromValue.toISOString());
  const to = new Date(typeof toValue === "string" ? toValue : toValue.toISOString());
  return Math.floor((to.getTime() - from.getTime()) / 86_400_000);
}

export function formatShortDate(isoDate: string, locale = "pl-PL"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short"
  }).format(new Date(isoDate));
}

export function formatLongDate(isoDate: string, locale = "pl-PL"): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(new Date(isoDate));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function createId(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 8);
  return `${prefix}_${Date.now().toString(36)}_${random}`;
}
