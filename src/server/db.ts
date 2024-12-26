import { PrismaClient } from "@prisma/client";

import { env } from "~/env";

const isDevelopment = env.NODE_ENV === "development";

const createPrismaClient = () =>
  new PrismaClient({
    db: {
      url: isDevelopment
        ? process.env.DATABASE_DEV_URL
        : process.env.DATABASE_URL,
      log: ["query", "error", "warn"],
    },
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
