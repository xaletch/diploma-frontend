import { useMemo, useState } from "react";
import { MONTHS } from "../constants/calendar.constant";
import { isTimeValue, isWeekendValue, parseBackendDate, toBackendDateString, toDateKey } from "../utils/calendar.util";
import type { CalendarCell, ScheduleEditInfo } from "../types/calendar.type";
import { useDialog } from "@/entities/dialog";
import type { ISchedule, ScheduleDialogData } from "@/entities/schedule";

interface UseCalendarReturnProps {
  goPrevMonth: () => void;
  goNextMonth: () => void;
  goPrevYear: () => void;
  goNextYear: () => void;
  handleSelectDate: (dateKey: string | null) => void;
  handleChangeSchedule: (data: ScheduleDialogData) => void;
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

export const useCalendar = (user_id: string, schedules?: ISchedule[]): UseCalendarReturnProps => {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(() => today.getFullYear());
  const [viewMonthIndex, setViewMonthIndex] = useState(() => today.getMonth());
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  const { openDialog } = useDialog();

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

  const scheduleEditByKey = useMemo(() => {
    const map = new Map<string, ScheduleEditInfo>();
    const scheduleList = (schedules ?? []) as ISchedule[];

    for (const item of scheduleList) {
      const parsed = parseBackendDate(item.date);
      if (!parsed) continue;

      const key = toDateKey(parsed.year, parsed.monthIndex, parsed.day);
      const intervals = item.intervals ?? [];

      const workIntervals = intervals.filter((it) => {
        const start = it.start ?? "";
        const end = it.end ?? "";
        if (isWeekendValue(start) || isWeekendValue(end)) return false;
        if (!isTimeValue(start) || !isTimeValue(end)) return false;
        return true;
      })

      map.set(key, {
        scheduleId: item.id,
        workIntervals: workIntervals.map((it) => ({ start: it.start, end: it.end })),
      });
    }

    return map
  }, [schedules]);

  const handleSelectDate = (dateKey: string | null) => setSelectedDateKey(dateKey);

  const handleChangeSchedule = (data: ScheduleDialogData) => {
    if (!data.in_month) return;

    const backDate = toBackendDateString(data.year, data.month_index, data.day);
    const editInfo = scheduleEditByKey.get(data.date_key);
    const initIntervals = editInfo && editInfo.workIntervals.length > 0 ? editInfo.workIntervals : [{ start: "00:00", end: "00:05" }];
    
    openDialog("schedule", {
      schedule_id: editInfo?.scheduleId ?? null,
      schedule: {
        date_key: data.date_key,
        year: data.year,
        month_index: data.month_index,
        day: data.day,
        backend_date: backDate,
      },
      user_id: user_id,
      intervals: initIntervals,
      day_info: data.day_info,
    });
  }

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
    handleChangeSchedule,
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