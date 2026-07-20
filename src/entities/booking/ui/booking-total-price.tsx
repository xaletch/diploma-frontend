import { formatPrice } from "@/shared/utils";
import { useMemo } from "react";
import type { BookingCreate } from "../model/slice/booking.slice";

interface BookingTotalPriceProps {
  booked: BookingCreate[];
}

export const BookingTotalPrice = ({ booked }: BookingTotalPriceProps) => {
  // const totalPrice = useMemo(() => formatPrice(price), [price]);
  const totalPrice = useMemo(() => {
    const price = booked.reduce((sum, book) => sum + Number(book.service?.prices.price), 0);
    return formatPrice(price);
  }, [booked]);

  return <div className="font-semibold">{totalPrice} ₽</div>
}
