import z from "zod";

export const inviteCheckSchema = z.object({
  email: z.string().min(1, "Укажите email"),
});

export type InviteCheckSchemaType = z.infer<typeof inviteCheckSchema>;
