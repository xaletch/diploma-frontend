import type { ParsedBackendDate } from "../types/calendar.type";

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const parseBackendDate = (dateStr: string): ParsedBackendDate | null => {
  const s = dateStr.trim();
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(s);
  if (!match) return null;

  const day = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const year = Number(match[3]);

  if (monthIndex < 0 || monthIndex > 11) return null;
  if (day < 1 || day > 31) return null;

  const d = new Date(year, monthIndex, day);
  if (d.getFullYear() !== year || d.getMonth() !== monthIndex || d.getDate() !== day) return null;

  return { day, monthIndex, year };
}

export const toDateKey = (year: number, monthIndex: number, day: number) => `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;

export const toBackendDateString = (year: number, monthIndex: number, day: number) => `${pad2(day)}-${pad2(monthIndex + 1)}-${year}`;

export const isTimeValue = (value: string) => /^\d{2}:\d{2}$/.test(value.trim());

export const formatInterval = (start: string, end: string) => `${start} - ${end}`;

export const isWeekendValue = (value: string) => {
  const s = value.trim().toLowerCase();
  return s === "выходной" || s.includes("выходной");
}
