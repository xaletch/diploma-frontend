import { accountSelector } from "@/entities/account"
import { BookingSelectCustomerInfo, bookingSelector, BookingSelectServiceCard, BookingTotalPrice } from "@/entities/booking";
import { BookingSelectCustomer, BookingSelectDate, useBookingCreate } from "@/features/booking";
import { AddIcon } from "@/shared/icons";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Dialog } from "@/shared/ui"
import { useSelector } from "react-redux"
import { dialogSelector, useDialog } from "@/entities/dialog";
import { BookingChangeService } from "./components/booking-change-service";

export const BookingCreateForm = ({ date }: { date: string }) => {
  // const dispatch = useAppDispatch();
  const { location } = useSelector(accountSelector);
  const { booked, customer, date: current_date } = useSelector(bookingSelector);
  const { dialog } = useSelector(dialogSelector);

  const { closeDialog, openDialog } = useDialog();

  const { isLoading } = useBookingCreate();

  // useEffect(() => {
    // const payload: Partial<BookingCreate> = {};
    // if (date && !booking_create?.date) payload.date = date;
    // if (location && !booking_create?.location) payload.location = location;
    // if (Object.keys(payload).length > 0) dispatch(setBookingCreate(payload));
  // }, [date, location]);

  console.log("render", booked);

  return (
    <div className="mt-8 relative flex gap-8 h-full">
      <div className="max-w-140 mx-auto space-y-8 relative flex-1">

        {location && (
          <>
            <Card>
              <CardHeader className="pb-0 flex-row items-center justify-between gap-2.5">
                <CardTitle>Услуги</CardTitle>
                <Badge variant={"count"}>{booked?.length ?? 0}</Badge>
              </CardHeader>
              <CardContent>

                <div className="space-y-6">
                  {booked && booked?.length > 0 && (
                    <div className="grid gap-4">
                      {booked.map((book, idx) => (
                        <BookingSelectServiceCard
                          key={idx}
                          onClick={() => console.log("book: ", book)}
                          {...book}
                        />
                      ))}
                    </div>
                  )}

                  <Button
                    type={"button"}
                    onClick={() => openDialog("booking_service_create", undefined)}
                    variant={"dashed"}
                    size={"icon_42"}
                    className="w-full rounded-lg text-sm"
                    iconLeft={<AddIcon width={18} height={18}/>}
                  >Выбрать услугу</Button>
                </div>

                <Dialog open={dialog.name === "booking_service_create"} onOpenChange={closeDialog}>
                  <BookingChangeService location_id={location.id} date={date ?? current_date} />
                </Dialog>

              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Клиент</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <BookingSelectCustomer customer={customer} />

                {customer && <BookingSelectCustomerInfo customer={customer} />}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card className="max-w-93.75 w-full flex flex-col">
        <CardHeader className="pb-0">
          <CardTitle>Детали записи</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-8">
          <div className="flex items-center justify-between">
            <div className="font-medium opacity-60">Итого</div>
            <BookingTotalPrice booked={booked} />
          </div>

          <div className="flex-1 space-y-6">

            <BookingSelectDate date={current_date} />


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

            {/* !=====! УБРАТЬ ИНТЕРВАЛЫ !=====! */}
            {/* {(booking_create?.employee && location && booking_create.service) && (
              <BookingScheduleIntervals
                user_id={booking_create.employee.profile_id}
                location_id={location?.id}
                date={booking_create.date ?? date}
                current_time={booking_create.time}
                duration={booking_create.service.duration}
              />
            )} */}

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
              // onClick={() => handleSave(booking_create)}
              isLoading={isLoading}
              disabled={isLoading}
            >Сохранить</Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
