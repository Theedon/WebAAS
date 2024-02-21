import { QuestionType } from "@/components/assessment/Assessment";
import prisma from "../prisma/prisma";

async function updateSubjectNames(
  questionsArray: QuestionType[],
): Promise<QuestionType[]> {
  const updatedQuestions: QuestionType[] = [];
  for (const question of questionsArray) {
    const { subject_id, ...rest } = question;
    try {
      const subject = await prisma.subject.findUnique({
        where: {
          id: subject_id,
        },
      });
      if (subject) {
        const updatedQuestion: QuestionType = {
          ...rest,
          subject_id: subject.name,
        };
        updatedQuestions.push(updatedQuestion);
      } else {
        console.error(`Subject not found for subject_id: ${subject_id}`);
      }
    } catch (error) {
      console.error("Error fetching subject:", error);
    }
  }

  return updatedQuestions;
}

interface StudentAnswer {
  subjectName: string;
  question: string;
  studentAnswer: string | null;
  correctAnswer: string;
}

const constructStudentAnswers = (
  assesmentInfo: QuestionType[],
): StudentAnswer[] => {
  return assesmentInfo.map((exam) => ({
    subjectName: exam.subject_id,
    question: exam.question,
    studentAnswer: exam.choice || null,
    correctAnswer: exam.correct_option,
  }));
};

export const saveExam = async (
  userId: string,
  assesmentInfo: QuestionType[],
) => {
  const assesmentWithSubjectNames = await updateSubjectNames(assesmentInfo);
  const questionStringArray = constructStudentAnswers(
    assesmentWithSubjectNames,
  );

  const updateUser = await prisma.userToExam.upsert({
    where: {
      clerk_id: userId,
    },
    update: {
      taken_exam: true,
      test_information: Buffer.from(JSON.stringify(questionStringArray)),
    },
    create: {
      clerk_id: userId,
      taken_exam: true,
      test_information: Buffer.from(JSON.stringify(questionStringArray)),
    },
  });

  console.log("Exam submitted successfully");

  return `${questionStringArray}`;
};
