import { Route } from "@/app/routes/_app/_layout/bookings";
import type { IBookingQuery } from "@/entities/booking"
import { Button, Card, CardContent } from "@/shared/ui"
import { cn } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";

const variant = ["all", "pending", "confirmed", "cancelled"] as BookingStatusType[] | "all"[];

const BOOKING_STATUS: Record<BookingStatusType | "all", string> = {
  "all": "Все",
  "pending": "В ожидании",
  "confirmed": "Подтверждено",
  "completed": "Завершено",
  "cancelled": "Отменено",
};

export const BookingSort = ({ status }: IBookingQuery) => {
  const navigate = useNavigate({ from: Route.fullPath });
  
  const handleChange = (name: "status", value: BookingStatusType | "all" ) => {
    navigate({
      search: (p: IBookingQuery) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = p;
        return value === "all" ? { ...rest } : { ...rest, [name]: value, page: 1 };
      }
    });
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <Card>
          <CardContent className="p-2 gap-2 flex">
            {variant.map((v, idx) => (
              <Button
                key={idx}
                variant={"action"}
                className={cn((v === "all" ? !status : status === v) ? "bg-white" : "")}
                size={"size_40"}
                onClick={() => handleChange("status", v)}
              >{BOOKING_STATUS[v]}</Button>
            ))}
          </CardContent>
        </Card>

        {/* <Search
          placeholder={"Поиск по имени и номеру телефона"}
          value={searchValue}
          onValueChange={setSearchValue}
        /> */}
      </div>
    </div>
  )
}
