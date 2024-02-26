import { Question } from "@prisma/client";
import QuestionDomain from "../domains/QuestionDomain";
import prisma from "../prisma/prisma";
import _ from "lodash";

const getTestQuestions = async (userId: string) => {
  const faculty = await prisma.user.findUnique({
    where: {
      clerk_id: userId,
    },
    select: {
      faculty_id: true,
    },
  });
  const facultyCodeObj = await prisma.faculty.findUnique({
    where: {
      id: faculty?.faculty_id,
    },
    select: {
      code: true,
    },
  });
  const facultyCode = facultyCodeObj?.code;
  const SCI = ["Biology", "Chemistry", "Physics", "Mathematics", "English"];
  const COM = [
    "Accounting",
    "Commerce",
    "Business Studies",
    "Book Keeping",
    "English",
  ];
  const ART = [
    "Law",
    "Linguistics",
    "Literature in English",
    "Cultural and Creative Arts",
    "English",
  ];
  const questionsArray = [];
  const subjectList =
    facultyCode === "SCI" ? SCI : facultyCode === "COM" ? COM : ART;

  //remove the below if you do not want the subjects to be shuffled during test
  const shuffledSubjectList = _.shuffle(subjectList);

  for (const subject of shuffledSubjectList) {
    const subjectQuestionsArr = await prisma.question.findMany({
      take: 5,
      where: {
        subject: {
          name: subject,
        },
      },
    });

    const subjectQuestions = _.shuffle(subjectQuestionsArr);

    const filteredSubjectQuestions = subjectQuestions.map(
      (question: Question) => {
        return new QuestionDomain(
          question.id,
          question.option_a,
          question.option_b,
          question.option_c,
          question.option_d,
          question.subject_id,
          question.question_text,
          question.correct_option,
        );
      },
    );

    questionsArray.push(filteredSubjectQuestions);
  }
  return questionsArray;
};

export default getTestQuestions;
