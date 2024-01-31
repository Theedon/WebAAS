import prisma from "../prisma/prisma";

export const getTestInfo = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      clerk_id: userId,
    },
  });

  const test_information = user?.test_information?.toString();

  return { userId, test_information };
};
