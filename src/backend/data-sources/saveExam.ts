import { QuestionType } from "@/components/assessment/Assessment";
import prisma from "../prisma/prisma";
import { getAIRecommendation } from "./getAIRecommendation";

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

const constructStudentAnswers = (assesmentInfo: QuestionType[]): string => {
  const assesmentObj = assesmentInfo.map((exam) => ({
    subjectName: exam.subject_id,
    question: exam.question,
    studentAnswer: exam.choice || null,
    correctAnswer: exam.correct_option,
  }));
  return JSON.stringify(assesmentObj);
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
      test_information: Buffer.from(questionStringArray),
    },
    create: {
      clerk_id: userId,
      taken_exam: true,
      test_information: Buffer.from(questionStringArray),
    },
  });

  // const userRecommendation = await getAIRecommendation(userId);
  // console.log("Exam submitted successfully");

  return `${questionStringArray}`;
};
