import { toast } from "sonner";
import { useLoginMutation } from "../../service/auth.service";
import type { LoginType } from "../schemas/login.schema";
import type { UserSession } from "../types/auth.type";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth";
import { getErrorMessage } from "@/shared/utils";

interface LoginReturnProps {
  onSubmit: (data: LoginType) => void;
  isLoading: boolean;
}

export const useLogin = (): LoginReturnProps => {
  const [login, { isLoading }] = useLoginMutation();
  const location = useLocation()
  const navigate = useNavigate();

  const { login: loginState } = useAuth();

  const onSubmit = async (data: LoginType): Promise<void> => {
    try {
      const { access_token, refresh_token } = await login(data).unwrap() satisfies UserSession;

      loginState(access_token, refresh_token);

      const to = location.search.from || "/";
      navigate({ to: to, replace: true });
    }
    catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return { onSubmit, isLoading };
};
