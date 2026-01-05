import type { IRole } from "./role.type";

export interface MeCompany {
  id: string;
  name: string;
  currency: string;
  industry: { id: number; name: string; };
  specialization: string;
}

export interface MeLocations {
  id: string;
  name: string;
  avatar: string;
}

export interface IMe {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  name: string;
  avatar: string | null;
  role: IRole;
  role_id: { id: number; };
  company: MeCompany | null;
  locations: MeLocations[];
}
