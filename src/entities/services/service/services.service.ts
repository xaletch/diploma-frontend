import { API } from "@/shared/api";
import type { IService, IServiceChangeResponse, IServiceCredentials, IServiceDeleteCredentials, IServiceDetailCredentials, IServiceEditCredentials, IServiceLocationsCredentials, IServiceQuery, IServices, IServiceUsersCredentials, UploadServiceAvatarCredentials } from "../model/types/service.type";
import { buildQuery } from "@/shared/lib";

const servicesApi = API.injectEndpoints({
  endpoints: build => ({
    /**
      ===== СПИСОК ВСЕХ УСЛУГ =====
    **/
    getServices: build.query<ApiResponse<IServices>, IServiceQuery>({
      query: (query) => ({
        url: buildQuery(`v1/services`, { ...query }),
        method: "GET",
      }),
      providesTags: ["SERVICES"],
    }),

    /**
      ===== ДЕТАЛИ УСЛУШИ =====
    **/
    getDetailService: build.query<IService, IServiceDetailCredentials>({
      query: ({ service_id }) => ({
        url: `v1/service/${service_id}`,
        method: "GET",
      }),
      providesTags: ["SERVICE"],
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

      async onQueryStarted({ service_id, body }, { dispatch, queryFulfilled }) {
        const result = dispatch(servicesApi.util.updateQueryData(
          "getDetailService",
          { service_id },
          (d) => { Object.assign(d, body) }
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),

    /**
      ====== ДОБАВЛЕНИЕ СОТРУДНИКА К УСЛУГЕ =====
    **/
    addUserToService: build.mutation<ApiSuccess, IServiceUsersCredentials>({
      query: ({ service_id, user_id }) => ({
        url: `/v1/service/users/${service_id}/${user_id}`,
        method: "POST",
      }),
      async onQueryStarted({ service_id, user }, { dispatch, queryFulfilled }) {
        const result = dispatch(servicesApi.util.updateQueryData(
          "getDetailService",
          { service_id },
          (d) => { d.users.push({ ...user, name: `${user.first_name} ${user.last_name}` })},
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),
    
    /**
      ====== УДАЛЕНИЕ СОТРУДНИКА ИЗ УСЛУГИ =====
    **/
    removeUserForService: build.mutation<ApiSuccess, IServiceUsersCredentials>({
      query: ({ service_id, user_id }) => ({
        url: `/v1/service/users/${service_id}/${user_id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ service_id, user }, { dispatch, queryFulfilled }) {
        const result = dispatch(servicesApi.util.updateQueryData(
          "getDetailService",
          { service_id },
          (d) => { d.users = d.users.filter(u => u.id !== user.id)},
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),

    /**
      ===== ДОБАВЛЕНИЕ ЛОКАЦИИ К УСЛУГЕ =====
    **/
    addLocationToService: build.mutation<ApiSuccess, IServiceLocationsCredentials>({
      query: ({ service_id, location_id }) => ({
        url: `v1/service/locations/${service_id}/${location_id}`,
        method: "POST",
      }),
      async onQueryStarted({ service_id, location }, { dispatch, queryFulfilled }) {
        const result = dispatch(servicesApi.util.updateQueryData(
          "getDetailService",
          { service_id },
          (d) => { d.locations.push({ ...location }) },
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),

    /**
      ===== УДАЛЕНИЕ ЛОКАЦИИ ИЗ УСЛУГИ =====
    **/
    removeLocationForService: build.mutation<ApiSuccess, IServiceLocationsCredentials>({
      query: ({ service_id, location_id }) => ({
        url: `v1/service/locations/${service_id}/${location_id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ service_id, location }, { dispatch, queryFulfilled }) {
        const result = dispatch(servicesApi.util.updateQueryData(
          "getDetailService",
          { service_id },
          (d) => { d.locations = d.locations.filter(l => l.id !== location.id) },
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),

    /**
      ===== УДАЛЕНИЕ УСЛУГИ =====
    **/
    deleteService: build.mutation<ApiSuccess, IServiceDeleteCredentials>({
      query: ({ service_id }) => ({
        url: `v1/service/${service_id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ service_id }, { dispatch, queryFulfilled }) {
        const result = dispatch(servicesApi.util.updateQueryData(
          "getServices",
          {},
          (d) => { d.data.splice(0, d.data.length, ...d.data.filter(s => s.id !== service_id)) }
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),

    /** 
      ===== ЗАГРУЗКА ФОТО УСЛУГИ =====
    **/
    photoService: build.mutation<{ avatar: string }, UploadServiceAvatarCredentials>({
      query: ({ service_id, body }) => ({
        url: `/v1/service/avatar/${service_id}`,
        method: "POST",
        body,
      }),
      
      async onQueryStarted({ service_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            servicesApi.util.updateQueryData(
              "getServices",
              {},
              (d) => {
                const loc = d.data.find(l => l.id === service_id);
                if (loc) loc.avatar = data.avatar;
              }
            )
          );

          dispatch(
            servicesApi.util.updateQueryData(
              "getDetailService",
              { service_id },
              (d) => { d.avatar = data.avatar }
            ),
          );
        } catch { /* */ }
      },
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
  useAddUserToServiceMutation,
  useRemoveUserForServiceMutation,
  useAddLocationToServiceMutation,
  useRemoveLocationForServiceMutation,
  useDeleteServiceMutation,
  usePhotoServiceMutation,
} = servicesApi;
