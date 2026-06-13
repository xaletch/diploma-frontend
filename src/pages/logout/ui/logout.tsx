import { logout, useLogoutMutation } from "@/entities/account";
import { useAppDispatch } from "@/shared/hooks";
import { getCookie, getErrorMessage } from "@/shared/utils";
import { AppLoading } from "@/widgets/loading"
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react"
import { toast } from "sonner";

export const Logout = () => {
  const navigate = useNavigate();
  const [LOGOUT] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const logout_ = useCallback(async () => {
    const token = getCookie("refresh_token") ?? "";

    try {
      await LOGOUT({ token }).unwrap();
      dispatch(logout());
      setTimeout(() => navigate({ to: "/login" }), 1000);
    }
    catch (err) {
      toast.error(getErrorMessage(err));
    }
  }, [LOGOUT]);

  useEffect(() => {
    logout_();
  }, []);

  return (
    <div className="fixed top-0 left-0 bg-background w-full h-full">
      <AppLoading />
    </div>
  )
}
