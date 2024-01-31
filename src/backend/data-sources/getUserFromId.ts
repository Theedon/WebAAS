import { UserDomain, createUserDomain } from "../domains/UserDomain";
import prisma from "../prisma/prisma";
export const getUserFromId = async (id: string): Promise<UserDomain | null> => {
  const user = await prisma.user.findUnique({
    where: {
      clerk_id: id,
    },
  });

  if (!user) {
    return null;
  }

  return createUserDomain(user);
};
