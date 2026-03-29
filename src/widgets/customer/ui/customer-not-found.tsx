import { CustomerIcon } from "@/shared/icons";
import { Empty } from "@/shared/ui"
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"

export const CustomerNotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <CustomerIcon />
        </EmptyMedia>
        <EmptyTitle>Клиент не найден</EmptyTitle>
        <EmptyDescription>
          Клиент, которого вы ищете, не существует или был удален.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
