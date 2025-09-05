// lib/prismadb.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // allow a global prisma instance during development to prevent exhausting connections
  // eslint-disable-next-line no-var
  var prismadb: PrismaClient | undefined;
}

const prismadb = global.prismadb ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prismadb = prismadb;

export default prismadb;
