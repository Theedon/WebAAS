import prisma from "../prisma/prisma";
import bcryptjs from "bcryptjs";

export const createUser = async (
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  faculty: any,
) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (user) {
    throw new Error("User already present. Please log in");
  }

  const hashedPassword = await bcryptjs.hash(password, 12);

  const createdUser = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      faculty: faculty,
    },
  });

  return createdUser.id;
};
