import { avatarSchema } from "@/shared/schemas/avatar.schema";
import { timezoneSchema } from "@/shared/schemas/timezone.schema";
import z from "zod";

export const CompanySchema = z.object({
  name: z.string().min(1, "Укажите название"),
  currency: z.enum(["RUB", "USD", "EUR"], "Укажите валюту"),
  
  /** 
    ADDRESS - поле для поиска города.
    ПОКА В ВИДЕ ЗАГЛУШКИ
  **/
  address: z.string().min(1, "Укажите адрес").optional(),
  
  country: z.string("Выберите страну").min(1, "Укажите страну"),
  city: z.string().min(1, "Укажите город").optional(),
  region: z.string().min(1, "Укажите регион").optional(),
  street: z.string().optional(),
  house: z.string().optional(),
  lat: z.string().optional().default("56.838933"),
  lng: z.string().optional().default("60.595278"),
  post_code: z.string().optional(),

  timezone: timezoneSchema,

  logo: avatarSchema,
});

export type CompanyType = z.infer<typeof CompanySchema>;
