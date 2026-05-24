import z from "zod"

export const avatarSchema= z.instanceof(File, { message: "Выберите фото" })
    .refine((f) => f.size <= 5 * 1024 * 1024, "Максимум 5 МБ")
    .nullable();