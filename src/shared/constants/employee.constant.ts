import type { EmployeeStatus } from "@/entities/employee";

export const EMPLOYEE_STATUS: Record<EmployeeStatus, string> = {
  active: "Активный",
  disable: "Не активный",
  invited: "Приглашение отправлено",
};
