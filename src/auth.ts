import { signInSchema } from "@/lib/zod";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        try {
          // Parse and validate credentials
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          if (!email || !password) {
            throw new Error("Email and password are required.");
          }

          // Query database for user
          const dbUser = await db.user.findUnique({
            where: { email },
          });

          if (!dbUser) {
            throw new Error("Invalid email or password.");
          }

          // Compare passwords
          const isValidPassword = await bcrypt.compare(
            password,
            dbUser.hasedPassword
          );

          if (!isValidPassword) {
            throw new Error("Invalid email or password.");
          }

          // Return a valid User object
          return {
            id: dbUser.id,
            name: dbUser.userName,
            email: dbUser.email,
            image: dbUser.image,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
