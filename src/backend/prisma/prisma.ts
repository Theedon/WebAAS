// /**
//  * Initializes Prisma client as a singleton and exports it.
//  * - Declares `prisma` as a global variable of type PrismaClient | undefined.
//  * - Creates a PrismaSingleton object with a PrismaClient instance.
//  * - Exports the PrismaSingleton type.
//  * - Freezes the PrismaSingleton object.
//  * - Initializes `prisma` global var with PrismaSingleton instance.
//  * - In non-production, sets `global.prisma` to the client instance.
//  * - Exports the `prisma` instance as default.
//  */
// import { PrismaClient } from "@prisma/client";

// declare global {
//   // allow global `var` declarations
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient | undefined;
// }

// const PrismaSingleton = {
//   instance: new PrismaClient(),
// };

// export type IPrismaSingleton = typeof PrismaSingleton;

// Object.freeze(PrismaSingleton);

// const prisma = global.prisma || PrismaSingleton.instance;

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// export default prisma;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL, // Set this based on your environment variable
    },
  },
});
console.log("prisma is", process.env.POSTGRES_PRISMA_URL);
export default prisma;
