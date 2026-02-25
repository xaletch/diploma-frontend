
/**
  ServiceStatus - type
  Это тип сервиса. т.е в каком виде преподается эта услуга - онлайн | офлайн 
**/
export type ServiceStatusType = "online" | "offline";

export interface IServiceCredentials {
  name: string;
  public_name: string;          // Например name: "Стрижка", public_name: "strizhka"
  mark?: MarkType;
  duration: number;
  type: ServiceStatusType;
  // days: DaysType[];
  // time_start: string;
  // time_end: string;

  category?: string;

  // ЦЕНЫ
  price: number;
  // unit_price?: string;       // ДОБАВИТЬ В API
  cost_price?: number;

  // НАСТРОЙКИ СКИДОК - ВСЕ ПОЛЯ ОПЦИОНАЛЬНЫ
  discount_price?: number;
  date_type?: DateType;
  discount_days?: DaysType[];
  discount_time_start?: string;
  discount_time_end?: string;
}

export interface IServiceEditCredentials {
  service_id: string;
  body: IServiceCredentials;
}

export interface IServiceChangeResponse {
  id: string;
  name: string;
  mark: MarkType;
  duration: number;
  type: ServiceStatusType;
}

export type ServicePrices = {
  price: number;
  cost_price: number;
}

export interface IServices {
  id: string;
  name: string;
  mark: MarkType;
  public_name: string;
  duration: number;
  category: string;
  avatar: string;

  /**
    PRICE И PRICE В PRICES - ОДНИ И ТЕ ЖЕ ДАННЫЕ
  **/
  price: number;
  prices: ServicePrices;

  user_length: number;
  locations_length: number;
}

export interface IServiceDate {
  days: DaysType[];
  time_start: string;
  time_end: string;
}

interface IServiceDiscount {
  date_type: DateType;
  days: DaysType[];
  price: number | null;
  time_start: string | null,
  time_end: string | null,
}

export interface IService extends IServices {
  date: IServiceDate;
  discount: IServiceDiscount | null;
  users: IDataList[];
  locations: IDataList[];
}

export interface IServiceDetailCredentials {
  service_id: string;
}

export interface IServiceUsersCredentials {
  service_id: string;
  body: {
    user_ids: string[];
  }
}

export interface IServiceLocationsCredentials {
  service_id: string;
  body: {
    location_ids: string[];
  }
}

export interface IServiceDeleteCredentials {
  service_id: string;
}
