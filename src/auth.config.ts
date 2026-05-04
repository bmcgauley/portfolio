import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

/**
 * Edge-safe auth config. Used by middleware (which runs in Edge runtime
 * and cannot import Node-only modules like `mongodb` or `bcryptjs`).
 *
 * The full auth.ts extends this and overrides the Credentials authorize
 * callback + adds DB-touching JWT/session callbacks.
 */
export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Real authorize lives in auth.ts (needs DB). This stub satisfies
      // the type at edge build time; middleware never actually invokes it.
      async authorize() {
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  trustHost: true,
} satisfies NextAuthConfig;
