import { getCurrencySymbol } from "./currency-symbol.util";

export function formatCurrency(value: number | string, currency: ICurrency): string {
  const symbol = getCurrencySymbol(currency);

  const currencyPref: ICurrency[] = ["USD", "EUR"];
  return currencyPref.includes(currency) ? `${symbol}${value}` : `${value} ${symbol}`;
}
