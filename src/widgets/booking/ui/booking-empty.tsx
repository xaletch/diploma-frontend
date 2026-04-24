import { AddFillIcon, BookIcon } from "@/shared/icons"
import { Button, Empty } from "@/shared/ui"
import { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"
import { Link } from "@tanstack/react-router"

export const BookingEmpty = () => {
  return (
    <Empty className="flex-1 h-full">
      <EmptyHeader>
        <EmptyMedia variant={"empty"}>
          <BookIcon />
        </EmptyMedia>
        <EmptyTitle>Записей пока нет.</EmptyTitle>
        <EmptyDescription>Создайте первую запись или дождитесь бронирования от клиента.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={"/bookings/create"}>
          <Button
            variant={"dashed"}
            size={"size_54"} 
            animation={"toggle_sm"}
            iconLeft={<AddFillIcon width={22} height={22} className="text-primary"/>}
          >Добавить бронирование
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  )
}
