import SvgUsersGroup from "@/shared/icons/UsersGroup";
import { Empty } from "@/shared/ui"
import { EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/shared/ui/empty/ui/empty"

export const EmployeeNotFound = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <SvgUsersGroup />
        </EmptyMedia>
        <EmptyTitle>Сотрудник не найден</EmptyTitle>
        <EmptyDescription>
          Сотрудика, которого вы ищете, не существует или был удален.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
