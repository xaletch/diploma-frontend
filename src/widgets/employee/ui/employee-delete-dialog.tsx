import { useDialog } from "@/entities/dialog"
import { EmployeeDeleteApply } from "@/features/employee";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui"

interface EmployeeDeleteDialogProps {
  employee: {
    employee_id: string;
  }
}

export const EmployeeDeleteDialog = ({ employee }: EmployeeDeleteDialogProps) => {
  const { closeDialog } = useDialog();
  return (
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Удаление сотрудника</DialogTitle>
          <DialogDescription>Сотрудник будет удален только из текущей локации.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>Отменить</DialogClose>
          <EmployeeDeleteApply employee_id={employee.employee_id} closeDialog={closeDialog} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
