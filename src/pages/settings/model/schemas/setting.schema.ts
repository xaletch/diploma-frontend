import { avatarSchema } from "@/shared/schemas/avatar.schema";
import z from "zod";

export const settingSchema = z.object({
  name: z.string().min(1, "Укажите название"),
  currency: z.enum(["RUB", "USD", "EUR"], { message: "Укажите валюту" }),
  logo: avatarSchema,
  pages: z.array(z.object({
    page: z.enum(["DASHBOARD", "CALENDAR", "BOOKINGS", "ORDERS", "CUSTOMERS", "SERVICES", "EMPLOYEES", "ANALYTICS", "SETTINGS", "NOTIFICATIONS"]),
    is_visible: z.boolean(),
  })),
});

export type SettingType = z.infer<typeof settingSchema>;
