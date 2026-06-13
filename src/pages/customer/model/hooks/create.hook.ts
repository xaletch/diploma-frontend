import { useCreateCustomerMutation, type ICustomerCreateCredentials } from "@/entities/customers";
import { toast } from "sonner";
import type { customerSchemaType } from "../schemas/customer.schema";
import { useNavigate } from "@tanstack/react-router";
import { getErrorMessage } from "@/shared/utils";

interface useCustomerCreateReturnProps {
  onSubmit: (data: customerSchemaType) => Promise<void>;
  isLoading: boolean;
}

export const useCustomerCreate = (): useCustomerCreateReturnProps => {
  const [customer, { isLoading }] = useCreateCustomerMutation();
  const navigate = useNavigate();
  
  const onSubmit = async (data: customerSchemaType): Promise<void> => {
    try {
      const req = {
        ...data,
        is_banned: false,
      } satisfies ICustomerCreateCredentials;
      const res = await customer(req).unwrap();

      console.log(res);

      navigate({ to: "/customers" });
    }
    catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  }

  return { onSubmit, isLoading };
}
