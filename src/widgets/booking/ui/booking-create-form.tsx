import { accountSelector } from "@/entities/account"
import { BookingSelectCustomerInfo, bookingSelector, BookingSelectServiceCard, BookingTotalPrice, setBookingCreate, type BookingCreate } from "@/entities/booking";
import { Avatar } from "@/entities/user";
import { BookingSelectCustomer, BookingSelectDate, useBookingCreate } from "@/features/booking";
import { AddIcon } from "@/shared/icons";
import { Button, Card, CardContent, CardHeader, CardTitle, Dialog } from "@/shared/ui"
import { useSelector } from "react-redux"
import { BookingServiceSetting } from "./components/booking-service-setting";
import { dialogSelector, useDialog } from "@/entities/dialog";
import { BookingScheduleIntervals } from "./components/booking-schedule-intervals";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks";

export const BookingCreateForm = ({ date }: { date: string }) => {
  const dispatch = useAppDispatch();
  const { location } = useSelector(accountSelector);
  const { booking_create } = useSelector(bookingSelector);
  const { dialog } = useSelector(dialogSelector);

  const { closeDialog, openDialog } = useDialog();

  const { handleSave, isLoading } = useBookingCreate();

  useEffect(() => {
    const payload: Partial<BookingCreate> = {};
    if (date && !booking_create?.date) payload.date = date;
    if (location && !booking_create?.location) payload.location = location;
    if (Object.keys(payload).length > 0) dispatch(setBookingCreate(payload));
  }, [date, location]);

  return (
    <div className="mt-8 relative flex gap-8 h-full">
      <div className="max-w-140 mx-auto space-y-8 relative flex-1">
        <Card>
          <CardContent>
            {!location ? (
              <div>Загрузка...</div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Avatar size={"md"} id={location?.id} name={location?.name} avatar_url={location?.avatar} />

                <div>
                  <h3 className="text-base font-medium leading-5">{location?.name}</h3>
                  <p className="text-xs leading-4">{location?.full_address}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {location && (
          <>
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Услуга</CardTitle>
              </CardHeader>
              <CardContent>


                {(booking_create?.service && booking_create.employee) ? (
                  <BookingSelectServiceCard onClick={() => openDialog("booking_service_create", undefined)} service={booking_create.service} employee={booking_create.employee} />
                ) : (
                  <Button type={"button"} onClick={() => openDialog("booking_service_create", undefined)} variant={"dashed"} size={"icon_42"} className="w-full rounded-lg text-sm" iconLeft={<AddIcon width={18} height={18}/>}>Выбрать услугу</Button>
                )}

                <Dialog open={dialog.name === "booking_service_create"} onOpenChange={closeDialog}>
                  <BookingServiceSetting location_id={location.id} service={booking_create?.service} employee={booking_create?.employee} />
                </Dialog>

              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Клиент</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <BookingSelectCustomer customer={booking_create?.customer} />

                {booking_create?.customer && <BookingSelectCustomerInfo customer={booking_create.customer} />}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card className="max-w-93.75 w-full flex flex-col">
        <CardHeader className="pb-0">
          <CardTitle>Детали бронирования</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <div className="font-medium opacity-60">Итого</div>
            <BookingTotalPrice price={booking_create?.service?.prices.price ?? 0} />
          </div>

          <div className="flex-1 space-y-6">

            <BookingSelectDate date={booking_create?.date} />


            {/* SELECT DATE */}
            {/* 
              ЭТО ВООБЩЕ НЕ ТО. ТУТ МНЕ НАДО СНАЧАЛА ДЕЛАТЬ ЗАПРОС НА ПОЛУЧЕНИЕ ГРАФИКА РАБОТЫ
              В ВЫБРАННЫЙ ДЕНЬ И УЖЕ ВЫБИРАТЬ ВРЕМЯ - ВО СКОЛЬКО ЗАПИСАТЬСЯ
            */}
            {/* {!booking_create?.employee?.schedule && (
              <div>
                <div className="grid grid-cols-3 gap-2.5">
                  <BookingChangeTime schedule={booking_create.employee.schedule} current_time={booking_create?.time} />
                </div>
              </div>
            )} */}
            {(booking_create?.employee && location && booking_create.service) && (
              <BookingScheduleIntervals
                user_id={booking_create.employee.profile_id}
                location_id={location?.id}
                date={booking_create.date ?? date}
                current_time={booking_create.time}
                duration={booking_create.service.duration}
              />
            )}

            {/* <Select
              value={booking_create?.payment_method}
              placeholder={"Способ оплаты"}
              options={[
                { id: 1, value: "online", label: "Онлайн" },
                { id: 2, value: "cash", label: "Наличные" },
                { id: 3, value: "credit_card", label: "Банковская карта" },
              ]}
              onChange={(v) => dispatch(setBookingCreate({ payment_method: v as PaymentMethodType }))}
            /> */}

          </div>
          
          <div>
            <Button
              type={"button"}
              onClick={() => handleSave(booking_create)}
              isLoading={isLoading}
              disabled={isLoading}
            >Сохранить</Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
