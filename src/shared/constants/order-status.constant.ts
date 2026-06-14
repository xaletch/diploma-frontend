export const ORDER_STATUS: Record<OrderStatusType, string> = {
  pending: "В ожидании",
  open: "Новый",
  closed: "Отменен",
  paid: "Оплачен",
  unpaid: "Не оплачен"
};

export const ORDER_STATUS_TITLE: Record<OrderStatusType, string> = {
  pending: "Заказ в работе",
  open: "Новый заказ",
  closed: "Заказ был отменен",
  paid: "Заказ завершен",
  unpaid: "Заказ не оплачен"
};
