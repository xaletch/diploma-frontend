import type { ChangePasswordSchemaType } from "../schemas/change-password.schema";

interface useChangePasswordReturnProps {
  onSubmit: (data: ChangePasswordSchemaType) => Promise<void>;
  isLoading: boolean;
}

export const useChangePassword = (): useChangePasswordReturnProps => {
  const onSubmit = async (data: ChangePasswordSchemaType) => {
    try {
      console.log(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  return { onSubmit, isLoading: false }
}
