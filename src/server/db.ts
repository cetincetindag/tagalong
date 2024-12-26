import { PrismaClient } from "@prisma/client";
import { env } from "~/env";

const isDevelopment = env.NODE_ENV === "development";

const createPrismaClient = () =>
  new PrismaClient({
    datasources: {
      db: {
        url: isDevelopment
          ? process.env.DATABASE_DEV_URL
          : process.env.DATABASE_URL,
      },
    },
    log: isDevelopment ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
