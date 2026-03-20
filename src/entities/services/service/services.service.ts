import { API } from "@/shared/api";
import type { IService, IServiceChangeResponse, IServiceCredentials, IServiceDeleteCredentials, IServiceDetailCredentials, IServiceEditCredentials, IServiceLocationsCredentials, IServices, IServiceUsersCredentials } from "../model/types/service.type";

const ServicesApi = API.injectEndpoints({
  endpoints: build => ({
    /**
      ===== СПИСОК ВСЕХ УСЛУГ =====
    **/
    getServices: build.query<IServices[], void>({
      query: () => ({
        url: `v1/services`,
        method: "GET",
      }),
      providesTags: result => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "SERVICES" as const, id })),
            { type: "SERVICES", id: "LIST" },
          ];
        } else {
          return [
            { type: "SERVICES", id: "LIST" },
          ];
        }
      }
    }),

    /**
      ===== ДЕТАЛИ УСЛУШИ =====
    **/
    getDetailService: build.query<IService, IServiceDetailCredentials>({
      query: ({ service_id }) => ({
        url: `v1/service/${service_id}`,
        method: "GET",
      }),
    }),

    /**
      ===== СОЗДАНИЕ УСЛУГИ =====
    **/
    createService: build.mutation<IServiceChangeResponse, IServiceCredentials>({
      query: (body) => ({
        url: `v1/service`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["SERVICES"],
    }),

    /**
      ===== РЕДАКТИРОВАНИЕ УСЛУГИ =====
    **/
    editService: build.mutation<ApiSuccess, IServiceEditCredentials>({
      query: ({ service_id, body }) => ({
        url: `v1/service/${service_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["SERVICES"],
    }),

    /**
      ====== РЕДАКТИРОВАТЬ ПОЛЬЗОВАТЕЛЕЙ УСЛУГИ (ДОБАВИТЬ/УДАЛИТЬ СОТРУДНИКА) =====
    **/
    editUsersService: build.mutation<ApiSuccess, IServiceUsersCredentials>({
      query: ({ service_id, body }) => ({
        url: `v1/service/users/${service_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SERVICES"],
    }),

    /**
      ===== РЕДАКТИРОВАТЬ ЛОКАЦИИ УСЛУГИ (ДОБАВИТЬ/УДАЛИТЬ ЛОКАЦИЮ) =====
    **/
    editLocationsService: build.mutation<ApiSuccess, IServiceLocationsCredentials>({
      query: ({ service_id, body }) => ({
        url: `v1/service/locations/${service_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["SERVICES"],
    }),

    /**
      ===== УДАЛЕНИЕ УСЛУГИ =====
    **/
    deleteService: build.mutation<ApiSuccess, IServiceDeleteCredentials>({
      query: ({ service_id }) => ({
        url: `v1/service/${service_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SERVICES"],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useLazyGetServicesQuery,
  useGetDetailServiceQuery,
  useLazyGetDetailServiceQuery,
  useCreateServiceMutation,
  useEditServiceMutation,
  useEditUsersServiceMutation,
  useEditLocationsServiceMutation,
  useDeleteServiceMutation,
} = ServicesApi;
