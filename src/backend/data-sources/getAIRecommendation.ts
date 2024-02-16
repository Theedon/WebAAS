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
  As an esteemed academic advisor, I need your assistance in navigating a crucial decision: choosing a college track post-high school. I will provide you with the test results for analysis across five subjects, revealing strengths and weaknesses in details. Your mission is to offer insights into courses that align with my abilities and recommend the top three college courses tailored to my strengths. Remember, you're addressing me directly, so be honest and as helpful as possible. Please provide as much information as you can and ensure that your response is in pure markdown.

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
