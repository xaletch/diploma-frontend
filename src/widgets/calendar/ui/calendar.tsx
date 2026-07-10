import type { ScheduleDialogData } from "@/entities/schedule";
import { CalendarDayItem, ChangeYear, CurrentDate, WEEKDAYS_MONDAY_START, type DayInfo, type ScheduleEditInfo } from "@/features/calendar"
import type { UseCalendarReturnProps } from "@/features/calendar/model/hooks/calendar.hook";
import { LazyBlur } from "@/widgets/loading";

interface CalendarProps {
  calendar: UseCalendarReturnProps;
  dayInfoByKey: Map<string, DayInfo>;
  scheduleEditByKey: Map<string, ScheduleEditInfo>;
  isLoading?: boolean;
  isFetching: boolean;
}

export const Calendar = ({ calendar, dayInfoByKey, scheduleEditByKey, isLoading=false, isFetching }: CalendarProps) => {
  const handleChangeSchedule = (data: ScheduleDialogData) => {
    const editInfo = scheduleEditByKey.get(data.date_key);
    calendar.handleChangeSchedule(data, editInfo);
  };

  return (
    <div className="mt-8">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <CurrentDate calendarTitle={calendar.calendarTitle} goPrevMonth={calendar.goPrevMonth} goNextMonth={calendar.goNextMonth} />

        <ChangeYear
          goPrevYear={calendar.goPrevYear}
          goNextYear={calendar.goNextYear}
          calendarTitle={calendar.calendarTitle}
          viewYear={calendar.viewYear}
          yearMin={calendar.yearMin}
          yearMax={calendar.yearMax}
          viewMonthIndex={calendar.viewMonthIndex}
          handleSelectDate={calendar.handleSelectDate}
          handleViewMonthIndex={calendar.handleViewMonthIndex}
        />
      </div>

      <div className="mt-6 max-w-317 w-full mx-auto">
        <div className="grid grid-cols-7 gap-2.5">
          {WEEKDAYS_MONDAY_START.map((w) => (
            <div key={w} className="text-md font-extrabold text-center">
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2.5 mt-2.5 relative">
          {isFetching && <LazyBlur />}
          {isLoading && <div className="absolute top-0 left-0 h-full w-full rounded-xl z-10 backdrop-blur-xs" />}
          {calendar.calendarCells.map((cell) => {
            const dayInfo = dayInfoByKey.get(cell.dateKey);
            return (
              <CalendarDayItem
                key={cell.dateKey}
                dayInfo={dayInfo}
                isMarked={Boolean(dayInfo)}
                isToday={cell.dateKey === calendar.todayDateKey}
                isSelected={calendar.selectedDateKey === cell.dateKey}
                handleChangeSchedule={handleChangeSchedule}
                cell={cell}
              />
            );
          })}
        </div>
      </div>
    </div>
  )
}
