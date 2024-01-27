import QuestionDomain from "../domains/QuestionDomain";
import prisma from "../prisma/prisma";

const getTestQuestions = async (faculty: string) => {
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
  const subjectList = faculty === "SCI" ? SCI : faculty === "COM" ? COM : ART;

  for (let subject of subjectList) {
    const subjectQuestions = await prisma.question.findMany({
      take: 10,
      where: {
        subject: {
          name: subject,
        },
      },
    });

    const filteredSubjectQuestions = subjectQuestions.map((question) => {
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
