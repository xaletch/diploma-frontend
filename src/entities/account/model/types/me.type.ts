import type { PageType } from "@/entities/settings";
import type { IRole } from "./role.type";

export interface IMeCompany {
  id: string;
  name: string;
  currency: CurrencyType;
  logo: string | null;
  site_url: string;
  industry: { id: number; name: string; };
  specialization: string;
}

export interface MeLocations {
  id: string;
  name: string;
  avatar: string;
  full_address: string;
}

export interface MeSettingPages {
  page: PageType;
  is_visible: boolean;
}

export interface MeSettings {
  pages: MeSettingPages[];
}

export interface IMe {
  id: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string | null;
  role: IRole;
  role_id: { id: number; };
  company: IMeCompany | null;
  locations: MeLocations[];
  settings: MeSettings;
}
