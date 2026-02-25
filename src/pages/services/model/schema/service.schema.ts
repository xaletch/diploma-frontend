import z from "zod";

export const serviceSchema = z.object({
  name: z.string().min(1, "Укажите название"),
  public_name: z.string().min(1, "Укажите публичное название"),
  mark: z.enum(["red", "orange", "green", "blue", "purple", "teal", "pink"]).optional().default("red"),
  duration: z.number("Укажите продолжительность").min(1, "Укажите продолжительность"),

  // 
  // category: z.string().optional().nullable(),

  // 
  type: z.enum(["online", "offline"]).default("online"),

  // PRICE
  price: z.number("Укажите цену за услугу").min(1, "Укажите цену за услугу"),
  cost_price: z.number().optional(),
  // unit_price: z.enum(["booking", "hour", "day", "week", "month"]).default("week"),

  // 
  // description: z.string().optional().nullable(),

  // УДАЛЕННЫЕ
  date_type: z.enum(["days", "dates"]).default("days"),
});

export type ServiceType = z.infer<typeof serviceSchema>;
