import type { EmployeeStatus } from "@/entities/employee";

/**
  &&&&& УБРАТЬ NAME ЗАМЕНИВ ЕГО НА FULL_NAME &&&&&
**/
export interface IUserProfile {
  id: string;
  email: string;
  name: string;
  full_name: string;
  phone: string;
  avatar: string | null;
  status: EmployeeStatus;
  position: string | null;
}
