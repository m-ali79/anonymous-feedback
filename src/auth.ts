import { signInSchema } from "@/lib/zod";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getRegisteredUser } from "@/lib/queries/user";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
        username: { label: "Username", type: "username" },
      },

      authorize: async (credentials) => {
        try {
          let user = null;
          const { email, password, username } = await signInSchema.parseAsync(
            credentials
          );

          user = await getRegisteredUser(password, email, username);
          if (user) return user;
          return null;

          // TODO: implement register
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ] satisfies NextAuthConfig,
});
