import { API } from "@/shared/api";
import { buildQuery } from "@/shared/lib";
import type { IOrder, IOrderQuery } from "../model/types/order.type";

export const orderApi = API.injectEndpoints({
  endpoints: builder => ({

    /**
      ===== СПИСОК ВСЕХ ЗАКАЗОВ =====
    **/
    getOrders: builder.query<ApiResponse<IOrder>, IOrderQuery>({
      query: ({  ...query }) => ({
        url: buildQuery(`/v1/orders`, { ...query }),
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetOrdersQuery,
} = orderApi;
