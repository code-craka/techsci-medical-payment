import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { verifyTwoFactorCode } from "./2fa";
import { recordLoginAttempt, shouldBlockLogin } from "./login-history";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        code: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Missing username or password");
        }

        // Check if login is blocked due to too many attempts
        const isBlocked = await shouldBlockLogin(credentials.username);
        if (isBlocked) {
          throw new Error("Too many failed attempts. Please try again later.");
        }

        // Find user
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
          select: {
            id: true,
            username: true,
            password: true,
            role: true,
            twoFactorEnabled: true,
            twoFactorSecret: true,
          },
        });

        if (!user) {
          await recordLoginAttempt(credentials.username, false);
          throw new Error("Invalid username or password");
        }

        // Verify password
        const isValidPassword = await compare(credentials.password, user.password);
        if (!isValidPassword) {
          await recordLoginAttempt(user.username, false);
          throw new Error("Invalid username or password");
        }

        // Check 2FA if enabled
        if (user.twoFactorEnabled) {
          if (!credentials.code) {
            throw new Error("2FA code required");
          }

          const isValidCode = await verifyTwoFactorCode(user.id, credentials.code);
          if (!isValidCode) {
            await recordLoginAttempt(user.username, false);
            throw new Error("Invalid 2FA code");
          }
        }

        // Record successful login
        await recordLoginAttempt(user.username, true);

        return {
          id: user.id,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};