import type { IChart } from "@/entities/dashboard";

export const parseChartDate = (raw: string): Date => {
  const [datePart, timePart] = raw.split(" ");
  const [dd, mm, yyyy] = datePart.split("-");
  return new Date(`${yyyy}-${mm}-${dd}T${timePart}`);
};

export const groupChartByDay = (data: IChart[]): IChart[] => {
  const map = new Map<string, number>();

  for (const item of data) {
    const date = parseChartDate(item.date);
    const key = date.toISOString().slice(0, 10);
    map.set(key, (map.get(key) ?? 0) + item.profit);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, profit]) => ({ date, profit }));
};
