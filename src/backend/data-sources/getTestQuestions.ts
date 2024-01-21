import QuestionDomain from "../domains/QuestionDomain";
import prisma from "../prisma/prisma";

const getTestQuestions = async (faculty: string) => {
  // const SCI = ["Biology", "Chemistry", "Physics", "Mathematics", "English"];
  const COM = ["Biology", "Chemistry", "Physics", "Mathematics", "English"];
  const ART = ["Biology", "Chemistry", "Physics", "Mathematics", "English"];

  const SCI = ["Physics", "Accounting"];

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
