import type { IScheduleIntervals } from "@/entities/schedule";
import type { DayInfo } from "@/features/calendar";

/**
  ===== DIALOG NAMES ======
**/
export type DialogNames = 

  /** ===== СОТРУДНИКИ ===== **/
  "delete_employee"

  |

  /** ===== РАСПИСАНИЕ ===== **/
  "schedule"

  |

  /** ===== СОЗДАНИЕ БРОНИРОВАНИЯ ===== **/
  "booking_service_create"

/**
  ===== DIALOG DATA =====
**/
export type DialogDataMap = {
  TEST: undefined;

  /** ===== СОТРУДНИКИ ===== **/
  delete_employee: {
    employee_id: string;
  };

  /** ===== РАСПИСАНИЕ ===== **/
  schedule: {
    schedule_id: number | null;
    schedule: {
      date_key: string;
      year: number;
      month_index: number;
      day: number;
      backend_date: string,
    };
    user_id: string;
    intervals: IScheduleIntervals[];
    day_info?: DayInfo;
  };

  /** ===== СОЗДАНИЕ БРОНИРОВАНИЯ ===== **/
  booking_service_create: undefined;
}

/**
  ===== DIALOG UNION =====
**/
export type DialogUnion = 
  | { name?: undefined, data?: undefined }
  | { name: "delete_employee", data: DialogDataMap["delete_employee"] }
  | { name: "schedule", data: DialogDataMap["schedule"] }
  | { name: "booking_service_create", data: DialogDataMap["booking_service_create"] }

export type DialogData<T extends DialogNames> = DialogDataMap[T];
