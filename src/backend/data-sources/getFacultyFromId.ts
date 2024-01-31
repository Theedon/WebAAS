import { FacultyDomain } from "../domains/FacultyDomain";
import prisma from "../prisma/prisma";

export const getFacultyFromId = async (facultyId: string) => {

  const faculty = await prisma.faculty.findUnique({
    where: {
      id: facultyId,
    },
  });

  if (!faculty) {
    return null;
  }
  return new FacultyDomain(faculty.id, faculty.name, faculty.code);
};
