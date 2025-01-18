"use server";

import { db } from "@/lib/db";
import { checkUniqueUsernameSchema } from "@/lib/zod";
import { z } from "zod";

// make the schema
// Submit the changs to the server on every debounce
// validate schema to ensure proper validation
// make db qurey
// give result

export default async function checkUniqueUsername(
  value: z.infer<typeof checkUniqueUsernameSchema>
) {
  const validatedField = checkUniqueUsernameSchema.safeParse(value);
  if (!validatedField.success) return { error: "invalid field" };

  const userName = validatedField.data;
  console.log(userName);

  try {
    const existingUser = await db.user.findUnique({ where: { userName } });

    if (!existingUser) return { success: "your username is unique" };
    else return { error: "username is not unique." };
  } catch (error) {
    console.error("Error checking the unique userName", error);

    return {
      error:
        "something went wrong while checking the unique username. please try again",
    };
  }
}
