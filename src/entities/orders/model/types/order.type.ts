import type { ServiceStatusType } from "@/entities/services";

export type OrderSortType = "newest" | "oldest" | "price_asc" | "price_desc";

export interface IOrderQuery extends PaginationQuery {
  status?: OrderStatusType;
  sort?: OrderSortType;
}

export interface IOrderCustomer {
  id: string;
  avatar: string | null;
  first_name: string;
  last_name: string | null;
  full_name: string;
  phone: string;
}

export interface IOrder {
  id: string;
  tag: string;
  status: OrderStatusType;
  subtotal: number;
  total: number;
  payment_method: PaymentMethodType;
  is_payment: boolean;
  booking_ids: string[];
  customer: IOrderCustomer;
}


/**
  ===== ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ЗАКАЗЕ =====
**/
export interface IOrderBookingCustomer {
  id: string;
  profile_id: string;
  first_name: string;
  last_name: string | null;
  full_name: string;
  avatar: string | null;
  phone: string;
  email: string | null;
}

export interface IOrderBookingEmployee {
  id: string;
  first_name: string;
  last_name: string | null;
  full_name: string;
  avatar: string | null;
  phone: string;
  email: string;
}

export interface IOrderBookingService {
  id: string;
  mark: MarkType;
  type: ServiceStatusType;
  name: string;
  category: string | null;
  avatar: string | null;
  duration: number;
  price: { price: number; cost_price: number };
}

export interface IOrderBooking {
  id: string;
  tag: string;
  date: Date;
  status: BookingStatusType;
  comment: string | null;
  time: { start: string; end: string };
  customer: IOrderBookingCustomer;
  employee: IOrderBookingEmployee;
  service: IOrderBookingService;
}

export interface IOrderDetail {
  bookings: IOrderBooking[];
  id: string;
  tag: string;
  status: OrderStatusType;
  payment_method: PaymentMethodType | null;
  total: number | null;
  subtotal: number;
  discount: number | null;
  is_payment: boolean;
}