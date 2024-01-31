import prisma from "../prisma/prisma";

export const checkIfUserRegistered = async (userId: string | null) => {
  if (!userId) return null;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerk_id: userId,
    },
  });

  return user;
};
