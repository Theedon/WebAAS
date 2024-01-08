import { UserDomain, createUserDomain } from "../domains/UserDomain";
import prisma from "@/backend/prisma/prisma";

import { compare } from "bcryptjs";

export const getUserFromCredentials = async (
  email: string,
  password: string,
) => {
  const user = await prisma.user.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new Error("could not find user");
  }

  const valid = await compare(password, user.password);
  if (!valid) {
    throw new Error("Incorrect password");
  }
  return createUserDomain(user);
};
