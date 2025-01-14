import z from "zod";

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z
    .string()
    .min(1, "password is required")
    .min(8, "password must be more than 8 Characters")
    .max(32, "password must be less than 32 Charcters"),
});
