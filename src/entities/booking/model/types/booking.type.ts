import type { ILocationAddress } from "@/entities/location";

export interface IBookingCustomer {
  id: string;
  full_name: string;
  first_name: string;
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
  comment: string | null;
  discount: null;
  payment_method: PaymentMethodType;
}

export interface IBookingLocation {
  id: string;
  name: string;
  avatar: string | null;
  address: ILocationAddress;
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
}

export interface IBookingDetail extends IBooking {
  location: IBookingLocation;
  order: IBookingOrder;
}
