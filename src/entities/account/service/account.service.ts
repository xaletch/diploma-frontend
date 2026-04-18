import { API } from "@/shared/api";
import type { IMe } from "../model/types/me.type";
import type { IPermission } from "../model/types/permission.type";

export const AccountApi = API.injectEndpoints({
  endpoints: build => ({
    /** 
      ===== ИНФОРМАЦИЯ ОБ АККАУНТЕ =====
    **/
    me: build.query<IMe, void>({
      query: () => ({
        url: `/v1/me`,
        method: "GET",
      }),
    }),

    /**
      ===== УРОВНИ ДОСТУПА =====
    **/
    permissions: build.query<IPermission[], void>({
      query: () => ({
        url: `/v1/me/permission`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useMeQuery,
  useLazyMeQuery,
  usePermissionsQuery,
  useLazyPermissionsQuery,
} = AccountApi;
