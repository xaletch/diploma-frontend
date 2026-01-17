export interface AddressCredentials {
  street?: string | null;
  house?: string | null;
  city: string;
  post_code?: string | null;
  country: string | null;
  region: string;
  timezone: string;
  timezone_offset: string;
  lat: number;
  lng: number;
}
