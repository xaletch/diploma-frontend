import { accountSelector } from "@/entities/account"
import { bookingSelector } from "@/entities/booking";
import { Avatar } from "@/entities/user";
import { BookingSelectCustomer } from "@/features/booking";
import { Copyable } from "@/features/copyable";
import { AddIcon } from "@/shared/icons";
import { Button, Card, CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardHeader, CardTitle, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui"
import { formatPrice } from "@/shared/utils";
import { useSelector } from "react-redux"

export const BookingCreateForm = () => {
  const { location } = useSelector(accountSelector);
  const { booking_create } = useSelector(bookingSelector);

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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"dashed"} size={"icon_42"} className="w-full rounded-lg text-sm" iconLeft={<AddIcon width={18} height={18}/>}>Выбрать услугу</Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавление услуги</DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <CardTitle>Клиент</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <BookingSelectCustomer />

                {booking_create?.customer && (
                  <div className="space-y-5">
                    
                    <CardContentLabel>
                      <CardContentLabelTitle>Посещений</CardContentLabelTitle>
                      <CardContentLabelDescription>{booking_create.customer.bookings_count}</CardContentLabelDescription>
                    </CardContentLabel>

                    <CardContentLabel>
                      <CardContentLabelTitle>Номер телефона</CardContentLabelTitle>
                      <CardContentLabelDescription>
                        <Copyable text={booking_create.customer.phone}/>
                      </CardContentLabelDescription>
                    </CardContentLabel>

                    <CardContentLabel>
                      <CardContentLabelTitle>Электронная почта</CardContentLabelTitle>
                      <CardContentLabelDescription>
                        <Copyable text={booking_create.customer.email}/>
                      </CardContentLabelDescription>
                    </CardContentLabel>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Card className="max-w-93.75 w-full flex flex-col">
        <CardHeader className="pb-0">
          <CardTitle>Детали бронирования</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="font-medium opacity-60">Итого</div>
            <div className="font-semibold">{formatPrice(0)} ₽</div>
          </div>
          <div className="flex-1"></div>
          <div>
            <Button type={"button"}>Сохранить</Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
