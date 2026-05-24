import type { SelectOption } from "@/shared/ui";

export const TIME_OPTIONS: SelectOption[] = Array.from(
  { length: (24 * 60) / 5 }, 
  (_, i) => {
    const minutes = i * 5;
    const hh = Math.floor(minutes / 60);
    const mm = minutes % 60;
    const time = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    return { id: minutes, value: time, label: time };
  }
);

export const createTimeOptions = (minute: number = 15): SelectOption[] => {
  return Array.from(
    { length: (24 * 60) / minute }, 
    (_, i) => {
      const minutes = i * minute;
      const hh = Math.floor(minutes / 60);
      const mm = minutes % 60;
      const time = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
      return { id: minutes, value: time, label: time };
    }
  );
}
