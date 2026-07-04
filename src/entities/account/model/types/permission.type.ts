export interface IPermission {
  name: string;
}

export type PermissionName =
  | "service:create"
  | "service:update"
  | "service:delete"
  | "service-users:update"
  | "service-locations:update"
  | "service-category:create"
  | "service-category:update"
  | "service-category:delete"
  | "service:avatar"
 
  | "schedule:create"
  | "schedule:all"
  | "schedule:first"
  | "schedule:update"
  | "schedule:delete"
 

  | "location:create"
  | "locations:read"
  | "location:read"
  | "location:update"
  | "location:users"
  | "location:user"
  | "location:delete"
 

  | "employee:invite"
  | "employee/register"
  | "employee:update"
  | "employee:delete"
  | "employees:read"
  | "employee:change-password"


  | "user-find:email"
  | "user-check:location"
 

  | "company-customer:create"
  | "company-customers:read"
  | "company-customer:read"
  | "company-customer-bookings:read"
  | "company:create"
  | "company-logo:upload"
  | "company:update"
 

  | "booking:create"
  | "bookings:read"
  | "booking-detail:read"
  | "booking-customer-detail:read"
  | "order-customer-detail:read"
  | "booking:update"
  | "booking:status"
  | "booking:delete"
  | "booking:status"
 

  | "directory:employees"
  | "directory:locations"
  | "directory:services"
  | "directory:location-employees"
  | "directory:location-services"
  | "directory:customers"
  | "directory:employee-schedule"

  | "orders:read"
  | "order-detail:read"
