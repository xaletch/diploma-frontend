import { getCookie } from "@/shared/utils"
import { Navigate, useLocation } from "@tanstack/react-router";
import type { PropsWithChildren } from "react"

export const AuthLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const isAccess = !!getCookie("access_token");

  if (isAccess) {
    const from = location.search.from || "/";
    return <Navigate to={from} replace />;
  }

  return (
    <div className="flex flex-col h-full py-8">
      <div className="flex-1 flex">
        <div className="sm:max-w-115 mx-auto w-full flex flex-col flex-1 justify-center">{children}</div>
      </div>
      <div>
        <p className="text-xss text-center">© 2025 G CRM. Все права защищены.</p>
      </div>
    </div>
  )
}
