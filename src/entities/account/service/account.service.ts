import { API } from "@/shared/api";
import type { IMe } from "../model/types/me.type";
import type { IPermission } from "../model/types/permission.type";
import type { IPasswordChangeCredentials } from "../model/types/change-password.type";
import type { ILogoutCredentials } from "../model/types/logout.type";

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

    /**
      ===== СМЕНА ПАРОЛЯ =====
    **/
    changePassword: build.mutation<{ success: true }, IPasswordChangeCredentials>({
      query: (body) => ({
        url: `/v1/me/change-password`,
        method: "POST",
        body,
      }),
    }),

    /**
      ===== ВЫХОД ИЗ АККАУНТА =====
    **/
    logout: build.mutation<{ success: true }, ILogoutCredentials>({
      query: (body) => ({
        url: `/v1/auth/logout`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useMeQuery,
  useLazyMeQuery,
  usePermissionsQuery,
  useLazyPermissionsQuery,
  useChangePasswordMutation,
  useLogoutMutation,
} = AccountApi;
