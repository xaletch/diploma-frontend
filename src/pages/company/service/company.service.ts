import { API } from "@/shared/api";
import { API_VERSION } from "@/shared/constants";
import type { ISpecialization } from "../model/type/specialization.type";
import type { IIndustry } from "../model/type/industry.type";
import type { CompanyCreateResponse, CompanyCredentials } from "../model/type/company-create.type";

export const companyApi = API.injectEndpoints({
  endpoints: (builder) => ({
    /** 
      ===== СПИСОК СПЕЦИАЛИЗАЦИЙ =====
    **/
    getSpecialization: builder.query<ISpecialization[], void>({
      query: () => ({
        url: `/${API_VERSION}/company/specializations`,
        method: "GET",
      }),
    }),

   /** 
      ===== СПИСОК ИНДУСТРИЙ =====
    **/
    getSpecializationIndustry: builder.query<IIndustry[], number>({
      query: (specialization_id) => ({
        url: `/${API_VERSION}/company/industry/${specialization_id}`,
        method: "GET",
      }),
    }),

    /** 
      ===== СОЗДАНИЕ КОМПАНИИ =====
    **/
    companyCreate: builder.mutation<CompanyCreateResponse, CompanyCredentials>({
      query: (body) => ({
        url: `/${API_VERSION}/company`,
        method: "POST",
        body, 
      }),
    }),
  }),
});

export const {
  useGetSpecializationQuery,
  useGetSpecializationIndustryQuery, 
  useCompanyCreateMutation
} = companyApi;
