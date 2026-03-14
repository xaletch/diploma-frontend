import { AddFillIcon } from "@/shared/icons"
import SvgUsersGroup from "@/shared/icons/UsersGroup"
import { Button, Empty } from "@/shared/ui"
import { EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"
import { Link } from "@tanstack/react-router"

export const EmployeeEmpty = () => {
  return (
    <Empty className="flex-1 h-full">
      <EmptyHeader>
        <EmptyMedia variant={"empty"}>
          <SvgUsersGroup />
        </EmptyMedia>
        <EmptyTitle>У вас еще нет сотрудников</EmptyTitle>
        <EmptyDescription>Давайте добавим первого сотрудника</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={"create"}>
          <Button 
            variant={"dashed"}
            size={"size_54"} 
            animation={"toggle_sm"}
            iconLeft={<AddFillIcon width={22} height={22} className="text-primary"/>}
          >Добавить сотрудника
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  )
}
