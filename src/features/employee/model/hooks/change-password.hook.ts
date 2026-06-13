import { useEmployeeChangePasswordMutation } from "@/entities/employee";
import type { EmployeeChangePasswordSchemaType } from "../schemas/change-password.schema";
import { getErrorMessage } from "@/shared/utils";
import { toast } from "sonner";

interface useEmployeeChangePasswordReturnProps {
  onSubmit: (body: EmployeeChangePasswordSchemaType, employee_id: string) => Promise<void>;
  isLoading: boolean;
}

export const useEmployeeChangePassword = (): useEmployeeChangePasswordReturnProps => {

  const [change, { isLoading }] = useEmployeeChangePasswordMutation();

  const onSubmit = async (body: EmployeeChangePasswordSchemaType, employee_id: string) => {
    try {
      await change({ body, employee_id }).unwrap();

      toast.success("Пароль успешно изменен");
    }
    catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return { onSubmit, isLoading }
}
