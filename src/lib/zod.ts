import z from "zod";

export const registerSchema = z.object({
  userName: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "userName cannot contain special characters"),
  email: z.string().email(),
  password: z.string().min(6, "password should be atleast 6 charactes long"),
});

// export const signInSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid Email"),
//   password: z
//     .string()
//     .min(1, "password is required")
//     .min(8, "password must be more than 8 Characters")
//     .max(32, "password must be less than 32 Charcters"),
// });
