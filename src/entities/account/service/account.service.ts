import { API } from "@/shared/api";
import { apiVersion } from "@/shared/constants";
import type { IMe } from "../model/types/me.type";

export const AccountApi = API.injectEndpoints({
  endpoints: build => ({
    me: build.query<IMe, void>({
      query: () => ({
        url: `/${apiVersion}/me`,
        method: "GET",
      }),
    }),
  }),
});

export const { useMeQuery, useLazyMeQuery } = AccountApi;