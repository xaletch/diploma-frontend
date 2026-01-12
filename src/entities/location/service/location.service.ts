import { API } from "@/shared/api";
import { apiVersion } from "@/shared/constants";
import type { LocationCredentials, ILocationResponse, ILocationDetail, ILocationUser, ILocationUserQuery, UpdateLocationRequest } from "../model/types/location.type";

export const serviceAPI = API.injectEndpoints(({
  endpoints: (build) => ({
    getLocations: build.query<ILocationResponse[], void>({
      query: () => ({
        url: `/${apiVersion}/locations`,
        method: "GET",
      }),
      providesTags: ["LOCATIONS"]
    }),
    getLocation: build.query<ILocationDetail, string>({
      query: (locationId) => ({
        url: `/${apiVersion}/location/${locationId}`,
        method: "GET",
      }),
    }),
    getLocationUsers: build.query<ILocationUser[], string>({
      query: (locationId) => ({
        url: `/${apiVersion}/locations/${locationId}/users`,
        method: "GET",
      }),
    }),
    getLocationUser: build.query<ILocationUser, ILocationUserQuery>({
      query: ({ location_id, user_id }) => ({
        url: `/${apiVersion}/location/${location_id}/user/${user_id}`,
        method: "GET",
      }),
    }),
    createLocation: build.mutation<ILocationResponse, LocationCredentials>({
      query: (body) => ({
        url: `/${apiVersion}/location`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["LOCATIONS"],
    }),
    updateLocation: build.mutation<UpdateLocationRequest, ILocationResponse>({
      query: (body) => ({
        url: `/${apiVersion}/location`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LOCATIONS"],
    }),
    deleteLocation: build.mutation<void, string>({
      query: (locationId) => ({
        url: `/${apiVersion}/location/${locationId}`,
        method: "DELETE",
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
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = serviceAPI;