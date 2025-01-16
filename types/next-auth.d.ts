import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    role: string;
    name?: string;
    email?: string;
    twoFactorEnabled?: boolean;
    twoFactorSecret?: string;
    backupCodes?: string[];
  }

  interface Session {
    user: User & {
      id: string;
      username: string;
      role: string;
      twoFactorEnabled?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: string;
    twoFactorEnabled?: boolean;
  }
}
