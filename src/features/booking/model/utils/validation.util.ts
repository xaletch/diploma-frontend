import type { BookingCreate } from "@/entities/booking";

interface ValidationError {
  field: string;
  message: string;
}

function validateBooking(booking: BookingCreate): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!booking.date)     errors.push({ field: "date",     message: "Выберите дату" });
  if (!booking.time)     errors.push({ field: "time",     message: "Выберите время" });
  if (!booking.service)  errors.push({ field: "service",  message: "Выберите услугу" });
  if (!booking.employee) errors.push({ field: "employee", message: "Выберите сотрудника" });
  if (!booking.customer) errors.push({ field: "customer", message: "Выберите клиента" });
  if (!booking.location) errors.push({ field: "location", message: "Выберите локацию" });
  // if (!booking.payment_method) errors.push({ field: "payment_method", message: "Выберите способ оплаты" });

  return errors;
}

export { validateBooking };
