import { API } from "@/shared/api";
import { API_VERSION } from "@/shared/constants";
import type { IMe } from "../model/types/me.type";

export const AccountApi = API.injectEndpoints({
  endpoints: build => ({
    /** 
      ===== ИНФОРМАЦИЯ ОБ АККАУНТЕ =====
    **/
    me: build.query<IMe, void>({
      query: () => ({
        url: `/${API_VERSION}/me`,
        method: "GET",
      }),
    }),
  }),
});

export const { useMeQuery, useLazyMeQuery } = AccountApi;