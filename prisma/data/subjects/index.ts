import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SubjectsType = {
  name: string;
  description: string;
  facultyId: string;
  facultyCode: string;
};

const getFacultyIdByCode = async (code: string) => {
  const faculty = await prisma.faculty.findUnique({
    where: {
      code,
    },
  });
  return faculty?.id ?? ""; // Assuming 'id' is the field you want to assign to facultyId
};

const fillSubjectsWithId = async () => {
  const Subjects: SubjectsType[] = await Promise.all(
    RawSubjects.map(async (subject) => ({
      ...subject,
      facultyId: await getFacultyIdByCode(subject.facultyCode), // Assuming subject name can be used as a code
    })),
  );
  return Subjects;
};

export const getSubjects = async () => {
  const subjects = await fillSubjectsWithId();
  return subjects;
};

const RawSubjects: SubjectsType[] = [
  {
    name: "Physics",
    description:
      "It seeks to understand the fundamental laws and principles that govern everything from the tiniest subatomic particles to the vast expanses of galaxies. ",
    facultyId: "",
    facultyCode: "SCI",
  },
  {
    name: "Commerce",
    description:
      "Dive into the dynamic world of business and trade! Commerce ignites your entrepreneurial spirit, exploring markets, finance, management, marketing, and global economics. Discover how businesses thrive, make strategic decisions, and navigate the exciting challenges of the commercial landscape.",
    facultyId: "",
    facultyCode: "COM",
  },
  {
    name: "French",
    description:
      "Bonjour, francophiles! Embark on a linguistic and cultural journey with French. Master the language of love, art, and diplomacy. Unlock captivating literature, engage in lively conversations, and explore the rich history and vibrant cultures of France and Francophone communities around the globe",
    facultyId: "",
    facultyCode: "ART",
  },
];
