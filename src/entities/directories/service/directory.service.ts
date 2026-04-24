import { API } from "@/shared/api";
import type { IDirectoryEmployee, IDirectoryLocationEmployee } from "../model/types/directory-employee.type";
import type { IDirectoryLocation } from "../model/types/directory-location.type";
import type { IDirectoryLocationService, IDirectoryService } from "../model/types/directory-service.type";
import type { IDirectoryCustomer } from "../model/types/directory-customer.type";

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
      ===== СПИСОК ВСЕХ СОТРУДНИКОВ РАБОТАЮЩИХ В ЛОКАЦИИ =====
    **/
    locationEmployees: builder.query<IDirectoryLocationEmployee[], { location_id: string }>({
      query: ({ location_id }) => ({
        url: `/v1/directory/employees/${location_id}`,
        method: "GET",
      }),
    }),

    /**
      ===== СПИСОК ВСЕХ КЛИЕНТОВ КОМПАНИИ =====
    **/
    companyCustomers: builder.query<IDirectoryCustomer[], void>({
      query: () => ({
        url: `/v1/directory/customers`,
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

    /**
      ===== СПИСОК ВСЕХ УСЛУГ ЛОКАЦИИ =====
    **/
    locationServices: builder.query<IDirectoryLocationService[], { location_id: string }>({
      query: ({ location_id }) => ({
        url: `/v1/directory/services/${location_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useEmployeesQuery,
  useLocationEmployeesQuery,
  useCompanyCustomersQuery,
  useLocationsQuery,
  useServicesQuery,
  useLocationServicesQuery,
} = DirectoryAPI;
