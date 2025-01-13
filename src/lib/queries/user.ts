import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const getRegisteredUser = async (
  password: string,
  email?: string,
  username?: string
) => {
  if (!password) {
    throw new Error("Password is required.");
  }

  if (!email && !username) {
    throw new Error("Either email or username must be provided.");
  }

  try {
    const user = await db.user.findFirst({
      where: {
        OR: [{ email }, { userName: username }],
      },
    });

    if (!user)
      throw new Error(
        "user with this email or userName not found. please give correct email or password"
      );

    const isValidPassword = bcrypt.compare(password, user.hasedPassword);

    if (!isValidPassword)
      throw new Error(
        "Your password is incorrect. Please give a valid Passoword"
      );

    return user;
  } catch (error) {}
};
