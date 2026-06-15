export type OrderSortType = "newest" | "oldest" | "price_asc" | "price_desc";

export interface IOrderQuery extends PaginationQuery {
  status?: OrderStatusType;
  sort?: OrderSortType;
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
}
