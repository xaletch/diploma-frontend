import { RUS_PHONE } from "@/shared/utils";
import z from "zod";

export const RegisterSchema = z.object({
  email: z.string().min(1, "Укажите email"),
  first_name: z.string().min(1, "Обязательное поле"),
  last_name: z.string().min(1, "Обязательное поле"),
  phone: 
    z.string("Укажите номер телефона")
    .min(1, "Укажите номер телефона")
    .refine((v) => {
      return RUS_PHONE.test(v);
    }, "Неверный формат"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
