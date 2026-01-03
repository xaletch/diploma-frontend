import { toast } from "sonner";
import { useRegisterMutation } from "../../service/auth.service";
import type { UserSession } from "../types/auth.type";
import { useNavigate } from "@tanstack/react-router";
import type { RegisterType } from "../schemas/register.schema";
import { useAuth } from "@/features/auth";

interface RegisterReturnProps {
  onSubmit: (data: RegisterType) => void;
  isLoading: boolean;
}

export const useRegister = (): RegisterReturnProps => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data: RegisterType): Promise<void> => {
    try {
      const { access_token, refresh_token } = await register(data).unwrap() satisfies UserSession;

      login(access_token, refresh_token);

      navigate({ to: "/company/create", replace: true });
    }
    catch (err) {
      const { data } = err as HttpError;
      toast.error(data.title, { description: data.detail });
    }
  }

  return { onSubmit, isLoading };
};
