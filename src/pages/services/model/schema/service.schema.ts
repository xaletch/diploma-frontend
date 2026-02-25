import z from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Укажите название"),
  public_name: z.string().min(1, "Укажите публичное название"),
  mark: z.enum(["red", "orange", "green", "blue", "purple", "teal", "pink"]),
  duration: z.string("Укажите продолжительность").min(1, "Укажите продолжительность"),

  // 
  category: z.string().optional().nullable(),

  // 
  type: z.enum(["online", "offline"]).default("online"),

  // TIME
  // time_start: z.string().min(1, "Укажите время начала"),
  // time_end: z.string().min(1, "Укажите время окончания"),

  // PRICE
  price: z.string().min(1, "Укажите цену за услугу"),
  cost_price: z.string().optional(),
  unit_price: z.enum(["booking", "hour", "day", "week", "month"]).default("week"),

  // 
  description: z.string().optional().nullable(),
});

export type ServiceType = z.infer<typeof serviceSchema>;
