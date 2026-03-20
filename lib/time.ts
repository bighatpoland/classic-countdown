export function isValidTimeString(input: string): boolean {
  return /^([01]\d|2[0-3]):([0-5]\d)$/.test(input);
}

export function parseTimeToMinutes(input: string): number {
  if (!isValidTimeString(input)) {
    return Number.NaN;
  }
  const [hour, minute] = input.split(":").map(Number);
  return hour * 60 + minute;
}

export function toDateAtMinutes(base: Date, totalMinutes: number): Date {
  const day = new Date(base);
  day.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, 0, 0);
  return day;
}

export function formatRemainingTime(remainingMs: number): string {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

