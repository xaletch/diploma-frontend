import { API } from "@/shared/api";
import { type IScheduleDetail, type IScheduleCreateCredentials, type IScheduleCredentials, type ISchedule, type IScheduleEmployeeParams, type IScheduleUpdateCredentials, type IScheduleUpdateResponse, } from "../model/types/schedule.type";
import { buildQuery } from "@/shared/lib";

export const scheduleAPI = API.injectEndpoints({
  endpoints: builder => ({
    /** 
      ===== СОЗДАНИЕ РАСПИСАНИЯ ДЛЯ СОТРУДНИКА =====
    **/
    create: builder.mutation<ISchedule, IScheduleCreateCredentials>({
      query: ({ body, params }) => ({
        url: `/v1/schedule/${params.location_id}`,
        method: "POST",
        body,
      }),
      async onQueryStarted({ params, body }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(scheduleAPI.util.updateQueryData(
            "getEmployeeServices",
            { user_id: body.user_id!, location_id: params.location_id },
            (d) => { d.push(data) }
          ));
        }
        catch { /*  */ }
      }
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
      query: ({ user_id, location_id, query }) => ({
        url: buildQuery(`/v1/schedule/${user_id}/${location_id}`, { ...query }),
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
      }),
      async onQueryStarted({ params, body }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(scheduleAPI.util.updateQueryData(
            "getEmployeeServices",
            { user_id: body.user_id!, location_id: params.location_id },
            (d) => {
              const index = d.findIndex(item => item.id === params.schedule_id);
              if (index !== -1) {
                d[index] = { ...d[index], ...data };
              }
            }
          ));
        }
        catch { /* */ }
      }
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
} = scheduleAPI;
