import { API } from "@/shared/api";
import type { ISummary, ISummaryCredentials } from "../types/summary.type";
import type { IChart, IChartCredentials } from "../types/chart.type";

export const DashboardApi = API.injectEndpoints({
  endpoints: build => ({
    getSummary: build.query<ISummary, ISummaryCredentials>({
      query: ({ location_id }) => ({
        // url: `/v1/dashboard/summary?locationId=${location_id}`,
        url: `/v1/dashboard/summary`,
        method: "GET"
      }),
    }),

    getChart: build.query<IChart[], IChartCredentials>({
      query: ({ location_id, from, to }) => ({
        // url: `/v1/dashboard/chart?locationId=${location_id}&from=${from}&to=${to}`,
        url: `/v1/dashboard/chart`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSummaryQuery, useGetChartQuery } = DashboardApi;
