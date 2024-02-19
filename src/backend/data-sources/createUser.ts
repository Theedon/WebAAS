import { clerkClient } from "@clerk/nextjs/server";
import prisma from "../prisma/prisma";
import bcryptjs from "bcryptjs";
import { User } from "@prisma/client";

export const createUser = async (
  firstName: string,
  lastName: string,
  password: string,
  email: string,
  facultyCode: string,
  clerkId: string,
) => {
  const user: User = await prisma.user.findUnique({
    where: { email: email, clerk_id: clerkId },
  });
  if (user) {
    console.log(JSON.stringify(user));
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
      clerk_id: clerkId,
    },
  });
  if (!clerkId) {
    return "no logged in user";
  }

  const res = await clerkClient.users.updateUser(clerkId, {
    publicMetadata: {
      onboardingComplete: true,
    },
  });
  console.log(res.publicMetadata);

  return createdUser.id;
};
