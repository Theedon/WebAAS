import prisma from "../prisma/prisma";
import bcryptjs from "bcryptjs";

export const createUser = async (
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  facultyCode: string,
) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (user) {
    throw new Error("User already present. Please log in");
  }

  const hashedPassword = await bcryptjs.hash(password, 12);
  const faculty = await prisma.faculty.findFirst({
    where: { code: facultyCode.toUpperCase() },
  });

  const createdUser = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      faculty_id: faculty?.id ?? "",
    },
  });

  return createdUser.id;
};
