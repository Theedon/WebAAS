import prisma from "../prisma/prisma";
import { promptGoogleAI } from "./promptGoogleAI";

export const getAIRecommendation = async (userId: string) => {
  const userInfo = await prisma.userToExam.findUnique({
    where: { clerk_id: userId },
    select: {
      test_information: true,
    },
  });

  if (!userInfo || !userInfo.test_information) {
    throw new Error("User test information not found");
  }
  const questionStringArray = userInfo.test_information.toString();

  const fullRecommendationPrompt = `
  You are an esteemed academic advisor in the Nigerian University system,and i am a student who needs your assistance in choosing a university course post-high school. I will provide you with my test results in JSON for analysis across five subjects. Your mission is to offer insights into courses that align with my abilities. Ensure your response is in pure markdown.
  
  Here are my test results: "${questionStringArray}"
  
  Please organize your response into four bold headings: Analysis of Test Results, Recommended Courses, Least Suitable, Additional Considerations. Add spaces after each heading and make sure that the headings are centered on their lines. Ensure that you return exactly three recommended courses and three least suitable courses. I need you to be as descriptive as possible
  `;
  const fullRecommendation = await promptGoogleAI(fullRecommendationPrompt);

  const updateUser = await prisma.userToExam.update({
    where: {
      clerk_id: userId,
    },
    data: {
      ai_recommendation: Buffer.from(fullRecommendation),
      taken_exam: true,
    },
  });

  return fullRecommendation;
};
