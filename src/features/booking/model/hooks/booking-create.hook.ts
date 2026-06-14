import { resetBookingCreate, useCreateBookingMutation, type BookingCreate, type IBookingActionCredentials } from "@/entities/booking";
import { calcEndTime } from "@/shared/utils";
import { toast } from "sonner";
import { validateBooking } from "../utils/validation.util";
import { useAppDispatch } from "@/shared/hooks";
import { useNavigate } from "@tanstack/react-router";

interface UseBookingCreateReturnProps {
  handleSave: (booking: BookingCreate | null) => Promise<void>;
  isLoading: boolean;
}

export const useBookingCreate = (): UseBookingCreateReturnProps => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [create, { isLoading }] = useCreateBookingMutation();

  const handleSave = async (booking: BookingCreate | null): Promise<void> => {
    if (!booking) {
      toast.error("Нет данных для бронирования");
      return;
    }

    const errors = validateBooking(booking);

    if (errors.length > 0) {
      toast.error("Заполните все поля", {
        description: errors.map((e) => e.message).join(" • "),
      });
      return;
    }

    const end_time =
      booking.time && booking.service?.duration
        ? calcEndTime(booking.time, booking.service.duration)
        : "";

    const req = {
      start_time: booking.time!,
      end_time,
      date: booking.date!,
      service_id: booking.service!.id,
      employee_id: booking.employee!.profile_id,
      payment_method: "cash", // ВРЕМЕННАЯ ЗАГЛУШКА !!!!!
      customer_id: booking.customer!.profile_id,
      location_id: booking.location!.id,
      status: "pending",
    } satisfies IBookingActionCredentials;

    toast.promise(create(req).unwrap(), {
      success: () => {
        dispatch(resetBookingCreate());
        navigate({ to: "/bookings" });
        return "Бронирование создано";
      },
      error: "Не удалось создать бронирование",
    });
  };

  return { handleSave, isLoading };
}
