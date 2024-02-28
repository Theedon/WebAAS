import { RawUsers } from ".";
import { FacultyCode } from "../subjects/utils";
import { $Enums } from "@prisma/client";
import bcryptjs from "bcryptjs";
import prisma from "@/backend/prisma/prisma";

export type UserType = {
  first_name: string;
  middle_name: string;
  last_name: string;
  password: string;
  email: string;
  role?: $Enums.Role;
  verified: boolean;
  onboarded: boolean;
  faculty_id: string;
  faculty_code: FacultyCode;
  phone_no?: string;
};

const getFacultyIdByCode = async (code: string) => {
  const faculty = await prisma.faculty.findUnique({
    where: {
      code,
    },
  });
  return faculty?.id ?? "";
};

const fillUsersWithId = async (RawUsers: UserType[]) => {
  const Users: UserType[] = await Promise.all(
    RawUsers.map(async (user) => ({
      ...user,
      faculty_id: await getFacultyIdByCode(user.faculty_code),
      password: await bcryptjs.hash(user.password, 12),
    })),
  );
  return Users;
};

export const getUsers = async () => {
  const users = await fillUsersWithId(RawUsers);
  return users;
};
