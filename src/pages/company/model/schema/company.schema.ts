import z from "zod";

export const CompanySchema = z.object({
  name: z.string().min(1, "Укажите название"),
});

export type CompanyType = z.infer<typeof CompanySchema>;
