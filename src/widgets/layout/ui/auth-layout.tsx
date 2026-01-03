import { useAccount } from "@/entities/account";
import { Navigate } from "@tanstack/react-router";
import type { PropsWithChildren } from "react"
import { useSelector } from "react-redux";

export const AuthLayout = ({ children }: PropsWithChildren) => {
  const { isAuthenticated } = useSelector(useAccount);

  if (isAuthenticated) return <Navigate to={"/"} replace />;

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
