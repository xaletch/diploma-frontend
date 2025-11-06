import z from "zod";

export const CompanySchema = z.object({
  name: z.string().min(1, "Укажите название"),
  currency: z.enum(["RUB", "USD", "EUR"], "Укажите валюту"),
  country: z.string().min(1, "Укажите страну"),
  city: z.string().min(1, "Укажите город"),
  region: z.string().min(1, "Укажите регион"), // сделать опциональным
  street: z.string().optional(),
  house: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
  post_code: z.string().optional(),
  timezone: z.string().min(1, "Укажите часовой пояс"),
});

export type CompanyType = z.infer<typeof CompanySchema>;
