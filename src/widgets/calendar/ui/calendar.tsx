import type { ISchedule } from "@/entities/schedule";
import { CalendarDayItem, ChangeYear, CurrentDate, useCalendar, WEEKDAYS_MONDAY_START, type DayInfo } from "@/features/calendar"
import { LazyBlur } from "@/widgets/loading";

interface CalendarProps {
  schedules?: ISchedule[];
  dayInfoByKey: Map<string, DayInfo>;
  isLoading?: boolean;
  isFetching: boolean;
  user_id: string;
}

export const Calendar = ({ schedules, dayInfoByKey, isLoading=false, isFetching, user_id }: CalendarProps) => {
  const calendar = useCalendar(user_id, schedules);

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
            const isMarked = Boolean(dayInfo);
            const isToday = cell.dateKey === calendar.todayDateKey;
            const isSelected = calendar.selectedDateKey === cell.dateKey;

            return (
              <CalendarDayItem
                key={cell.dateKey}
                dayInfo={dayInfo}
                isMarked={isMarked}
                isToday={isToday}
                isSelected={isSelected}
                handleChangeSchedule={calendar.handleChangeSchedule}
                cell={cell}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
