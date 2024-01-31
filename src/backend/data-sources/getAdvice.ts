import prisma from "../prisma/prisma";

export const getAdvice = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      clerk_id: userId,
    },
  });

  const ai_recommendation = user?.ai_recommendation?.toString();

  return { userId, ai_recommendation };
};
