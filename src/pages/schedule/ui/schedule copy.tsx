import { Button, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { ChevronRightIcon } from "@/shared/icons"
import { useSelector } from "react-redux"
import { useEffect, useMemo, useRef, useState } from "react"
import { useCreateMutation, useGetEmployeeServicesQuery, useUpdateMutation, type ISchedule } from "@/entities/schedule"
import { useAccount } from "@/entities/account"
import { cn } from "@/shared/utils"

const MONTHS_RU = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
] as const

const WEEKDAYS_RU_MONDAY_START = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] as const

const pad2 = (n: number) => String(n).padStart(2, "0")

type ParsedBackendDate = { day: number; monthIndex: number; year: number }

// Backend format example: "31-12-2025"
const parseBackendDate = (dateStr: string): ParsedBackendDate | null => {
  const s = dateStr.trim()
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(s)
  if (!match) return null

  const day = Number(match[1])
  const monthIndex = Number(match[2]) - 1
  const year = Number(match[3])

  if (monthIndex < 0 || monthIndex > 11) return null
  if (day < 1 || day > 31) return null

  const d = new Date(year, monthIndex, day)
  if (d.getFullYear() !== year || d.getMonth() !== monthIndex || d.getDate() !== day) return null

  return { day, monthIndex, year }
}

const toDateKey = (year: number, monthIndex: number, day: number) =>
  `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`

const toBackendDateString = (year: number, monthIndex: number, day: number) =>
  `${pad2(day)}-${pad2(monthIndex + 1)}-${year}`

export const Schedule = () => {
  const { account, location } = useSelector(useAccount)

  const today = useMemo(() => new Date(), [])
  const [viewYear, setViewYear] = useState(() => today.getFullYear())
  const [viewMonthIndex, setViewMonthIndex] = useState(() => today.getMonth())
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null)
  const [isMonthYearOpen, setIsMonthYearOpen] = useState(false)
  const monthYearDropdownRef = useRef<HTMLDivElement | null>(null)

  const user_id = account?.id ?? ""
  const location_id = location?.id ?? ""

  const { data: schedules, isLoading, refetch } = useGetEmployeeServicesQuery({ user_id, location_id });

  type DayInfo =
    | { kind: "weekend" }
    | { kind: "work"; intervals: Array<{ start: string; end: string }>; extraCount: number; totalCount: number }

  const isWeekendValue = (value: string) => {
    const s = value.trim().toLowerCase()
    return s === "выходной" || s.includes("выходной")
  }

  const isTimeValue = (value: string) => /^\d{2}:\d{2}$/.test(value.trim())

  const formatInterval = (start: string, end: string) => `${start} - ${end}`

  const dayInfoByKey = useMemo(() => {
    const map = new Map<string, DayInfo>()
    const scheduleList = (schedules ?? []) as ISchedule[]

    for (const item of scheduleList) {
      const parsed = parseBackendDate(item.date)
      if (!parsed) continue

      const key = toDateKey(parsed.year, parsed.monthIndex, parsed.day)
      const intervals = item.intervals ?? []

      // If intervals contain "Выходной" marker entries, remove them from time intervals.
      const workIntervals = intervals.filter((it) => {
        const start = it.start ?? ""
        const end = it.end ?? ""
        if (isWeekendValue(start) || isWeekendValue(end)) return false
        if (!isTimeValue(start) || !isTimeValue(end)) return false
        return true
      })

      if (workIntervals.length === 0) {
        map.set(key, { kind: "weekend" })
        continue
      }

      const totalCount = workIntervals.length
      const firstTwo = workIntervals.slice(0, 2).map((it) => ({ start: it.start, end: it.end }))
      const extraCount = Math.max(0, totalCount - firstTwo.length)
      map.set(key, { kind: "work", intervals: firstTwo, extraCount, totalCount })
    }

    return map
  }, [schedules])

  type ScheduleEditInfo = {
    scheduleId: number
    workIntervals: Array<{ start: string; end: string }>
  }

  const scheduleEditByKey = useMemo(() => {
    const map = new Map<string, ScheduleEditInfo>()
    const scheduleList = (schedules ?? []) as ISchedule[]

    for (const item of scheduleList) {
      const parsed = parseBackendDate(item.date)
      if (!parsed) continue

      const key = toDateKey(parsed.year, parsed.monthIndex, parsed.day)
      const intervals = item.intervals ?? []

      const workIntervals = intervals.filter((it) => {
        const start = it.start ?? ""
        const end = it.end ?? ""
        if (isWeekendValue(start) || isWeekendValue(end)) return false
        if (!isTimeValue(start) || !isTimeValue(end)) return false
        return true
      })

      map.set(key, {
        scheduleId: item.id,
        workIntervals: workIntervals.map((it) => ({ start: it.start, end: it.end })),
      })
    }

    return map
  }, [schedules])

  const [createSchedule, { isLoading: isCreating }] = useCreateMutation()
  const [updateSchedule, { isLoading: isUpdating }] = useUpdateMutation()

  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [dialogDate, setDialogDate] = useState<{
    dateKey: string
    year: number
    monthIndex: number
    day: number
    backendDate: string
  } | null>(null)
  const [editingScheduleId, setEditingScheduleId] = useState<number | null>(null)

  const [dialogIntervals, setDialogIntervals] = useState<Array<{ start: string; end: string }>>([
    { start: "00:00", end: "00:05" },
  ])

  const timeOptions = useMemo(() => {
    const times: string[] = []
    for (let m = 0; m < 24 * 60; m += 5) {
      const hh = Math.floor(m / 60)
      const mm = m % 60
      times.push(`${pad2(hh)}:${pad2(mm)}`)
    }
    // визуально "заканчивается в 00:00"
    times.push("00:00")
    return times
  }, [])

  const isScheduleSaving = isCreating || isUpdating

  const openScheduleDialogForCell = (cell: {
    dateKey: string
    year: number
    monthIndex: number
    day: number
    inMonth: boolean
  }) => {
    if (!cell.inMonth) return

    const backendDate = toBackendDateString(cell.year, cell.monthIndex, cell.day)
    const editInfo = scheduleEditByKey.get(cell.dateKey)

    const initialIntervals =
      editInfo && editInfo.workIntervals.length > 0 ? editInfo.workIntervals : [{ start: "00:00", end: "00:05" }]

    setEditingScheduleId(editInfo?.scheduleId ?? null)
    setDialogDate({
      dateKey: cell.dateKey,
      year: cell.year,
      monthIndex: cell.monthIndex,
      day: cell.day,
      backendDate,
    })
    setDialogIntervals(initialIntervals)
    setIsScheduleDialogOpen(true)
  }

  const handleSaveSchedule = async () => {
    if (!dialogDate) return
    if (!location_id) return
    if (!user_id) return

    const intervalsToSend = dialogIntervals
      .map((it) => ({ start: it.start.trim(), end: it.end.trim() }))
      .filter((it) => isTimeValue(it.start) && isTimeValue(it.end))

    const payloadBody = {
      date: dialogDate.backendDate,
      intervals: intervalsToSend,
      user_id,
    }

    try {
      if (editingScheduleId != null) {
        await updateSchedule({
          params: { location_id, schedule_id: editingScheduleId },
          body: payloadBody,
        }).unwrap()
      } else {
        await createSchedule({
          params: { location_id },
          body: payloadBody,
        }).unwrap()
      }

      setIsScheduleDialogOpen(false)
      await refetch()
    } catch (e) {
      // пока без toast, чтобы не трогать общую инфраструктуру
      console.error(e)
    }
  }

  useEffect(() => {
    if (!isScheduleDialogOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsScheduleDialogOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isScheduleDialogOpen])

  const yearRange = useMemo(() => {
    const current = today.getFullYear()
    const min = current - 10
    const max = current + 10
    return Array.from({ length: max - min + 1 }, (_, i) => min + i)
  }, [today])

  const yearMin = yearRange[0] ?? today.getFullYear()
  const yearMax = yearRange[yearRange.length - 1] ?? today.getFullYear()

  useEffect(() => {
    if (!isMonthYearOpen) return

    const onClick = (e: MouseEvent) => {
      const el = monthYearDropdownRef.current
      if (!el) return
      if (e.target instanceof Node && !el.contains(e.target)) setIsMonthYearOpen(false)
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMonthYearOpen(false)
    }

    window.addEventListener("mousedown", onClick)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("mousedown", onClick)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isMonthYearOpen])

  const calendarTitle = useMemo(() => `${MONTHS_RU[viewMonthIndex]} ${viewYear}`, [viewMonthIndex, viewYear])

  // Monday-start calendar grid: 7 cols, 6 rows (42 cells)
  const calendarCells = useMemo(() => {
    const firstDay = new Date(viewYear, viewMonthIndex, 1)
    const firstJsDay = firstDay.getDay() // 0..6 where 0 = Sunday
    const firstOffsetMondayStart = (firstJsDay + 6) % 7 // shift so Monday is 0

    const cells: Array<{
      inMonth: boolean
      day: number
      dateKey: string
      year: number
      monthIndex: number
    }> = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(viewYear, viewMonthIndex, 1 - firstOffsetMondayStart + i)
      const cellYear = date.getFullYear()
      const cellMonthIndex = date.getMonth()
      const cellDay = date.getDate()

      const inMonth = cellYear === viewYear && cellMonthIndex === viewMonthIndex
      const dateKey = toDateKey(cellYear, cellMonthIndex, cellDay)

      cells.push({
        inMonth,
        day: cellDay,
        dateKey,
        year: cellYear,
        monthIndex: cellMonthIndex,
      })
    }

    return cells
  }, [viewMonthIndex, viewYear])

  const todayDateKey = useMemo(() => {
    return toDateKey(today.getFullYear(), today.getMonth(), today.getDate())
  }, [today])

  const goPrevMonth = () => {
    setSelectedDateKey(null)
    setViewMonthIndex((prevMonth) => {
      if (prevMonth === 0) {
        setViewYear((prevYear) => prevYear - 1)
        return 11
      }
      return prevMonth - 1
    })
  }

  const goNextMonth = () => {
    setSelectedDateKey(null)
    setViewMonthIndex((prevMonth) => {
      if (prevMonth === 11) {
        setViewYear((prevYear) => prevYear + 1)
        return 0
      }
      return prevMonth + 1
    })
  }

  const goPrevYear = () => {
    if (viewYear <= yearMin) return
    setSelectedDateKey(null)
    setViewYear((y) => y - 1)
  }

  const goNextYear = () => {
    if (viewYear >= yearMax) return
    setSelectedDateKey(null)
    setViewYear((y) => y + 1)
  }

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Расписание</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      <div className="mt-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <Button variant={"secondary"} size={"icon_40"} onClick={goPrevMonth} aria-label={"Предыдущий месяц"}>
              <ChevronRightIcon className="rotate-180" width={20} height={20} />
            </Button>

            <div className="flex flex-col">
              <p className="text-lg font-extrabold leading-6">{calendarTitle}</p>
            </div>

            <Button variant={"secondary"} size={"icon_40"} onClick={goNextMonth} aria-label={"Следующий месяц"}>
              <ChevronRightIcon width={20} height={20} />
            </Button>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div ref={monthYearDropdownRef} className="relative">
              <Button
                variant={"secondary"}
                size={"default"}
                onClick={() => setIsMonthYearOpen((v) => !v)}
                aria-label={"Выбор месяца и года"}
                className="flex items-center gap-3"
              >
                {calendarTitle}
              </Button>

              {isMonthYearOpen && (
                <div
                  className="absolute right-0 top-full mt-3 z-20 w-90 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-xl overflow-hidden"
                  role="dialog"
                  aria-label="Календарь выбор месяца и года"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                    <span className="font-extrabold">{viewYear}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={"secondary"}
                        size={"icon_40"}
                        onClick={goPrevYear}
                        disabled={viewYear <= yearMin}
                        aria-label="Предыдущий год"
                      >
                        <ChevronRightIcon className="rotate-180" width={20} height={20} />
                      </Button>
                      <Button
                        variant={"secondary"}
                        size={"icon_40"}
                        onClick={goNextYear}
                        disabled={viewYear >= yearMax}
                        aria-label="Следующий год"
                      >
                        <ChevronRightIcon width={20} height={20} />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3">
                    {MONTHS_RU.map((monthLabel, idx) => {
                      const isSelected = idx === viewMonthIndex
                      const dateForKey = toDateKey(viewYear, idx, 1)

                      return (
                        <button
                          key={`${viewYear}-${idx}`}
                          type="button"
                          onClick={() => {
                            setSelectedDateKey(null)
                            setViewMonthIndex(idx)
                            setIsMonthYearOpen(false)
                          }}
                          className={cn("text-center text-sm font-semibold p-2")}
                          aria-label={`${monthLabel} ${viewYear}`}
                          data-date-key={dateForKey}
                        >
                          <span className={cn("text-center text-sm font-semibold px-2.5 py-1 rounded-xl", isSelected ? "font-extrabold bg-white" : "")}>{monthLabel}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 max-w-317 w-full mx-auto">
          <div className="grid grid-cols-7 gap-2.5">
            {WEEKDAYS_RU_MONDAY_START.map((w) => (
              <div key={w} className="text-md font-extrabold text-center">
                {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2.5 mt-2.5 relative">
            {isLoading && <div className="absolute top-0 left-0 h-full w-full rounded-xl z-10 backdrop-blur-xs" />}
            {calendarCells.map((cell) => {
              const dayInfo = dayInfoByKey.get(cell.dateKey)
              const isMarked = Boolean(dayInfo)
              const isToday = cell.dateKey === todayDateKey
              const isSelected = selectedDateKey === cell.dateKey

              return (
                <div
                  key={cell.dateKey}
                  onClick={() => {
                    if (!cell.inMonth) return
                    setSelectedDateKey(cell.dateKey)
                    openScheduleDialogForCell(cell)
                  }}
                  aria-disabled={!cell.inMonth}
                  className={cn(
                    "h-40 rounded-xl border-2 flex flex-col items-center relative overflow-hidden p-5 transition-colors", 
                    isSelected ? "border-primary bg-muted" : "border-transparent bg-muted-foreground",
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

      {isScheduleDialogOpen && dialogDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsScheduleDialogOpen(false)}
            aria-hidden="true"
          />

          <div
            className="relative w-full max-w-xl rounded-3xl bg-card/80 backdrop-blur-xl border border-border/50 p-6"
            role="dialog"
            aria-modal="true"
            aria-label="Добавить или изменить расписание"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-extrabold text-white/70">Расписание</p>
                <h3 className="text-2xl font-extrabold leading-7">
                  {pad2(dialogDate.day)}.{pad2(dialogDate.monthIndex + 1)}.{dialogDate.year}
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {dialogIntervals.map((interval, idx) => (
                <div key={`${idx}-${interval.start}-${interval.end}`} className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-extrabold text-white/70 mb-1">Начало</label>
                    <select
                      className="w-full h-12 rounded-xl border border-border/60 bg-card/40 text-white px-3"
                      value={interval.start}
                      onChange={(e) =>
                        setDialogIntervals((prev) =>
                          prev.map((it, i) => (i === idx ? { ...it, start: e.target.value } : it)),
                        )
                      }
                    >
                      {timeOptions.map((t, tIdx) => (
                        <option key={`${t}-${tIdx}`} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-xs font-extrabold text-white/70 mb-1">Конец</label>
                    <select
                      className="w-full h-12 rounded-xl border border-border/60 bg-card/40 text-white px-3"
                      value={interval.end}
                      onChange={(e) =>
                        setDialogIntervals((prev) =>
                          prev.map((it, i) => (i === idx ? { ...it, end: e.target.value } : it)),
                        )
                      }
                    >
                      {timeOptions.map((t, tIdx) => (
                        <option key={`${t}-${tIdx}`} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() =>
                  setDialogIntervals((prev) => [...prev, { start: "00:00", end: "00:05" }])
                }
                disabled={isScheduleSaving}
              >
                Добавить интервал
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                variant={"secondary"}
                size={"sm"}
                onClick={() => setIsScheduleDialogOpen(false)}
                disabled={isScheduleSaving}
              >
                Отмена
              </Button>

              <Button
                variant={"default"}
                size={"sm"}
                onClick={handleSaveSchedule}
                disabled={isScheduleSaving || dialogIntervals.length === 0}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
