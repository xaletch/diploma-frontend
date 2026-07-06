import { API } from "@/shared/api";
import { buildQuery } from "@/shared/lib";
import type { IOrder, IOrderDetail, IOrderQuery } from "../model/types/order.type";

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

    /**
      ===== ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ЗАКАЗЕ =====
    **/
    getOrder: builder.query<IOrderDetail, { order_id: string }>({
      query: ({  order_id }) => ({
        url: `/v1/orders/${order_id}`,
        method: "GET",
      }),
    }),

  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
} = orderApi;
