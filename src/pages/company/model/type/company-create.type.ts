export interface CompanyCredentials {
  name: string;
  public_name: string;
  currency: ICurrency;
  street?: string;
  house?: string;
  city: string;
  post_code?: string;
  country: string;
  region: string;
  timezone: string;
  timezone_offset: string;
  lat: number;
  lng: number;
  specialization: number;
  industry: number;
}

export interface CompanyCreateResponse {
  id: string;
  name: string;
  currency: ICurrency;
}
