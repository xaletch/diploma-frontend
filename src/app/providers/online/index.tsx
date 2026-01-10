import { useNavigatorOnline } from "@/shared/hooks";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const OnlineHandler = () => {
  const isOnline = useNavigatorOnline();

  const navigate = useNavigate();

  useEffect(() => {
    if (isOnline) return;
    navigate({ to: "/network/client", replace: true });
  }, [isOnline, navigate]);

  return null;
}
