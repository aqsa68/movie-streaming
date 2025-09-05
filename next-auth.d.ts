// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ add id
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string; // ✅ user id
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
