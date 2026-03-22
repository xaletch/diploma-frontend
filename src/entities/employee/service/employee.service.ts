import { API } from "@/shared/api";
import type { IEmployee, IEmployeeBlockedCredentials, IEmployeeByEmail, IEmployeeByEmailCredentials, IEmployeeDeleteCredentials, IEmployeeInviteCredentials, IEmployeeInviteResponse, IEmployeeUpdateCredentials } from "../model/types/employee.type";

export const employeeAPI = API.injectEndpoints(({
  endpoints: (build) => ({
    /** 
      ===== СПИСОК ВСЕХ СОТРУДНИКОВ РАБОТЮЩИХ В ЛОКАЦИИ =====
    **/
    getEmployee: build.query<IEmployee[], { location_id: string }>({
      query: ({ location_id }) => ({
        url: `/v1/employee/${location_id}`,
        method: "GET",
      }),
    }),

    /** 
      ===== ПОЛУЧИТЬ СОТРУДНИКА ПО EMAIL =====
    **/
    getEmployeeByEmail: build.query<ApiResponse<IEmployeeByEmail>, IEmployeeByEmailCredentials>({
      query: ({ email }) => ({
        url: `/v1/user/${email}`,
        method: "GET",
      }),
    }),

    /** 
      ===== ДОБАВЛЕНИЕ СОТРУДНИКА В ЛОКАЦИЮ =====
    **/
    employeeInvite: build.mutation<IEmployeeInviteResponse, IEmployeeInviteCredentials>({
      query: (body) => ({
        url: `/v1/employee/invite`,
        method: "POST",
        body,
      }),
    }),

    /** 
      ===== РЕДАКТИРОВАНИЕ СОТРУДНИКА =====
    **/
    employeeEdit: build.mutation<void, IEmployeeUpdateCredentials>({
      query: ({ body, employee_id }) => ({
        url: `/v1/employee/${employee_id}`,
        method: "PATCH",
        body,
      }),
    }),

    /** 
      ===== БЛОКИРОВКА СОТРУДНИКА =====
    **/
    employeeBlocked: build.mutation<void, IEmployeeBlockedCredentials>({
      query: ({ body, employee_id, location_id }) => ({
        url: `/v1/employee/blocked/${employee_id}/${location_id}`,
        method: "POST",
        body,
      }),
    }),
    
    /** 
      ===== УДАЛЕНИЕ СОТРУДНИКА =====
    **/
    employeeDelete: build.mutation<void, IEmployeeDeleteCredentials>({
      query: ({ employee_id, location_id }) => ({
        url: `/v1/employee/${employee_id}/${location_id}`,
        method: "DELETE",
      }),
    }),
  }),
}));

export const { 
  useGetEmployeeQuery,
  useLazyGetEmployeeQuery,
  useGetEmployeeByEmailQuery,
  useLazyGetEmployeeByEmailQuery,
  useEmployeeInviteMutation,
  useEmployeeEditMutation,
  useEmployeeBlockedMutation,
  useEmployeeDeleteMutation,
} = employeeAPI;
