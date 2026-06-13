import { API } from "@/shared/api";
import type { ICheckEmployeeInLocationCredentials, IEmployee, IEmployeeBlockedCredentials, IEmployeeByEmail, IEmployeeByEmailCredentials, IEmployeeDeleteCredentials, IEmployeeDetail, IEmployeeInviteCredentials, IEmployeeInviteResponse, IEmployeePasswordChangeCredentials, IEmployeesCredentials, IEmployeeUpdateCredentials, IServiceFromUserCredentials, IServiceToUserCredentials, UploadEmployeeAvatarCredentials } from "../model/types/employee.type";
import { buildQuery } from "@/shared/lib";

export const employeeAPI = API.injectEndpoints(({
  endpoints: (build) => ({
    /** 
      ===== СПИСОК ВСЕХ СОТРУДНИКОВ РАБОТЮЩИХ В ЛОКАЦИИ =====
    **/
    getEmployees: build.query<ApiResponse<IEmployee>, IEmployeesCredentials>({
      query: ({ location_id, ...query }) => ({
        url: buildQuery(`/v1/employees/${location_id}`, { ...query }),
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "EMPLOYEES" as const, id })),
              { type: "EMPLOYEES", id: "LIST" },
            ]
          : [{ type: "EMPLOYEES", id: "LIST" }],
    }),

    /** 
      ===== ПОЛУЧИТЬ ИНФОРМАЦИЮ О СОТРУДНИКЕ =====
    **/
    getEmployee: build.query<IEmployeeDetail, { location_id?: string; employee_id: string }>({
      query: ({ location_id, employee_id }) => ({
        url: `/v1/employee/${location_id}/${employee_id}`,
        method: "GET",
      }),
    }),

    /** 
      ===== ПОЛУЧИТЬ СОТРУДНИКА ПО EMAIL =====
    **/
    getEmployeeByEmail: build.query<IEmployeeByEmail, IEmployeeByEmailCredentials>({
      query: ({ email }) => ({
        url: `/v1/user/${email}`,
        method: "GET",
      }),
    }),

    /** 
      ===== ПРОВЕРКА РАБОТАЕТ ЛИ СОТРУДНИК В УКАЗАННОЙ ЛОКАЦИИ =====
    **/
    checkEmployeeInLocation: build.query<ApiSuccess, ICheckEmployeeInLocationCredentials>({
      query: ({ user_id, location_id }) => ({
        url: `/v1/employee/check/${user_id}/${location_id}`,
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
      invalidatesTags: ["EMPLOYEES"],
      // async onQueryStarted({ location_id }, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(employeeAPI.util.updateQueryData(
      //       "getEmployees",
      //       { location_id },
      //       (d) => { d.push(data.detail) },
      //     ));
      //   } catch { /* */ }
      // },
    }),

    /** 
      ===== РЕДАКТИРОВАНИЕ СОТРУДНИКА =====
    **/
    employeeEdit: build.mutation<IEmployeeDetail, IEmployeeUpdateCredentials>({
      query: ({ body, employee_id }) => ({
        url: `/v1/employee/${employee_id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ location_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(employeeAPI.util.updateQueryData(
            "getEmployee",
            { employee_id: data.profile.id, location_id },
            (d) => { Object.assign(d, data) },
          ));
        } catch { /* */ }
      }
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
      async onQueryStarted({ location_id, employee_id, body }, { dispatch, queryFulfilled }) {
        const result = dispatch(employeeAPI.util.updateQueryData(
          "getEmployee",
          { location_id, employee_id },
          (d) => { Object.assign(d, body) },
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
      invalidatesTags: ["EMPLOYEES"],
    }),
    
    /** 
      ===== УДАЛЕНИЕ СОТРУДНИКА ИЗ ЛОКАЦИИ =====
    **/
    employeeDelete: build.mutation<void, IEmployeeDeleteCredentials>({
      query: ({ employee_id, location_id }) => ({
        url: `/v1/employee/${employee_id}/${location_id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ location_id,  employee_id }, { dispatch, queryFulfilled }) {
        const result = dispatch(employeeAPI.util.updateQueryData(
          "getEmployees",
          { location_id },
          (d) => { 
            const idx = d.data.findIndex(e => e.id === employee_id);
            if (idx !== -1) d.data.splice(idx, 1);
          },
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),

    /**
      ====== ДОБАВЛЕНИЕ УСЛУГИ ДЛЯ СОТРУДНИКА =====
    **/
    addServiceToUser: build.mutation<ApiSuccess, IServiceToUserCredentials>({
      query: ({ employee_id, service_id }) => ({
        url: `/v1/employee/services/${employee_id}/${service_id}`,
        method: "POST",
      }),
      async onQueryStarted({ location_id, employee_id, service }, { dispatch, queryFulfilled }) {
        const result = dispatch(employeeAPI.util.updateQueryData(
          "getEmployee",
          { location_id, employee_id },
          (d) => { d.services.push({
            ...service,
            name: service.name,
            id: service.id,
            avatar: null,
          })},
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),
    
    /**
      ====== УДАЛЕНИЕ УСЛУГИ ДЛЯ СОТРУДНИКА =====
    **/
    removeServiceFromUser: build.mutation<ApiSuccess, IServiceFromUserCredentials>({
      query: ({ employee_id, service_id }) => ({
        url: `/v1/employee/services/${employee_id}/${service_id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ location_id, employee_id, service_id }, { dispatch, queryFulfilled }) {
        const result = dispatch(employeeAPI.util.updateQueryData(
          "getEmployee",
          { location_id, employee_id },
          (d) => { d.services = d.services.filter(s => s.id !== service_id)},
        ));

        try {
          await queryFulfilled;
        } catch {
          result.undo();
        }
      },
    }),

    /** 
      ===== ЗАГРУЗКА ФОТО СОТРУДНИКА =====
    **/
    photoEmployee: build.mutation<{ avatar: string }, UploadEmployeeAvatarCredentials>({
      query: ({ user_id, body }) => ({
        url: `/v1/user/avatar/${user_id}`,
        method: "POST",
        body,
      }),
      
      async onQueryStarted({ location_id, user_id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            employeeAPI.util.updateQueryData(
              "getEmployees",
              { location_id },
              (d) => {
                const emp = d.data.find(e => e.id === user_id);
                if (emp) emp.avatar = data.avatar;
              }
            )
          );
  
          dispatch(
            employeeAPI.util.updateQueryData(
              "getEmployee",
              { location_id, employee_id: user_id },
              (d) => { d.profile.avatar = data.avatar }
            ),
          );
        } catch { /* */ }
      },
    }),

    /**
      ===== СМЕНА ПАРОЛЯ =====
    **/
    employeeChangePassword: build.mutation<{ success: true }, IEmployeePasswordChangeCredentials>({
      query: ({ employee_id, body }) => ({
        url: `/v1/employee/change-password/${employee_id}`,
        method: "POST",
        body,
      }),
    }),
  }),
}));

export const { 
  useGetEmployeesQuery,
  useGetEmployeeQuery,
  useLazyGetEmployeeQuery,
  useGetEmployeeByEmailQuery,
  useLazyGetEmployeeByEmailQuery,
  useCheckEmployeeInLocationQuery,
  useLazyCheckEmployeeInLocationQuery,
  useEmployeeInviteMutation,
  useEmployeeEditMutation,
  useEmployeeBlockedMutation,
  useEmployeeDeleteMutation,
  useAddServiceToUserMutation,
  useRemoveServiceFromUserMutation,
  usePhotoEmployeeMutation,
  useEmployeeChangePasswordMutation,
} = employeeAPI;
