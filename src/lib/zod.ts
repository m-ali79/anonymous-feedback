import z from "zod";

export const registerSchema = z.object({
  userName: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "userName cannot contain special characters")
    .min(4, "username atleast be 4 characters long"),
  email: z.string().email(),
  password: z.string().min(6, "password should be atleast 6 charactes long"),
});

export const checkUniqueUsernameSchema = z
  .string()
  .trim()
  .min(4, "username atleast be 4 characters long")
  .regex(/^[a-zA-Z0-9]+$/, "userName cannot contain special characters");

// export const signInSchema = z.object({
//   email: z.string().min(1, "Email is required").email("Invalid Email"),
//   password: z
//     .string()
//     .min(1, "password is required")
//     .min(8, "password must be more than 8 Characters")
//     .max(32, "password must be less than 32 Charcters"),
// });
