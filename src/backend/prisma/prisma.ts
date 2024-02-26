/* eslint-disable no-var */
/**
 * Initializes and exports a singleton Prisma client instance.
 *
 * Creates a new PrismaClient instance via prismaClientSingleton().
 * Declares a global prisma variable to hold the client instance.
 * Exports the client instance as the default export.
 * In non-production environments, also assigns the client to globalThis.prisma.
 */
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
