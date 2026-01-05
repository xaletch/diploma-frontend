const CURRENCY_SYMBOL_MAP: Record<ICurrency, string> = {
  USD: "$",
  EUR: "€",
  RUB: "₽",
};

export function getCurrencySymbol(currency: ICurrency): string {
  return CURRENCY_SYMBOL_MAP[currency];
}
