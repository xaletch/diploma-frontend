import { deleteCookie } from "@/shared/utils";

interface LogoutReturnProps {
  logout: () => void
}

export const useLogout = (): LogoutReturnProps => {
  const logout = () => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
  }

  return { logout }
}