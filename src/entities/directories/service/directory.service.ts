import { API } from "@/shared/api";
import type { IDirectoryEmployee } from "../model/types/directory-employee.type";
import type { IDirectoryLocation } from "../model/types/directory-location.type";
import type { IDirectoryService } from "../model/types/directory-service.type";

export const DirectoryAPI = API.injectEndpoints({
  endpoints: builder => ({
    /**
      ===== СПИСОК ВСЕХ СОТРУДНИКОВ РАБОТАЮЩИХ В КОМПАНИИ =====
    **/
    employees: builder.query<IDirectoryEmployee[], void>({
      query: () => ({
        url: "/v1/directory/employees",
        method: "GET",
      }),
    }),

    /**
      ===== СПИСОК ВСЕХ ЛОКАЦИЙ КОМПАНИИ =====
    **/
    locations: builder.query<IDirectoryLocation[], void>({
      query: () => ({
        url: "/v1/directory/locations",
        method: "GET",
      }),
    }),

    /**
      ===== СПИСОК ВСЕХ УСЛУГ КОМПАНИИ =====
    **/
    services: builder.query<IDirectoryService[], void>({
      query: () => ({
        url: "/v1/directory/services",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useEmployeesQuery,
  useLocationsQuery,
  useServicesQuery,
} = DirectoryAPI;
