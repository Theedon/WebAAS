import { PrismaClient } from "@prisma/client";
import { Accounting } from "./questions-data/Accounting.ts";

const prisma = new PrismaClient();

async function main() {
  for (let question of Accounting) {
    prisma.question.create({
      data: question,
    });
  }
}

main()
  .catch((err) => {
    // console.error(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
