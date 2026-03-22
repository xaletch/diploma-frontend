import { useMemo, useState } from "react";
import { MONTHS } from "../constants/calendar.constant";
import { toDateKey } from "../utils/calendar.util";
import type { CalendarCell } from "../types/calendar.type";

interface UseCalendarReturnProps {
  goPrevMonth: () => void;
  goNextMonth: () => void;
  goPrevYear: () => void;
  goNextYear: () => void;
  handleSelectDate: (dateKey: string | null) => void;
  handleViewMonthIndex: (idx: number) => void;

  viewYear: number;
  yearMin: number;
  yearMax: number;
  viewMonthIndex: number;
  selectedDateKey: string | null;
  calendarTitle: string;
  calendarCells: CalendarCell[];
  todayDateKey: string;
}

export const useCalendar = (): UseCalendarReturnProps => {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonthIndex, setViewMonthIndex] = useState(() => today.getMonth());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const calendarTitle = useMemo(() => `${MONTHS[viewMonthIndex]} ${viewYear}`, [viewMonthIndex, viewYear]);

  const calendarCells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonthIndex, 1);
    const firstJsDay = firstDay.getDay();
    const firstOffsetMondayStart = (firstJsDay + 6) % 7;

    const cells: CalendarCell[] = [];

    for (let i = 0; i < 42; i++) {
      const date = new Date(viewYear, viewMonthIndex, 1 - firstOffsetMondayStart + i);
      const cellYear = date.getFullYear();
      const cellMonthIndex = date.getMonth();
      const cellDay = date.getDate();

      const inMonth = cellYear === viewYear && cellMonthIndex === viewMonthIndex;
      const dateKey = toDateKey(cellYear, cellMonthIndex, cellDay);

      cells.push({
        inMonth,
        day: cellDay,
        dateKey,
        year: cellYear,
        monthIndex: cellMonthIndex,
      });
    }

    return cells;
  }, [viewMonthIndex, viewYear]);

  const todayDateKey = useMemo(() => {
    return toDateKey(today.getFullYear(), today.getMonth(), today.getDate())
  }, [today]);

  const yearRange = useMemo(() => {
    const current = today.getFullYear();
    const min = current - 10;
    const max = current + 10;
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
  }, [today]);

  const yearMin = yearRange[0] ?? today.getFullYear();
  const yearMax = yearRange[yearRange.length - 1] ?? today.getFullYear();

  const handleSelectDate = (dateKey: string | null) => setSelectedDateKey(dateKey);
  const handleViewMonthIndex = (idx: number) => setViewMonthIndex(idx);

  const goPrevMonth = () => {
    setSelectedDateKey(null);
    setViewMonthIndex((prevMonth) => {
      if (prevMonth === 0) {
        setViewYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    })
  }

  const goNextMonth = () => {
    setSelectedDateKey(null);
    setViewMonthIndex((prevMonth) => {
      if (prevMonth === 11) {
        setViewYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    })
  }

  const goPrevYear = () => {
    if (viewYear <= yearMin) return;
    setSelectedDateKey(null);
    setViewYear((y) => y - 1);
  }

  const goNextYear = () => {
    if (viewYear >= yearMax) return;
    setSelectedDateKey(null);
    setViewYear((y) => y + 1);
  }

  return {
    goPrevMonth,
    goNextMonth,
    goPrevYear,
    goNextYear,
    handleSelectDate,
    handleViewMonthIndex,

    viewYear,
    yearMin,
    yearMax,
    viewMonthIndex,
    selectedDateKey,
    calendarTitle,
    calendarCells,
    todayDateKey,
  };
};