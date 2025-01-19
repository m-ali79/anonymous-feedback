import z from "zod";

export const registerSchema = z.object({
  userName: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "userName cannot contain special characters")
    .min(4, "username atleast be 4 characters long"),
  email: z.string().email(),
  password: z.string().min(6, "password should be atleast 6 charactes long"),
});
