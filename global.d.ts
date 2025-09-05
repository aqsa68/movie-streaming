// global.d.ts
import { PrismaClient } from "@prisma/client";
declare global {
  // eslint-disable-next-line no-var
  var prismadb: PrismaClient | undefined;
}
