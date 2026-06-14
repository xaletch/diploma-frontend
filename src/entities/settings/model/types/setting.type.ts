export type PageType = "DASHBOARD" | "CALENDAR" | "BOOKINGS" | "CUSTOMERS" | "SERVICES" | "EMPLOYEES" | "ANALYTICS" | "SETTINGS" | "NOTIFICATIONS"

export interface ISettingPage {
  page: PageType;
  is_visible: boolean;
}

export interface ISettingPageCredentials {
  pages: ISettingPage[];
}

export interface ISettingCompanyCredentials {
  name: string;
  currency: CurrencyType;
}