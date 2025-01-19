"use server";

import { db } from "@/lib/db";
import { registerSchema } from "@/lib/zod";

export default async function checkUniqueUsername(value: string) {
  const userNameSchema = registerSchema.pick({ userName: true });

  const validatedField = userNameSchema.safeParse({ userName: value });
  if (!validatedField.success)
    return { error: validatedField.error.errors[0]?.message };

  const { userName } = validatedField.data;

  try {
    const existingUser = await db.user.findUnique({ where: { userName } });

    if (!existingUser) return { success: "Your username is unique." };
    else return { error: "Username is not unique." };
  } catch (error) {
    console.error("Error checking the unique userName", error);

    return {
      error:
        "Something went wrong while checking the unique username. Please try again.",
    };
  }
}
