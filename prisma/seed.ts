import { PrismaClient } from "@prisma/client";
import { Faculties } from "./data/faculties";
import { getSubjects } from "./data/subjects";
import { getQuestions } from "./data/questions";

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

  // insert questions data
  const Questions = await getQuestions();
  console.log(JSON.stringify(Questions[1]));
  for (let question of Questions) {
    const { subject_id, subject_code, ...filteredQuestion } = question;
    await prisma.question.create({
      data: {
        ...filteredQuestion,
        subject_id,
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
