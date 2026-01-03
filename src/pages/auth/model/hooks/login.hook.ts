import { toast } from "sonner";
import { useLoginMutation } from "../../service/auth.service";
import type { LoginType } from "../schemas/login.schema";
import { setCookie } from "@/shared/utils";
import type { UserSession } from "../types/auth.type";
import { useLocation, useNavigate } from "@tanstack/react-router";

interface LoginReturnProps {
  onSubmit: (data: LoginType) => void;
  isLoading: boolean;
}

export const useLogin = (): LoginReturnProps => {
  const [login, { isLoading }] = useLoginMutation();
  const location = useLocation()
  const navigate = useNavigate();

  const onSubmit = async (data: LoginType): Promise<void> => {
    try {
      const { access_token, refresh_token } = await login(data).unwrap() satisfies UserSession;

      setCookie("access_token", access_token);
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
