import { ChangeYear, CurrentDate, formatInterval, useCalendar, WEEKDAYS_MONDAY_START, type DayInfo } from "@/features/calendar"
import { cn } from "@/shared/utils";

interface CalendarProps {
  dayInfoByKey: Map<string, DayInfo>;
  isLoading?: boolean;
}

export const Calendar = ({ dayInfoByKey, isLoading=false }: CalendarProps) => {
  const calendar = useCalendar();

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
          {isLoading && <div className="absolute top-0 left-0 h-full w-full rounded-xl z-10 backdrop-blur-xs" />}
          {calendar.calendarCells.map((cell) => {
            const dayInfo = dayInfoByKey.get(cell.dateKey)
            const isMarked = Boolean(dayInfo)
            const isToday = cell.dateKey === calendar.todayDateKey
            const isSelected = calendar.selectedDateKey === cell.dateKey

            return (
              <div
                key={cell.dateKey}
                onClick={() => {
                  if (!cell.inMonth) return;
                  calendar.handleSelectDate(cell.dateKey);
                  console.log(cell);
                }}
                aria-disabled={!cell.inMonth}
                className={cn(
                  "h-40 rounded-xl border-2 flex flex-col items-center relative overflow-hidden p-5", 
                  isSelected ? "border-primary/30 bg-muted" : "border-transparent bg-muted-foreground",
                  !cell.inMonth ? "bg-transparent! border-accent/10 text-accent/40! justify-center" : "",
                  isMarked ? "bg-muted" : "bg-red-100/17 text-red-100",
                )}
                aria-label={`День ${cell.day}`}
              >
                <div className={cn(
                  `text-md font-extrabold leading-4 px-3.5 py-0.5 border-b border-accent 
                  ${isToday ? "bg-white rounded-xl text-accent! border-accent!" : ""}`, 
                  !isMarked ? "border-red-100" : "",
                  !cell.inMonth ? "border-none" : "",
                )}>{cell.day}</div>

                {cell.inMonth && (
                  <div className="flex-1 w-full flex flex-col justify-center items-center gap-0.5">
                    {dayInfo?.kind !== "work" && (
                      <div className="text-sm text-red-100">Выходной</div>
                    )}

                    {dayInfo?.kind === "work" && (
                      <>
                        <div className="text-xs">
                          {formatInterval(dayInfo.intervals[0].start, dayInfo.intervals[0].end)}
                        </div>
                        {dayInfo.intervals[1] && (
                          <div className="text-xs">
                            {formatInterval(dayInfo.intervals[1].start, dayInfo.intervals[1].end)}
                          </div>
                        )}
                        {dayInfo.extraCount > 0 && (
                          <div className="text-xs">
                            ...
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
