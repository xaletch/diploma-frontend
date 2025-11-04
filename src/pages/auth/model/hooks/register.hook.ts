import { toast } from "sonner";
import { useRegisterMutation } from "../../service/auth.service";
import { setCookie } from "@/shared/utils";
import type { UserSession } from "../types/auth.type";
import { useLocation, useNavigate } from "@tanstack/react-router";
import type { RegisterType } from "../schemas/register.schema";

interface RegisterReturnProps {
  onSubmit: (data: RegisterType) => void;
  isLoading: boolean;
}

export const useRegister = (): RegisterReturnProps => {
  const [register, { isLoading }] = useRegisterMutation();
  const location = useLocation()
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterType): Promise<void> => {
    try {
      const { access_token, refresh_token } = await register(data).unwrap() satisfies UserSession;

      setCookie("access_token", access_token, 60);
      setCookie("refresh_token", refresh_token, 30 * 24 * 60);

      const to = location.search.from || "/";
      navigate({ to: to, replace: true });
    }
    catch (err) {
      const { data } = err as HttpError;
      toast.error(data.title, { description: data.detail });
    }
  }

  return { onSubmit, isLoading };
};
