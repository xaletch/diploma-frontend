import type { RoleType } from "@/entities/account";

export interface IDirectoryEmployee {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: RoleType;
  position: string;
  avatar: string;
}

export interface IDirectoryLocationEmployee extends IDirectoryEmployee {
  services: Array<{ id: string }>;
}