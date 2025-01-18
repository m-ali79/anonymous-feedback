import { z } from "zod";
import { registerSchema } from "@/lib/zod";

export const register = (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) return { error: "invalid fields" };

  const { userName, email, password } = validatedFields.data;
};
