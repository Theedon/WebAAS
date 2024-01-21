/**
 * Utility functions for working with question data.
 *
 * Defines the QuestionType interface for question objects.
 *
 * Exports fillQuestionsWithId to populate the subject_id field
 * by looking up the id for the given subject_name.
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export type QuestionType = {
  subject_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  subject_code: SubjectCode;
};

export enum SubjectCode {
  PHYSICS = "PHY",
  ACCOUNTING = "ACC",
  FRENCH = "FRA",
  COMMERCE = "COM",
}

const getSubjectIdByCode = async (code: string) => {
  const subject = await prisma.subject.findUnique({
    where: {
      code,
    },
  });
  return subject?.id ?? "";
};

export const fillQuestionsWithId = async (RawQuestions: QuestionType[]) => {
  const Questions: QuestionType[] = await Promise.all(
    RawQuestions.map(async (question) => ({
      ...question,
      subject_id: await getSubjectIdByCode(question.subject_code),
    })),
  );
  return Questions;
};
