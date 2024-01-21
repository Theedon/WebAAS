import { PrismaClient } from "@prisma/client";
import { Faculties } from "./data/faculties";
import { getSubjects } from "./data/subjects";

const prisma = new PrismaClient();

async function main() {
  //insert faculties data
  for (let faculty of Faculties) {
    await prisma.faculty.create({
      data: faculty,
    });
  }

  //insert subjects data
  const Subjects = await getSubjects();
  console.log(JSON.stringify(Subjects[1]));
  for (let subject of Subjects) {
    const { facultyId, facultyCode, ...filteredSubject } = subject;
    await prisma.subject.create({
      data: {
        ...filteredSubject,
        faculty_id: facultyId,
      },
    });
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => {
    console.log("seeding finished");
    prisma.$disconnect();
  });
