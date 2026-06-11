import { API } from "@/shared/api";
import type { ICustomer, ICustomers, ICustomerDetailCredentials, ICustomerCreateCredentials, ICustomerQuery } from "../model/types/customer.type";
import type { ICustomerBooking } from "../model/types/customer-booking.type";
import { buildQuery } from "@/shared/lib";

export const customerApi = API.injectEndpoints({
  endpoints: build => ({

    /**
      ===== СПИСОК КЛИЕНТОВ ЛОКАЦИИ =====
    **/
    getCustomers: build.query<ApiResponse<ICustomers>, ICustomerQuery>({
      query: (query) => ({
        url: buildQuery(`/v1/company/customer`, { ...query }),
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "CUSTOMERS" as const, id })),
              { type: "CUSTOMERS", id: "LIST" },
            ]
          : [{ type: "CUSTOMERS", id: "LIST" }],
    }),

    /**
      ===== ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О КЛИЕНТЕ =====
    **/
    getCustomer: build.query<ICustomer, ICustomerDetailCredentials>({
      query: ({ customer_id }) => ({
        url: `/v1/company/customer/${customer_id}`,
        method: "GET",
      }),
    }),

    /**
      ===== БРОНИРОВАНИЯ КЛИЕНТА =====
            == В РАЗРАБОТКЕ ==
    **/
    bookingCustomer: build.query<ICustomerBooking[], ICustomerDetailCredentials>({
      query: ({ customer_id }) => ({
        url: `/v1/customer/bookings/${customer_id}`,
        method: "GET",
      }),
    }),

    /**
      ===== СОЗДАНИЕ КЛИЕНТА ОТ ЛИЦА КОМПАНИИ =====
                == БЕТА ВЕРСИЯ ==
    **/
    createCustomer: build.mutation<ICustomers, ICustomerCreateCredentials>({
      query: (body) => ({
        url: `/v1/company/customer`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CUSTOMERS"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useBookingCustomerQuery,
  useCreateCustomerMutation,
} = customerApi;
