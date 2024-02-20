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

const constructString = (assesmentInfo: QuestionType[]): string => {
  const constructArray = assesmentInfo.map((exam) => {
    return `In the subject ${exam.subject_id}, to ${
      exam.question
    }, the student's answer was ${
      exam.choice || "nil"
    }, the correct answer is ${exam.correct_option}.`;
  });

  return constructArray.join("; ");
};

export const saveExam = async (
  userId: string,
  assesmentInfo: QuestionType[],
) => {
  const assesmentWithSubjectNames = await updateSubjectNames(assesmentInfo);
  const questionStringArray = constructString(assesmentWithSubjectNames);

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

  console.log("Exam submitted successfully");

  // console.log`${jsonSuggestedSubjects} | ${fullRecommendation}`;
  return `${questionStringArray}`;
};
