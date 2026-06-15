import type { ILocationAddress } from "@/entities/location";

export interface IBookingCustomer {
  id: string;
  full_name: string;
  first_name: string;
  profile_id: string;
  last_name: string | null;
  phone: string;
  email: string | null;
  avatar: string | null;
  birthday: string | null;
}

export interface IBookingEmployee {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string | null;
  phone: string;
  position: string;
  avatar: string | null;
}

export interface IBookingService {
  id: string;
  name: string;
  public_name: string;
  mark: MarkType;
  avatar: string | null;
  duration: number;
  prices: {
    price: number;
    cost_price: number;
  };
  category: string | null;
}

export interface IBookingOrder {
  id: string;
  status: OrderStatusType;
  subtotal: number;
  total: number;
  comment: string | null;
  discount: number | null;
  paid_at: boolean | null;
  tag: string;
  payment_method: PaymentMethodType;
}

export interface IBookingLocation {
  id: string;
  name: string;
  avatar: string | null;
  address: ILocationAddress;
}

export interface IBookingQuery extends PaginationQuery {
  customer?: string;
  employee?: string;
  service?: string;
  tag?: string;
  status?: BookingStatusType;
  sort?: SortType;
}

export interface IBookingCredentials extends IBookingQuery {
  location_id: string;
}

export interface IBooking {
  id: string;
  name: string;
  status: BookingStatusType;
  start_time: string;
  end_time: string;
  date: string;
  comment: string | null;
  customer: IBookingCustomer;
  employee: IBookingEmployee;
  service: IBookingService;
  subtotal: number;
  payment_method: PaymentMethodType;
  tag: string;
}

export interface IBookingDetail extends IBooking {
  location: IBookingLocation;
  order: IBookingOrder;
}

export interface IBookingActionCredentials {
  // name: string;
  start_time: string;
  end_time: string;
  date: string;
  comment?: string;
  service_id: string;
  employee_id: string;
  customer_id: string;
  location_id: string;
  payment_method: PaymentMethodType;
  status: BookingStatusType;
}

export interface IBookingConfirmCredentials {
  params: {
    booking_id: string;
  }
  body: {
    status: OrderStatusType;
    payment_method?: PaymentMethodType;
  }
}
