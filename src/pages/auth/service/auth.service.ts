import { API } from "@/shared/api";
import { API_VERSION } from "@/shared/constants";
import type { LoginCredentials } from "../model/types/login.type";
import type { UserSession } from "../model/types/auth.type";
import type { RegisterCredentials } from "../model/types/register.type";

export const AuthApi = API.injectEndpoints({
  endpoints: build => ({
    /** 
      ===== РЕГИСТРАЦИЯ =====
    **/
    register: build.mutation<UserSession, RegisterCredentials>({
      query: (body) => ({
        url: `/${API_VERSION}/auth/register`,
        method: "POST",
        body,
      }),
    }),
    
    /** 
      ===== АВТОРИЗАЦИЯ =====
    **/
    login: build.mutation<UserSession, LoginCredentials>({
      query: (body) => ({
        url: `/${API_VERSION}/auth/login`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = AuthApi;
