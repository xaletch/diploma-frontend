import { useChangePasswordMutation } from "@/entities/account";
import type { ChangePasswordSchemaType } from "../schemas/change-password.schema";
import { getErrorMessage } from "@/shared/utils";
import { toast } from "sonner";

interface useChangePasswordReturnProps {
  onSubmit: (data: ChangePasswordSchemaType) => Promise<void>;
  isLoading: boolean;
}

export const useChangePassword = (): useChangePasswordReturnProps => {

  const [change, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      const { old_password, password: new_password } = data;
      await change({ old_password, new_password }).unwrap();

      toast.success("Пароль успешно изменен");
    }
    catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return { onSubmit, isLoading }
}
