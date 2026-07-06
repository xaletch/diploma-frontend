import Cast from "@/shared/icons/Cast";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui"

interface OrderNotFoundProps {
  order_id: string;
}

export const OrderNotFound = ({ order_id }: OrderNotFoundProps) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Cast />
        </EmptyMedia>
        <EmptyTitle>Заказа #{order_id} не найден</EmptyTitle>
        <EmptyDescription>
          Заказа, который вы ищете, не существует или был удален.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
