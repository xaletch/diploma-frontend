import { API } from "@/shared/api";
import type { LocationCredentials, ILocationResponse, ILocationDetail, ILocationUser, ILocationUserQuery, UpdateLocationRequest, ChangeLocationStatusRequest } from "../model/types/location.type";

export const serviceAPI = API.injectEndpoints(({
  endpoints: (build) => ({
    /** 
      ===== СПИСОК ЛОКАЦИЙ =====
    **/
    getLocations: build.query<ILocationResponse[], void>({
      query: () => ({
        url: `/v1/locations`,
        method: "GET",
      }),
      providesTags: ["LOCATIONS"]
    }),

    /** 
      ===== ДЕТАЛИ ЛОКАЦИИ =====
    **/
    getLocation: build.query<ILocationDetail, string>({
      query: (locationId) => ({
        url: `/v1/location/${locationId}`,
        method: "GET",
      }),
      providesTags: ["LOCATIONS"]
    }),

    /** 
      ===== СПИСОК СОТРУДНИКОВ ЛОКАЦИИ =====
    **/
    getLocationUsers: build.query<ILocationUser[], string>({
      query: (locationId) => ({
        url: `/v1/locations/${locationId}/users`,
        method: "GET",
      }),
    }),

    /** 
      ===== ИНФОРМАЦИЯ О СОТРУДНИКЕ =====
    **/
    getLocationUser: build.query<ILocationUser, ILocationUserQuery>({
      query: ({ location_id, user_id }) => ({
        url: `/v1/location/${location_id}/user/${user_id}`,
        method: "GET",
      }),
    }),

    /** 
      ===== СОЗДАНИЕ ЛОКАЦИИ =====
    **/
    createLocation: build.mutation<ILocationResponse, LocationCredentials>({
      query: (body) => ({
        url: `/v1/location`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["LOCATIONS"],
    }),

    /** 
      ===== РЕДАКТИРОВАНИЕ ЛОКАЦИИ =====
    **/
    editLocation: build.mutation<ILocationResponse, UpdateLocationRequest>({
      query: ({ location_id, body }) => ({
        url: `/v1/location/${location_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LOCATIONS"],
    }),

    /** 
      ===== ИЗМЕНЕНИЕ СТАТУСА ЛОКАЦИИ (ONLINE | OFFLINE) =====
    **/
    onlineLocation: build.mutation<void, ChangeLocationStatusRequest>({
      query: ({ locationId, active }) => ({
        url: `/v1/location/${locationId}/status`,
        method: "POST",
        body: { active },
      }),
      invalidatesTags: ["LOCATIONS"],
    }),
  }),
}));

export const {
  useGetLocationsQuery,
  useLazyGetLocationsQuery,
  useGetLocationQuery,
  useLazyGetLocationQuery,
  useGetLocationUsersQuery,
  useLazyGetLocationUsersQuery,
  useGetLocationUserQuery,
  useLazyGetLocationUserQuery,
  useCreateLocationMutation,
  useEditLocationMutation,
  useOnlineLocationMutation,
} = serviceAPI;