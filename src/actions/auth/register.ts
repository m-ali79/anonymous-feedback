"use server";

import { z } from "zod";
import { registerSchema } from "@/lib/zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) return { error: "invalid fields" };

  const { userName, email, password } = validatedFields.data;

  try {
    const existingUser = await db.user.findFirst({
      where: { OR: [{ email, userName }] },
    });

    console.log(existingUser);

    if (existingUser)
      return { error: "user already exist with this email or userName" };

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        userName,
        email,
        hashedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent!" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong. please try again" };
  }
};
