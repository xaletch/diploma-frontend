import { BookIcon } from "@/shared/icons";
import { Empty } from "@/shared/ui"
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"

export const BookingNotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <BookIcon />
        </EmptyMedia>
        <EmptyTitle>Бронирование не найдено</EmptyTitle>
        <EmptyDescription>
          Бронирование, которое вы ищете, не существует или было удалено.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
