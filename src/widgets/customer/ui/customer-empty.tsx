import { AddFillIcon, CustomerIcon } from "@/shared/icons"
import { Button, Empty } from "@/shared/ui"
import { EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui"
import { Link } from "@tanstack/react-router"

export const CustomerEmpty = () => {
  return (
    <Empty className="flex-1 h-full">
      <EmptyHeader>
        <EmptyMedia variant={"empty"}>
          <CustomerIcon />
        </EmptyMedia>
        <EmptyTitle>У вас еще нет клиентов</EmptyTitle>
        {/* <EmptyDescription></EmptyDescription> */}
      </EmptyHeader>
      <EmptyContent>
        <Link to={"/customers/create"}>
          <Button 
            variant={"dashed"}
            size={"size_54"} 
            animation={"toggle_sm"}
            iconLeft={<AddFillIcon width={22} height={22} className="text-primary"/>}
          >Добавить нового клиента
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  )
}
