import { toast } from "sonner";
import type { RegisterType } from "../schemas/register.schema";
import type { UserSession } from "../types/auth.type";
import { useInviteMutation } from "../../service/auth.service";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/features/auth";
import { getErrorMessage } from "@/shared/utils";

interface InviteReturnProps {
  onSubmit: (data: RegisterType, token: string) => Promise<void>;
  isLoading: boolean;
}

export const useInvite = (): InviteReturnProps => {
  const [register, { isLoading }] = useInviteMutation();
  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data: RegisterType, token: string): Promise<void> => {
    if (!token) return;
    try {
      const { access_token, refresh_token } = await register({ ...data, token, }).unwrap() satisfies UserSession;

      login(access_token, refresh_token);

      navigate({ to: "/company/create", replace: true });
    }
    catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  return { onSubmit, isLoading };
};