import type { IRole, RoleType } from "@/entities/account";

export interface IEmployee {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar: string | null;
  status: EmployeeStatus;
  position: string | null;
  role: RoleType;
}

export type EmployeeStatus = "active" | "inactive" | "invited";

export interface IEmployees {
  data: IEmployee[];
  // paginate
}

export interface IEmployeeByEmail {
  id: string;
  email: string;
  phone: string;
  role: IRole;
  first_name: string;
  last_name: string;
  avatar: string | null;
}

export interface IEmployeeByEmailCredentials {
  email: string;
}

export interface IEmployeeInviteCredentials {
  email: string;
  phone: string;
  first_name: string;
  last_name?: string;
  role: number;
  position: string;
  location_id: string;
  birth_date?: string;
  note?: string;
}

export interface IEmployeeInviteResponse {
  detail: { action: string };
  message: string;
}

export interface IEmployeeUpdateCredentials {
  body: IEmployeeInviteCredentials & { is_banned: boolean };
  employee_id: string;
}

export interface IEmployeeBlockedCredentials extends IEmployeeDeleteCredentials {
  body: { is_banned: boolean };
}

export interface IEmployeeDeleteCredentials {
  employee_id: string;
  location_id: string;
}

export interface IEmployeesList {
  id: string;
  name: string;
  avatar: string | null | undefined;
}
