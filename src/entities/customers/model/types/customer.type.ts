export type CustomerProfile = {
  full_name: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  avatar: string | null;
  birthday: string | null;
}

export interface ICustomers extends CustomerProfile {
  id: string;
  is_banned: boolean;
}

export type CustomerSortType = "newest" | "oldest";

export interface ICustomerQuery extends PaginationQuery {
  search?: string;
  sort?: CustomerSortType;
}

export interface ICustomer {
  id: string;
  note: string;
  is_banned: boolean;
  booking_count: number;
  profile: CustomerProfile & {
    id: string;
    email: string;
  }
}

export interface ICustomerDetailCredentials {
  customer_id: string;
}

export interface ICustomerCreateCredentials {
  first_name: string;
  last_name?: string;
  phone: string;
  note?: string | null;
  is_banned?: boolean;
}
