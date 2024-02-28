import { $Enums, User } from "@prisma/client";
import { createUserDomain } from "../domains/UserDomain";
import prisma from "../prisma/prisma";

type UserProp = "all" | "student" | "advisor";

export const getAllUsers = async (user: UserProp = "all") => {
  let users: User[] = [];

  if (user === "student") {
    users = await prisma.user.findMany({
      where: {
        role: $Enums.Role.student,
      },
    });
  }

  if (user === "advisor") {
    users = await prisma.user.findMany({
      where: {
        role: $Enums.Role.advisor,
      },
    });
  }

  if (user === "all") {
    users = await prisma.user.findMany();
  }
  //   console.log(users);
  return users.map((user) => createUserDomain(user));
};
