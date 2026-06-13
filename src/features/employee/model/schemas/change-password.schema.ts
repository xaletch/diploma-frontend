import z from "zod";

const employeeChangePassword = z.object({
  new_password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
  confirm_password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
});

export const employeeChangePasswordSchema = employeeChangePassword.refine(
  data => data.new_password === data.confirm_password,
  {
    message: "Пароли не совпадают",
    path: ["confirm_password"],
  }
);

export type EmployeeChangePasswordSchemaType = z.infer<typeof employeeChangePasswordSchema>;
