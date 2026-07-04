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
