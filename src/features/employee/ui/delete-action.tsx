import { useDialog } from "@/entities/dialog";
import { Button } from "@/shared/ui"

interface EmployeeDeleteActionProps {
  employee_id: string;
}

export const EmployeeDeleteAction = ({ employee_id }: EmployeeDeleteActionProps) => {
  const { openDialog } = useDialog();
  return (
    <Button
      variant={"action"}
      size={"none"}
      className={"text-red"}
      onClick={() => openDialog("delete_employee", { employee_id })}
    >Удалить</Button>
  )
}
