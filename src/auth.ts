import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { authConfig } from "@/auth.config";
import { findOrCreateUser, getUserByEmail } from "@/lib/users";
import { isAdminEmail } from "@/lib/admin-allowlist";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = (credentials.email as string).toLowerCase();
        if (!isAdminEmail(email)) return null;
        const user = await getUserByEmail(email);
        if (!user?.passwordHash) return null;
        const valid = await compare(
          credentials.password as string,
          user.passwordHash,
        );
        if (!valid) return null;
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name ?? null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;
      if (!isAdminEmail(user.email)) return false;
      if (account?.type === "credentials") return true;
      await findOrCreateUser({
        email: user.email,
        name: user.name,
        image: user.image,
        googleId: account?.providerAccountId,
      });
      return true;
    },
    async jwt({ token }) {
      if (token.email) {
        token.role = isAdminEmail(token.email as string) ? "admin" : "viewer";
        const dbUser = await getUserByEmail(token.email as string);
        if (dbUser) token.dbId = dbUser._id.toString();
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string; role?: string }).id =
          token.dbId as string;
        (session.user as { id?: string; role?: string }).role =
          token.role as string;
      }
      return session;
    },
  },
  trustHost: true,
});
