import { RUS_PHONE } from "@/shared/utils";
import z from "zod";

export const employeeSchema = z.object({
  first_name: z.string().min(1, "Обязательное поле"),
  last_name: z.string().optional(),
  position: z.string().min(1, "Обязательное поле"),
  role: z.string("Выберите роль").min(1, "Обязательное поле"),
  phone: 
    z.string("Укажите номер телефона")
    .min(1, "Укажите номер телефона")
    .refine((v) => {
      return RUS_PHONE.test(v);
    }, "Неверный формат"),

  /* ДОПОЛНИТЕЛЬНЫЕ ПАРАМЕТРЫ */
  birthdate: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
});

export type EmployeeSchemaType = z.infer<typeof employeeSchema>;
