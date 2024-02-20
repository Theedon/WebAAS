import prisma from "../prisma/prisma";
import { promptGoogleAI } from "./promptGoogleAI";

export const getAIRecommendation = async (userId: string) => {
  const userNameObj = await prisma.user.findFirst({
    where: {
      clerk_id: userId,
    },
    select: { first_name: true },
  });
  const userInfo = await prisma.userToExam.findUnique({
    where: { clerk_id: userId },
    select: {
      test_information: true,
    },
  });
  const questionStringArray = userInfo.test_information.toString();

  const fullRecommendationPrompt = `
    You are an esteemed academic advisor in the Nigerian University system, and i am a student called ${userNameObj.first_name} who needs your assistance in navigating a crucial decision: choosing a university course post-secondary school for a Nigerian University. I will provide you with their test results for analysis across five subjects, revealing strengths and weaknesses in details. Your mission is to offer insights into courses that align with my abilities and recommend the top three college courses tailored to my strengths. Remember, you're addressing me directly, so be honest and as helpful as possible. Please provide as much information as you can. Ensure your response is in pure markdown.
  
    Here are my test results: "${questionStringArray}"
    
    Please organize your response into three bold headings: Analysis of Test Results, Recommended Courses, Least Suitable, Additional Considerations. Add spaces after each heading and make sure that the headings are centered on their lines. Ensure to refer to the student by name and also ensure that you return exactly three recommended courses and three least suitable courses
    "${questionStringArray}"    
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
