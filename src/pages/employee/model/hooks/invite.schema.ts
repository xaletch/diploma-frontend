import z from "zod";

export const inviteSchema = z.object({
  email: z.string().min(1, "Укажите email"),
});

export type InviteSchemaType = z.infer<typeof inviteSchema>;
