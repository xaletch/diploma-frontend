import { CashIcon, CreditCardIcon, OnlineIcon } from "../icons";

type EnumType = {
  label: string;
  icon: React.ComponentType
}

export const PAYMENT_METHODS_ENUM: Record<PaymentMethodType, EnumType> = {
  "cash": { label: "Наличными", icon: CashIcon },
  "online": { label: "Онлайн", icon: OnlineIcon },
  "credit_card": { label: "Картой", icon: CreditCardIcon },
} as const;

