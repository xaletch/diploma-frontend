// import { setBookingCreate } from "@/entities/booking";
import { useDialog } from "@/entities/dialog";
import type { IDirectoryLocationEmployee, IDirectoryLocationService } from "@/entities/directories";
// import { BookingChangeServicePrice, BookingSelectEmployee, BookingSelectServices, type ServiceSettingType } from "@/features/booking"
// import { useAppDispatch } from "@/shared/hooks";
import { Button, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui"
// import { useState } from "react";

interface BookingServiceSettingProps {
  location_id: string;
  service: IDirectoryLocationService | undefined;
  employee: IDirectoryLocationEmployee | undefined;
}

// eslint-disable-next-line no-empty-pattern
export const BookingServiceSetting = ({  }: BookingServiceSettingProps) => {
  // const [setting, setSetting] = useState<ServiceSettingType>({ service: undefined, employee: undefined });

  // const dispatch = useAppDispatch();
  
  const { closeDialog } = useDialog();

  const handleSave = () => {
    // if (!setting?.employee && !setting?.service) return;
    // dispatch(setBookingCreate({ ...setting }));
    closeDialog();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Добавление услуги</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="space-y-5">
        {/* <BookingSelectServices setSetting={setSetting} location_id={location_id} service={service || setting.service} services={employee?.services || setting.employee?.services} /> */}
        {/* {(setting.service || service) && <BookingChangeServicePrice setSetting={setSetting} price={setting?.service?.prices.price ?? service?.prices.price}/>} */}

        {/* <BookingSelectEmployee setSetting={setSetting} location_id={location_id} employee={employee || setting.employee} users={service?.users || setting.service?.users} /> */}
      </div>

      <DialogFooter>
        <DialogClose>Отменить</DialogClose>
        <Button variant={"dialog_apply"} onClick={handleSave}>Сохранить</Button>
      </DialogFooter>

    </DialogContent>
  )
}
