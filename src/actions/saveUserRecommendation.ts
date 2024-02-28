"use server";
import prisma from "@/backend/prisma/prisma";

export const saveUserRecommendation = async (
  userId: string,
  recommendation: string,
) => {
  const updateUser = await prisma.userToExam.update({
    where: {
      clerk_id: userId,
    },
    data: {
      ai_recommendation: Buffer.from(recommendation),
      taken_exam: true,
    },
  });
  console.log("user recommendation is updated");

  return "user recommendation is updated";
};
