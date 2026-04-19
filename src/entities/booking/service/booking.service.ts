import { API } from "@/shared/api";
import type { IBooking, IBookingDetail } from "../model/types/booking.type";

export const bookingApi = API.injectEndpoints({
  endpoints: builder => ({

    /**
      ===== СПИСОК ВСЕХ БРОНИРОВАНИЙ =====
    **/
    getBookings: builder.query<IBooking[], { location_id: string }>({
      query: ({ location_id }) => ({
        url: `/v1/bookings/location/${location_id}`,
        method: "GET",
      }),
    }),

    /**
      ===== ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О БРОНИРОВАНИИ =====
    **/
    getBooking: builder.query<IBookingDetail, { booking_id: string }>({
      query: ({ booking_id }) => ({
        url: `/v1/booking/${booking_id}`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  
} = bookingApi;
