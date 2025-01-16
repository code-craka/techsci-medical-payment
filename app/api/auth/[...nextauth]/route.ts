import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authOptions } from "@/lib/auth/auth";
import type { User as NextAuthUser } from "next-auth";

interface User extends NextAuthUser {
  username: string;
  role: string;
}

const handler = NextAuth({
  ...authOptions,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          if (credentials.username === "john" && credentials.password === "hello") {
            return {
              id: "1",
              name: "John Doe",
              email: "john.doe@example.com",
              image: null,
              username: credentials.username,
              role: "admin"
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };