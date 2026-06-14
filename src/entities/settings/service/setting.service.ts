import { API } from "@/shared/api";
import type { ISettingCompanyCredentials, ISettingPage, ISettingPageCredentials } from "../model/types/setting.type";
import type { IMeCompany } from "@/entities/account";

export const settingAPI = API.injectEndpoints({
  endpoints: build => ({
    /*
      ===== НАСТРОЙКА ОТОБРАЖЕНИЯ СТРАНИЦ СИСТЕМЫ =====
    */
    settingPage: build.mutation<ISettingPage, ISettingPageCredentials>({
      query: (body) => ({
        url: `/v1/settings/page`,
        method: "POST",
        body,
      }),
    }),

    /*
      ===== НАСТРОЙКА КОМПАНИИ =====
    */
    settingCompany: build.mutation<IMeCompany, ISettingCompanyCredentials>({
      query: (body) => ({
        url: `/v1/company`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useSettingPageMutation,
  useSettingCompanyMutation,
} = settingAPI;
