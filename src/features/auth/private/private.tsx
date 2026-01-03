import { useAccount } from "@/entities/account";
import { Navigate } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useSelector(useAccount);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} search={{ from: location.pathname }} />;
  }
}
