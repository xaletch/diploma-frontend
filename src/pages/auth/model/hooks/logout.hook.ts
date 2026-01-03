import { useAuth } from "@/features/auth";

interface LogoutReturnProps {
  logout: () => void
}

export const useLogout = (): LogoutReturnProps => {
  const { logout: logoutState } = useAuth();
  
  const logout = () => logoutState();

  return { logout }
}