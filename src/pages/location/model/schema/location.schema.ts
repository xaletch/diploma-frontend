import { addressSchema } from "@/shared/schemas/address.schema";
import { timezoneSchema } from "@/shared/schemas/timezone.schema";
import { RUS_PHONE } from "@/shared/utils";
import z from "zod";

export const locationSchema = addressSchema.extend({
  name: z.string().min(1, "Укажите название"),
  description: z.string().optional().nullable(),

  phone: 
    z.string("Укажите номер телефона")
    .min(1, "Укажите номер телефона")
    .refine((v) => {
      return RUS_PHONE.test(v);
    }, "Неверный формат"),

  timezone: timezoneSchema,
});

export type LocationType = z.infer<typeof locationSchema>;
