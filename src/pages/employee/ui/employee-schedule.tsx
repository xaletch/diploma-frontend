import { useAccount } from "@/entities/account";
import { dialogSelector } from "@/entities/dialog";
import { useGetEmployeeServicesQuery, type ISchedule } from "@/entities/schedule";
import { isTimeValue, isWeekendValue, parseBackendDate, toDateKey, type DayInfo } from "@/features/calendar";
import { PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui"
import { Calendar } from "@/widgets/calendar";
import { EmployeeNotFound } from "@/widgets/employee";
import { ScheduleDialog } from "@/widgets/schedule";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const EmployeeSchedule = () => {
  const { location } = useSelector(useAccount);
  const { dialog } = useSelector(dialogSelector);
  
  const location_id = location?.id ?? "";

  const { employee_id } = useParams({ from: "/_app/_layout/employees/schedule/$employee_id" });

  const { data: schedules, isLoading, isError, isFetching } = useGetEmployeeServicesQuery({ user_id: employee_id, location_id });
  
  const dayInfoByKey = useMemo(() => {
    const map = new Map<string, DayInfo>();
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

      if (workIntervals.length === 0) {
        map.set(key, { kind: "weekend", intervals: null });
        continue;
      }

      const totalCount = workIntervals.length;
      const firstTwo = workIntervals.slice(0, 2).map((it) => ({ start: it.start, end: it.end }));
      const extraCount = Math.max(0, totalCount - firstTwo.length);
      map.set(key, { kind: "work", intervals: firstTwo, extraCount, totalCount });
    }

    return map;
  }, [schedules]);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Настройка расписания</PageHeaderTitle>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isError && <EmployeeNotFound />}
      {!isError && <Calendar schedules={schedules} dayInfoByKey={dayInfoByKey} isLoading={isLoading || isFetching} isFetching={isFetching} user_id={employee_id} />}
      {dialog.name === "schedule" && <ScheduleDialog location_id={location_id} data={dialog.data} />}
    </>
  )
}
