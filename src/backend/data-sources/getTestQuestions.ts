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
      id: faculty.faculty_id,
    },
    select: {
      code: true,
    },
  });
  const facultyCode = facultyCodeObj.code;
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
  let questionsArray = [];
  const subjectList =
    facultyCode === "SCI" ? SCI : facultyCode === "COM" ? COM : ART;

  for (let subject of subjectList) {
    const subjectQuestionsArr = await prisma.question.findMany({
      take: 10,
      where: {
        subject: {
          name: subject,
        },
      },
    });

    const subjectQuestions = _.shuffle(subjectQuestionsArr);

    const filteredSubjectQuestions = subjectQuestions.map((question: any) => {
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
    });

    questionsArray.push(filteredSubjectQuestions);
  }
  return questionsArray;
};

export default getTestQuestions;
