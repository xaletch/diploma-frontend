import { CloseOrderIcon, NewOrderIcon, PaymentSuccessIcon, PendingOrderIcon, UnpaidOrderIcon } from "../icons";

type OrderEnumStatusType = {
  title: string;
  label: string;
  icon: React.ComponentType;
}

export const ORDER_STATUS: Record<OrderStatusType, OrderEnumStatusType> = {
  pending: { title: "Заказ в работе", label: "В ожидании", icon: PendingOrderIcon },
  open: { title: "Новый заказ", label: "Новый", icon: NewOrderIcon },
  closed: { title: "Заказ был отменен", label: "Отменен", icon: CloseOrderIcon },
  paid: { title: "Заказ завершен", label: "Оплачен", icon: PaymentSuccessIcon },
  unpaid: { title: "Заказ не оплачен", label: "Не оплачен", icon: UnpaidOrderIcon }
};

export const ORDER_STATUS_TITLE: Record<OrderStatusType, string> = {
  pending: "Заказ в работе",
  open: "Новый заказ",
  closed: "Заказ был отменен",
  paid: "Заказ завершен",
  unpaid: "Заказ не оплачен"
};
