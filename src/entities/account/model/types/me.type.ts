interface MeCompany {
  id: string;
  name: string;
  currency: string;
  industry: { id: number; name: string; };
  specialization: string;
}

interface MeLocations {
  id: string;
  name: string;
  avatar: string;
}

export interface IMe {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  name: string;
  avatar: string | null;
  role: string;
  role_id: { id: number; };
  company: MeCompany | null;
  locations: MeLocations[] | null;
}
