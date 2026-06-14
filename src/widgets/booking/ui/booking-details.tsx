import type { IBookingDetail } from "@/entities/booking"
import { Avatar } from "@/entities/user";
import { Copyable } from "@/features/copyable";
import { markClasses } from "@/shared/constants";
import { ORDER_STATUS } from "@/shared/constants/order-status.constant";
import { ChevronIcon, PencilEditIcon } from "@/shared/icons";
import { Badge, Button, Card, CardContent, CardContentLabel, CardContentLabelDescription, CardContentLabelTitle, CardDescription, CardHeader, CardTitle } from "@/shared/ui";
import { cn, formatDateWeek, formatPrice, minuteFormat } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import { CalendarIcon } from "lucide-react";

interface BookingDetailsProps {
  booking: IBookingDetail;
}

export const BookingDetails = ({ booking }: BookingDetailsProps) => {
  return (
    <div className="mt-8 h-full">
      
      <div className="grid grid-cols-3 gap-8 h-full">
      
      <div className="col-span-2 space-y-8">
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2">Услуги <Badge variant={"count"}>1</Badge></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2.5 items-center justify-between">
              <div className="flex gap-2.5 items-center">
                <Link to={`/business/services/${booking.service.id}`} className="relative">
                  <Avatar size={"md"} id={booking.service.id} name={booking.service.name} avatar_url={booking.service.avatar} />
                  <div className={cn("absolute -bottom-px -right-px w-2 h-2 rounded-full",  markClasses[booking.service.mark ?? "red"])} />
                </Link>
                <div>
                  <Link to={`/business/services/${booking.service.id}`} className="block font-medium text-md leading-5">{booking.service.name}</Link>
                  <div className="flex items-center gap-3.5">
                    <div className="leading-4.5">
                      <span className="text-xs font-medium">{booking.start_time}</span>
                      <span className="text-xs font-medium"> - </span>
                      <span className="text-xs font-medium">{booking.end_time}</span>
                    </div>
                    <div className="text-xs font-medium">{minuteFormat(booking.service.duration)}</div>
                    <Link to={`/employees/users/${booking.employee.id}`} className="flex items-center gap-2">
                      <Avatar size={"xs"} avatar_url={booking.employee.avatar} name={booking.employee.first_name} id={booking.employee.id} />
                      <p className="text-xs font-medium leading-4">{booking.employee.full_name}</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-lg font-bold">{formatPrice(booking.service.prices.price)} ₽</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-0">
            <Link to={`/customers/${booking.customer.id}`} className="flex flex-row items-center gap-4 p-6 hover:bg-card rounded-t-3xl duration-200">
              <div className="relative">
                <Avatar size={"xl"} id={booking.customer.id} name={booking.customer.full_name} avatar_url={booking.customer.avatar} />
              </div>
              <div className="flex justify-between gap-4 flex-1">
                <div className="space-y-0.5 flex-1">
                  <CardTitle className="capitalize">{booking.customer.full_name}</CardTitle>
                  <CardDescription className="opacity-50">Клиент</CardDescription>
                </div>
              </div>
            </Link>
          </CardHeader>
          <CardContent className="space-y-5">
            <CardContentLabel>
              <CardContentLabelTitle>Номер телефона</CardContentLabelTitle>
              <CardContentLabelDescription>
                <Copyable text={booking.customer.phone}/>
              </CardContentLabelDescription>
            </CardContentLabel>

            <CardContentLabel>
              <CardContentLabelTitle>Email</CardContentLabelTitle>
              <CardContentLabelDescription>
                <Copyable text={booking.customer.email}/>
              </CardContentLabelDescription>
            </CardContentLabel>

            <CardContentLabel>
              <CardContentLabelTitle>Дата рождения</CardContentLabelTitle>
              <CardContentLabelDescription>{booking.customer.birthday ?? "-"}</CardContentLabelDescription>
            </CardContentLabel>
          </CardContent>
        </Card>
      </div>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between w-full">
              <p>Итого</p>
              <span>{formatPrice(booking.service.prices.price)} руб.</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col">
            <div className="flex flex-col h-full space-y-6">
              
              {booking.order.id && (
                <Card className="bg-white mb-10">
                  <CardContent className="p-5 space-y-5">
                    <div className="flex items-center justify-between gap-2.5">
                      <Badge variant={booking.order.status}>{ORDER_STATUS[booking.order.status]}</Badge>
                      <div className="font-bold">{formatPrice(booking.service.prices.price)}₽</div>
                    </div>
                    <Link to="result">
                      <Button variant={"accent"} size={"size_48"} className="w-full bg-primary">Заказ № {booking.order.tag}</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              <Card className="relative bg-white/40">
                <CardContent>
                  <div className="text-center font-semibold text-lg">
                    <span>{formatDateWeek(booking.date)} </span>
                    <span>{booking.start_time}</span>
                  </div>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/40 border-4 border-card-ring w-11 h-11 flex items-center justify-center rounded-full">
                    <CalendarIcon width={22} height={22}/>
                  </div>
                </CardContent>
              </Card>
              
              <CardContentLabel>
                <CardContentLabelTitle>Примечание к бронированию</CardContentLabelTitle>
                <CardContentLabelDescription>{booking.comment ?? "-"}</CardContentLabelDescription>
              </CardContentLabel>
            </div>

            {booking.order.status !== "paid" && (
              <div className="flex gap-3">
                <Link to={"edit"}>
                  <Button type={"button"} size={"icon_60"} variant={"white"} className="p-5">
                    <PencilEditIcon width={24} height={24} />
                  </Button>
                </Link>
                <Link to={"checkout"} className="w-full">
                  <Button type={"button"} size={"size_60"} iconRight={<ChevronIcon width={20} height={20} />} className="w-full">Продолжить</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
