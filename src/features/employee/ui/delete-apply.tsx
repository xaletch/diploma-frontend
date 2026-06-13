import { accountSelector } from "@/entities/account";
import { useEmployeeDeleteMutation } from "@/entities/employee";
import { Button } from "@/shared/ui";
import { getErrorMessage } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface EmployeeDeleteApplyProps {
  employee_id: string;
  closeDialog: () => void;
}

export const EmployeeDeleteApply = ({ employee_id, closeDialog }: EmployeeDeleteApplyProps) => {
  const { location } = useSelector(accountSelector);
  const [employee, { isLoading }] = useEmployeeDeleteMutation();

  const navigate = useNavigate();

  const handleDelete = async (location_id: string, employee_id: string): Promise<void> => {
    try {
      await employee({ location_id, employee_id, }).unwrap();
      navigate({ to: "/employees/users" });
    }
    catch (error) {
      toast.error(getErrorMessage(error));
    }
    finally {
      closeDialog();
    }
  }

  return (
    <Button
      variant={"dialog_apply"}
      onClick={() => handleDelete(location!.id, employee_id)}
      isLoading={isLoading}
      disabled={isLoading}
    >Да, я хочу удалить</Button>
  )
}
