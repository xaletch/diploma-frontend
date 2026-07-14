import Cast from "@/shared/icons/Cast"
import { Button, Empty } from "@/shared/ui"
import { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"
import { Link } from "@tanstack/react-router"

export const OrderEmpty = () => {
  return (
    <Empty className="flex-1 h-full">
      <EmptyHeader>
        <EmptyMedia variant={"empty"}>
          <Cast />
        </EmptyMedia>
        <EmptyTitle>Платежей пока нет.</EmptyTitle>
        <EmptyDescription>Здесь появятся оплаты за записи, как только клиент внесёт первый платёж.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={"/bookings"}>
          <Button
            variant={"dashed"}
            size={"size_54"} 
            animation={"toggle_sm"}
          >Перейти к записям
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  )
}
