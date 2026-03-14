import { API } from "@/shared/api";
import { type IScheduleDetail, type IScheduleCreateCredentials, type IScheduleCredentials, type ISchedule, type IScheduleEmployeeParams, type IScheduleUpdateCredentials, type IScheduleUpdateResponse, } from "../model/types/schedule.type";

export const ScheduleAPI = API.injectEndpoints({
  endpoints: builder => ({
    /** 
      ===== СОЗДАНИЕ РАСПИСАНИЯ ДЛЯ СОТРУДНИКА =====
    **/
    create: builder.mutation<void, IScheduleCreateCredentials>({
      query: ({ body, params }) => ({
        url: `/v1/schedule/${params.location_id}`,
        method: "POST",
        body,
      }),
    }),

    /** 
      ===== ПОЛУЧЕНИЕ ДЕТАЛАЛЬНОГО РАСПИСАНИЯ СОТРУДНИКА =====
    **/
    getDetailEmployeeService: builder.query<IScheduleDetail, IScheduleCredentials>({
      query: ({ body, params }) => ({
        url: `/v1/schedule/${params.location_id}`,
        method: "GET",
        body,
      }),
    }),

    /** 
      ===== ПОЛУЧЕНИЕ ВСЕГО РАСПИСАНИЯ СОТРУДНИКА =====
    **/
    getEmployeeServices: builder.query<ISchedule[], IScheduleEmployeeParams>({
      query: ({ user_id, location_id }) => ({
        url: `/v1/schedule/${user_id}/${location_id}`,
        method: "GET",
      }),
    }),

    /** 
      ===== РЕДАКТИРОВАНИЕ РАСПИСАНИЯ СОТРУДНИКА =====
    **/
    update: builder.mutation<IScheduleUpdateResponse, IScheduleUpdateCredentials>({
      query: ({ body, params }) => ({
        url: `/v1/schedule/${params.location_id}/schedule/${params.schedule_id}`,
        method: "PATCH",
        body,
      })
    }),

    /** 
      ===== УДАЛЕНИЕ РАСПИСАНИЯ СОТРУДНИКА =====
    **/
    delete: builder.mutation<void, IScheduleCredentials>({
      query: ({ body, params }) => ({
        url: `/v1/schedule/${params.location_id}`,
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useCreateMutation,
  useGetDetailEmployeeServiceQuery,
  useLazyGetDetailEmployeeServiceQuery,
  useGetEmployeeServicesQuery,
  useLazyGetEmployeeServicesQuery,
  useUpdateMutation,
} = ScheduleAPI;
