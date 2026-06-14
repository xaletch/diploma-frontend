export {};

declare global {
  /** API TYPES **/
  // type HttpError<T = unknown> = {
  //   data: T & {
  //     title: string;
  //     detail: string;
  //     status: number;
  //   }
  //   status: number
  // }
  type HttpError<M = unknown> = {
    title: string;
    detail: string;
    status: number;
    meta: M;
  }

  type SortType = "newest" | "oldest" | "price_asc" | "price_desc";

  type PaginationQuery = {
    page?: number;
    limit?: number;
  }

  type ApiErrorResponse<M> = {
    status: number;
    data: HttpError<M>;
  }

  type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  }

  type ApiResponse<T> = {
    data: T[];
    meta: PaginationMeta;
  };

  // type ApiResponse<T> = {
  //   data: T;
  // }

  type ApiSuccess = {
    success: boolean;
  }

  /** **/
  interface IUserList {
    id: string;
    name: string;
  }

  interface ILocationList {
    id: string;
    name: string;
  }

  interface IDataList {
    id: string;
    name: string;
    avatar: string | null;
  }
  
  /**
    TODO:
    РАСПРЕДЕЛИТЬ ТИПЫ ПО СТРУКТУРЕ
  **/
  type RoleType = "owner" | "employee" | "admin";

  type CurrencyType = "RUB" | "USD" | "EUR";

  type MarkType = "red" | "orange" | "green" | "blue" | "purple" | "teal" | "pink";
  
  type DaysType = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  type DateType = "days" | "dates";

  /** **/
  type SexType = "man" | "woman" | "none";

  /** СТАТУСЫ ДЛЯ БРОНИРОВАНИЯ **/
  type BookingStatusType = "new" | "pending" | "expired" | "confirmed" | "cancelled" | "completed";

  /** СТАТУСЫ ДЛЯ ЗАКАЗОВ **/
  type OrderStatusType = "pending" | "open" | "closed" | "paid" | "unpaid";

  /** МЕТОДЫ ДЛЯ ОПЛАТЫ **/
  type PaymentMethodType = "online" | "cash" | "credit_card";

  /** СТАТУСЫ ПОЛЬЗОВАТЕЛЕЙ **/
  type UserStatusType = "invited" | "active" | "disable";

  /** СТАТУСЫ ИНВАЙТОВ **/
  type InviteStatusType = "accept" | "register" | "notify";

  /** ЕДЕНИЦА ЦЕНЫ **/
  type UnitPriceType = "booking" | "hour" | "day" | "week" | "month";
}
