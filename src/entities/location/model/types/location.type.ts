import type { IRole, IUserProfile } from "@/entities/account";
import type { AddressCredentials } from "@/shared/types";

export interface ILocationAddress {
  full_address: string;
  street: string | null;
  house: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
}

export type IMap = {
  lat: string;
  lng: string;
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

export interface LocationUsersList {
  id: string;
  name: string;
  avatar: string | null;
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

export interface ILocationDetail extends ILocation {
  address: ILocationAddress;
  timezone: string;
  user_count: number;
  users: LocationUsersList[];
}

export interface LocationCredentials extends AddressCredentials {
  name: string;
  description?: string;
  phone: string;

  comfort?: string[];
  category?: string[];
}

export interface UpdateLocationRequest {
  location_id: string;
  body: LocationCredentials;
}

export interface ChangeLocationStatusRequest {
  locationId: string;
  active: boolean;
}
