import z from "zod";

const changePassword = z.object({
  old_password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
  password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),

  confirm_password: z.string().min(8, "Пароль должен содержать минимум 8 символов"),
});

export const changePasswordSchema = changePassword.refine(
  data => data.password === data.confirm_password,
  {
    message: "Пароли не совпадают",
    path: ["confirm_password"],
  }
);

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
