import { BookingChangeServicePrice, BookingSelectEmployee, BookingSelectServices, type ServiceSettingType } from "@/features/booking"
import { Button, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui"
import { useState } from "react";
import { BookingScheduleIntervals } from "./booking-schedule-intervals";
import { formatDateWeek } from "@/shared/utils";

interface BookingChangeServiceProps {
  location_id: string;
  date: string;
}

export const BookingChangeService = ({ location_id, date }: BookingChangeServiceProps) => {
  const [setting, setSetting] = useState<ServiceSettingType>(
    {
      service: undefined,
      employee: undefined,
      date: undefined,
      time: undefined,
    }
  );
  
  // const { closeDialog } = useDialog();

  const handleSave = () => {
    // closeDialog();
    console.log(setting);
  }

  const onSelectInterval = (time: string) => {
    setSetting((p) => ({ ...p, time }));
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Добавление услуги</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="space-y-5">
        <BookingSelectServices setSetting={setSetting} location_id={location_id} service={setting.service} services={setting.employee?.services} />
        {(setting.service) && <BookingChangeServicePrice setSetting={setSetting} price={setting?.service?.prices.price}/>}

        <BookingSelectEmployee setSetting={setSetting} location_id={location_id} employee={setting.employee} users={setting.service?.users} />

        {(setting.service && setting.employee) && (
          <>
            <div className="text-lg font-bold">{formatDateWeek(date)}</div>

            <BookingScheduleIntervals
              user_id={setting.employee.profile_id}
              location_id={location_id}
              date={date}
              current_time={""}
              duration={setting.service?.duration ?? 0}
              onSelectInterval={onSelectInterval}
            />
          </>
        )}
      </div>

      <DialogFooter>
        <DialogClose>Отменить</DialogClose>
        <Button variant={"dialog_apply"} onClick={handleSave}>Сохранить</Button>
      </DialogFooter>

    </DialogContent>
  )
}
