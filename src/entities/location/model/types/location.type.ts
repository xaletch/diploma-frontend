import type { IRole, IUserProfile } from "@/entities/account";
import type { AddressCredentials } from "@/shared/types";

export interface ILocationAddress {
  full_address: string;
  street: string | null;
  house: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  post_code: string | null;
  map: IMap;
}

export interface IMap {
  lat: string;
  lng: string;
}

export interface ILocationQuery extends PaginationQuery {
  name?: string;
  search?: string;
  category?: string;
  active?: number;
}

export interface ILocation {
  id: string;
  name: string;
  avatar: string | null;
  is_active: boolean;
  description: string | null;
  phone: string;
  category: string[];
  comfort: string[];
}

export interface ILocationResponse extends ILocation {
  address: ILocationAddress,
}

export interface ILocationUsersList {
  id: string;
  name: string;
  avatar: string | null | undefined;
}

export interface ILocationUserQuery {
  location_id: string;
  user_id: string;
}

export interface ILocationUser {
  user_id: string;
  role: IRole;
  is_banned: boolean;
  profile: IUserProfile;
}

export interface ILocationServices {
  id: string;
  name: string;
  mark: MarkType;
  avatar: string | null;
}

export interface ILocationDetail extends ILocation {
  address: ILocationAddress;
  timezone: string;
  user_count: number;
  users: ILocationUsersList[];
  services: ILocationServices[];
}

export interface LocationCredentials extends AddressCredentials {
  name: string;
  description?: string | null;
  phone: string;

  comfort?: string[];
  category?: string[];
}

export interface UpdateLocationCredentials {
  location_id: string;
  body: LocationCredentials;
}

export interface ChangeLocationStatusCredentials {
  locationId: string;
  active: boolean;
}

/*
  ===== ЗАГРУЗКА КАРТИНКИ =====
*/
export interface UploadLocationAvatarCredentials {
  location_id: string;
  body: FormData;
}
