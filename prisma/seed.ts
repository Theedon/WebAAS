import { PrismaClient } from "@prisma/client";
import { Faculties } from "./data/faculties";

const prisma = new PrismaClient();

async function main() {
  for (let faculty of Faculties) {
    await prisma.faculty.create({
      data: faculty,
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    console.log("finished");
    prisma.$disconnect();
  });
