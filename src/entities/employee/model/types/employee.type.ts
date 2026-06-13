import type { RoleType, IUserProfile } from "@/entities/account";
import type { IDirectoryService } from "@/entities/directories";

export interface IEmployee {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  avatar: string | null;
  status: EmployeeStatus;
  position: string | null;
  role: RoleType;
  is_banned: boolean;
}

export interface IEmployeeQuery extends PaginationQuery {
  search?: string;
  role?: string;
  status?: EmployeeStatus;
}

export interface IEmployeesCredentials extends IEmployeeQuery {
  location_id: string;
}

export interface IEmployeeProfile extends IUserProfile {
  birthday: string | null;
  first_name: string;
  last_name: string;
  full_name: string;
  role: RoleType;
}

export interface IEmployeeDetail {
  id: string;
  note: string | null;
  is_banned: boolean;
  location_count: number;
  service_count: number;
  locations: IDataList[];
  services: IDataList[];
  profile: IEmployeeProfile;
}

export type EmployeeStatus = "active" | "disable" | "invited";

export interface IEmployees {
  data: IEmployee[];
  // paginate
}

export interface IEmployeeByEmail {
  id: string;
  email: string;
  phone: string;
  role: RoleType;
  first_name: string;
  last_name: string;
  avatar: string | null;
  position: string;
}

export interface IEmployeeByEmailCredentials {
  email: string;
}

export interface ICheckEmployeeInLocationCredentials {
  user_id: string;
  location_id: string;
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

export interface IEmployeeEditCredentials {
  phone: string;
  first_name: string;
  last_name?: string;
  role: number;
  position: string;
  birth_date?: string | null;
  note?: string | null;
}

export interface IEmployeeInviteResponse {
  detail: { profile_id: string } & IEmployee;
  message: string;
}

export interface IEmployeeUpdateCredentials {
  body: IEmployeeEditCredentials;
  employee_id: string;
  location_id: string;
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

export interface IServiceToUserCredentials {
  service_id: string;
  employee_id: string;
  location_id: string;
  service: IDirectoryService;
}

export interface IServiceFromUserCredentials {
  service_id: string;
  employee_id: string;
  location_id: string;
}

/*
  ===== ЗАГРУЗКА КАРТИНКИ =====
*/
export interface UploadEmployeeAvatarCredentials {
  location_id: string;
  user_id: string;
  body: FormData;
}

export interface IEmployeePasswordChangeCredentials {
  employee_id: string;
  body: {
    new_password: string;
    confirm_password: string;
  }
}