import { useGetBookingQuery } from "@/entities/booking";
import { ORDER_STATUS, ORDER_STATUS_TITLE } from "@/shared/constants/order-status.constant";
import SvgCalendar from "@/shared/icons/Calendar";
import { Badge, Button, Card, CardContent, PageHeader, PageHeaderActions, PageHeaderBackAction, PageHeaderTitle } from "@/shared/ui";
import { formatPrice, minuteFormat } from "@/shared/utils";
import { BookingNotFound } from "@/widgets/booking";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CircleCheck, Clock, DollarSign } from "lucide-react";

interface BookingResultProps {
  booking_id: string;
}

const statusIcon: Record<OrderStatusType, React.ReactNode> = {
  pending: <Clock />,
  open:    <SvgCalendar />,
  closed:  <AlertCircle />,
  paid:    <CircleCheck />,
  unpaid:  <DollarSign />,
};

export const BookingResult = ({ booking_id }: BookingResultProps) => {
  const { data, isLoading, isError } = useGetBookingQuery({ booking_id });
  
  if (isLoading || !data) return null;

  return (
    <>
      <PageHeader>
        <div>
          <PageHeaderTitle></PageHeaderTitle>
        </div>
        <PageHeaderActions>
          <PageHeaderBackAction />
        </PageHeaderActions>
      </PageHeader>

      {isError && <BookingNotFound />}

      <div className="flex items-center justify-center">

        <Card className="max-w-135 w-full mx-auto">
          <CardContent className="space-y-8">
            
            
            <div className="flex items-center flex-col justify-center gap-6">
              <Badge
                className="w-30 h-30 rounded-full text-white [&>svg]:size-20"
                variant={data.order.status}
              >
                {statusIcon[data.order.status]}
              </Badge>
              
              <div className="flex flex-col items-center space-y-2.5">
                <h3 className="text-2xl font-bold">{ORDER_STATUS_TITLE[data.order.status]}</h3>
                <Badge variant={data.order.status} className="py-1 px-2 text-xss text-white rounded-lg">{ORDER_STATUS[data.order.status]}</Badge>
              </div>
            </div>

            <div className="space-y-6">

              <div className="border-b border-border rounded-full" />

              <div>
                
                <div className="grid grid-cols-[48px_1fr_140px] space-y-2">
                  <div className="text-sm opacity-50">#</div>
                  <div className="text-sm opacity-50">Название</div>
                  <div className="text-sm opacity-50 text-end">Цена</div>
                </div>

                <div className="grid grid-cols-[48px_1fr_140px]">
                  <div className="relative">1</div>
                  <div>
                    <div className="font-medium text-md leading-5">{data.service.name}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-medium">{minuteFormat(data.service.duration)}</div>
                      <p className="text-xs font-medium leading-4">{data.employee.full_name}</p>
                    </div>
                  </div>
                  <div className="text-base font-bold flex flex-col items-end">
                    <p>{formatPrice(data.service.prices.price)} ₽</p>
                  </div>
                </div>

              </div>

              <div className="border-b border-border rounded-full" />
              <div className="flex items-center justify-between gap-2.5">
                <p className="font-medium opacity-50">Итоговая цена</p>
                <p className="font-medium">{formatPrice(data.service.prices.price)} ₽</p>
              </div>

              <div className="border-b border-border rounded-full" />

              <div className="flex items-center justify-center gap-2.5">
                <Link to={`/bookings/${data.id}`} className="w-full">
                  <Button size={"size_60"} variant={"white"} className="px-6">Посмотреть запись</Button>
                </Link>
                {(data.order.status === "paid" || data.order.status === "closed" || data.order.status === "unpaid") && (
                  <Link to={"/bookings/create"} className="w-full">
                    <Button size={"size_60"} className="px-6">Новоя запись</Button>
                  </Link>
                )}
                {data.order.status === "unpaid" && (
                  <Link to={`/bookings/${data.id}/checkout`} className="w-full">
                    <Button size={"size_60"} className="px-6">Оплатить</Button>
                  </Link>
                )}
              </div>

            </div>

          </CardContent>
        </Card>

      </div>
    </>
  )
}
