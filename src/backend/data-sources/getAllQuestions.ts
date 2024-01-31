import QuestionDomain from "../domains/QuestionDomain";
import prisma from "../prisma/prisma";

const getAllQuestions = async () => {
  let questions = [];
  questions = await prisma.question.findMany();

  return questions.map((question: any) => {
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
};

export default getAllQuestions;
