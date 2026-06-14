import { avatarSchema } from "@/shared/schemas/avatar.schema";
import z from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Укажите название"),
  mark: z.enum(["red", "orange", "green", "blue", "purple", "teal", "pink"]).optional(),
  duration: z.number("Укажите продолжительность").min(1, "Укажите продолжительность").transform((val) => (val ? Number(val) : undefined)),

  // 
  category: z.string().optional().nullable(),

  // 
  type: z.enum(["online", "offline"]).default("online"),

  // PRICE
  price: z.number("Укажите цену за услугу").min(1, "Укажите цену за услугу").transform((val) => (val ? Number(val) : undefined)),
  cost_price: z.number().optional(),
  // unit_price: z.enum(["booking", "hour", "day", "week", "month"]).default("week"),

  avatar: avatarSchema,

  // 
  // description: z.string().optional().nullable(),

  // УДАЛЕННЫЕ
  date_type: z.enum(["days", "dates"]).default("days"),
});

export type ServiceType = z.infer<typeof serviceSchema>;
