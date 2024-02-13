import { QuestionType } from "@/components/assessment/Assessment";
import prisma from "../prisma/prisma";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

export const getAIRecommendations = async (
  userId: string,
  assesmentInfo: QuestionType[],
) => {
  const assesmentWithSubjectNames = await updateSubjectNames(assesmentInfo);
  const questionStringArray = constructString(assesmentWithSubjectNames);

  const prompt = `
  As an esteemed academic advisor, students seek your expertise in navigating the crucial decision of choosing a college track post-high school. Your mission is to dissect their performance across five subjects, exposing strengths and weaknesses, and offering blunt insights into courses that resonate with their abilities. End your analysis by unapologetically recommending the top three college courses tailored to their strengths. Remember, you're addressing the student in first person, so be brutally honest and opinionated, Give as much information as you can and ensure response to be in free flowing markdown designed with beautiful colors.

  Here are the test results for this user:
  "${questionStringArray}"  
  `;

  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GENERATIVE_API_KEY as string,
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // console.log("this is the recommendation", text);

  const updateUser = await prisma.user.update({
    where: {
      clerk_id: userId,
    },
    data: {
      ai_recommendation: Buffer.from(text),
      onboarded: true,
      test_information: Buffer.from(questionStringArray),
    },
  });

  console.log("recommendation added for user successfully");

  return text;
};
