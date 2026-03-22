export type ParsedBackendDate = {
  day: number;
  monthIndex: number;
  year: number;
}

export type DayInfo =
  | { kind: "weekend" }
  | { kind: "work"; intervals: Array<{ start: string; end: string }>; extraCount: number; totalCount: number };


export type ScheduleEditInfo = {
  scheduleId: number;
  workIntervals: Array<{ start: string; end: string }>;
}

export type CalendarCell = {
  inMonth: boolean;
  day: number;
  dateKey: string;
  year: number;
  monthIndex: number;
}
