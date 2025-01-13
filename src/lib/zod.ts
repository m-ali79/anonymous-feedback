import z from "zod";

export const signInSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid Email")
      .optional(),

    password: z
      .string()
      .min(1, "password is required")
      .min(8, "password must be more than 8 Characters")
      .max(32, "password must be less than 32 Charcters"),

    username: z
      .string()
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .optional(),
  })
  .refine(
    (data) => data.email || data.username, // Ensure at least one of email or username is present
    {
      message: "Either email or username is required",
      path: ["email"], // This will show the error near the email field (you can change it to "username" if needed)
    }
  );
