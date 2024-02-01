import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as any;

export const prismadb: PrismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    // log: ["query"],
    // errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismadb;
}
