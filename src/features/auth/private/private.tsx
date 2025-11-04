import { useMeQuery } from "@/entities/account";
import { getCookie } from "@/shared/utils";
import { AppLoading } from "@/widgets/loading";
import { Navigate, useLocation } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const location = useLocation();

  const access = !!getCookie("access_token");
  const refresh = !!getCookie("refresh_token");

  const { data, isLoading, isError } = useMeQuery();

  if (isLoading) return <AppLoading />;

  if (data?.company === null && location.pathname !== "/company/create") {
    return <Navigate to={"/company/create"} replace />;
  }

  if (isError || (!access || !refresh)) {
    return (
      <Navigate to={"/login"} search={{ from: location.pathname }} replace />
    )
  }

  return <>{children}</>;
}