import type { AppDispatch } from "@/app/providers/redux/config";
import { setAuthenticated } from "@/entities/account";
import { deleteCookie, setCookie } from "@/shared/utils";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface AuthReturnProps {
  login: (access: string, refresh: string) => void;
  refresh: (access: string) => void;
  logout: () => void;
}

export const useAuth = (): AuthReturnProps => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const login = useCallback((access: string, refresh: string) => {
    setCookie("access_token", access, { path: "/", sameSite: "Strict", secure: true });
    setCookie("refresh_token", refresh, { path: "/", sameSite: "Strict", secure: true });
    dispatch(setAuthenticated(true));
  }, []);

  const refresh = useCallback((access: string) => {
    setCookie("access_token", access);
  }, []);

  const logout = useCallback(() => {
    toast.dismiss();

    deleteCookie("access_token");
    deleteCookie("refresh_token");

    dispatch(setAuthenticated(false));

    navigate({ to: "/login" });
  }, [navigate]);

  return { login, refresh, logout };
}
