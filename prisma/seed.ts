import prisma from "@/backend/prisma/prisma";
import { Faculties } from "./data/faculties";
import { getSubjects } from "./data/subjects";
import { getQuestions } from "./data/questions";
import { getUsers } from "./data/users/utils";

async function main() {
  //insert faculties data
  for (const faculty of Faculties) {
    await prisma.faculty.create({
      data: faculty,
    });
  }

  //insert subjects data
  const Subjects = await getSubjects();
  console.log(JSON.stringify(Subjects[1]));
  for (const subject of Subjects) {
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
  for (const question of Questions) {
    const { subject_id, subject_code, ...filteredQuestion } = question;
    await prisma.question.create({
      data: {
        ...filteredQuestion,
        subject_id,
      },
    });
  }

  //insert users data
  const Users = await getUsers();
  for (const user of Users) {
    const { faculty_id, faculty_code, ...filteredUser } = user;
    await prisma.user.create({
      data: {
        ...filteredUser,
        faculty_id,
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
    console.log(
      "***💃🕺💫🎶🔥✨👯‍♀️👯‍♂️💃🕺SEEDING FINISHED!💃🕺💫🎶🔥✨👯‍♀️👯‍♂️💃🕺***",
    );
    prisma
      .$disconnect()
      .then(() => console.log("prisma connection terminated successfully"))
      .catch(() => console.error("error disconnecting prisma instance"));
  });
