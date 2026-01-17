import { z } from "zod";

export const addressSchema = z.object({
  country: z.string("Выберите страну").min(1, "Выберите страну").nullable(),
  
  city: z.string().min(1, "Укажите город").optional().nullable(),
  region: z.string().min(1, "Укажите регион").optional().nullable(),
  street: z.string().optional().nullable(),
  house: z.string().optional().nullable(),
  post_code: z.string().optional().nullable(),

  lat: z.string().default("56.838933"),
  lng: z.string().default("60.595278"),
});

export type AddressCredentials = z.infer<typeof addressSchema>;
