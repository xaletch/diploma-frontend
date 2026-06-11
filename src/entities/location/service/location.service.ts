import { API } from "@/shared/api";
import type { LocationCredentials, ILocationResponse, ILocationDetail, ILocationUser, ILocationUserQuery, UpdateLocationCredentials, ChangeLocationStatusCredentials, UploadLocationAvatarCredentials, ILocationQuery } from "../model/types/location.type";
import { buildQuery } from "@/shared/lib";

export const locationAPI = API.injectEndpoints(({
  endpoints: (build) => ({
    /** 
      ===== СПИСОК ЛОКАЦИЙ =====
    **/
    getLocations: build.query<ApiResponse<ILocationResponse>, ILocationQuery>({
      query: (query) => ({
        url: buildQuery(`/v1/locations`, { ...query }),
        method: "GET",
      }),
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

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data: newLocation } = await queryFulfilled;

          dispatch(
            locationAPI.util.updateQueryData(
              "getLocations",
              {},
              (d) => { d.data.unshift(newLocation) }
            )
          )
        } catch { /* */ }
      }
    }),

    /** 
      ===== РЕДАКТИРОВАНИЕ ЛОКАЦИИ =====
    **/
    editLocation: build.mutation<ILocationResponse, UpdateLocationCredentials>({
      query: ({ location_id, body }) => ({
        url: `/v1/location/${location_id}`,
        method: "PATCH",
        body,
      }),

      async onQueryStarted({ location_id }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedLocation } = await queryFulfilled;

          dispatch(
            locationAPI.util.updateQueryData(
              "getLocations",
              {},
              (d) => {
                const index = d.data.findIndex((l) => l.id === location_id);
                if (index !== -1) d.data[index] = updatedLocation;
              }
            ),
          );
          dispatch(
            locationAPI.util.updateQueryData(
              "getLocation", location_id, (d) => {
              Object.assign(d, updatedLocation);
            }),
          );
        } catch { /* */ }
      },
    }),

    /** 
      ===== ИЗМЕНЕНИЕ СТАТУСА ЛОКАЦИИ (ONLINE | OFFLINE) =====
    **/
    onlineLocation: build.mutation<void, ChangeLocationStatusCredentials>({
      query: ({ locationId, active }) => ({
        url: `/v1/location/${locationId}/status`,
        method: "POST",
        body: { active },
      }),
      
      async onQueryStarted({ locationId, active }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          locationAPI.util.updateQueryData(
            "getLocations",
            {},
            (d) => {
              const location = d.data.find((l) => l.id === locationId);
              if (location) location.is_active = active;
            }
          ),
        );

        const patchDetail = dispatch(
          locationAPI.util.updateQueryData(
            "getLocation",
            locationId,
            (d) => { d.is_active = active }
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchDetail.undo();
        }
      },
    }),

    /** 
      ===== ЗАГРУЗКА ФОТО ЛОКАЦИ =====
    **/
    photoLocation: build.mutation<{ avatar: string }, UploadLocationAvatarCredentials>({
      query: ({ location_id, body }) => ({
        url: `/v1/location/avatar/${location_id}`,
        method: "POST",
        body,
      }),
      
      async onQueryStarted({ location_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            locationAPI.util.updateQueryData(
              "getLocations",
              {},
              (d) => {
                const loc = d.data.find(l => l.id === location_id);
                if (loc) loc.avatar = data.avatar;
              }
            )
          );

          dispatch(
            locationAPI.util.updateQueryData(
              "getLocation",
              location_id,
              (d) => { d.avatar = data.avatar }
            ),
          );
        } catch { /* */ }
      },
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
  usePhotoLocationMutation,
} = locationAPI;