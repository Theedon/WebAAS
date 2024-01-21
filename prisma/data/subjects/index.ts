import { PrismaClient } from "@prisma/client";
import { FacultyCode, SubjectType } from "./utils";
import { SubjectCode } from "../questions/utils";

const prisma = new PrismaClient();

const getFacultyIdByCode = async (code: string) => {
  const faculty = await prisma.faculty.findUnique({
    where: {
      code,
    },
  });
  return faculty?.id ?? "";
};

const fillSubjectsWithId = async () => {
  const Subjects: SubjectType[] = await Promise.all(
    RawSubjects.map(async (subject) => ({
      ...subject,
      facultyId: await getFacultyIdByCode(subject.facultyCode),
    })),
  );
  return Subjects;
};

export const getSubjects = async () => {
  const subjects = await fillSubjectsWithId();
  return subjects;
};

/**
 * Subjects Data
 **/
const RawSubjects: SubjectType[] = [
  {
    name: "Physics",
    code: SubjectCode.PHYSICS,
    description:
      "It seeks to understand the fundamental laws and principles that govern everything from the tiniest subatomic particles to the vast expanses of galaxies.",
    facultyId: "",
    facultyCode: FacultyCode.SCIENCES,
  },
  {
    name: "Commerce",
    code: SubjectCode.COMMERCE,

    description:
      "Dive into the dynamic world of business and trade! Commerce ignites your entrepreneurial spirit, exploring markets, finance, management, marketing, and global economics. Discover how businesses thrive, make strategic decisions, and navigate the exciting challenges of the commercial landscape.",
    facultyId: "",
    facultyCode: FacultyCode.COMMERCIAL,
  },
  {
    name: "French",
    code: SubjectCode.FRENCH,

    description:
      "Bonjour, francophiles! Embark on a linguistic and cultural journey with French. Master the language of love, art, and diplomacy. Unlock captivating literature, engage in lively conversations, and explore the rich history and vibrant cultures of France and Francophone communities around the globe",
    facultyId: "",
    facultyCode: FacultyCode.ARTS,
  },
  {
    name: "Accounting",
    code: SubjectCode.ACCOUNTING,

    description:
      "Explore the principles of financial accounting, including recording financial transactions, preparing financial statements, and understanding financial performance.",
    facultyId: "",
    facultyCode: FacultyCode.COMMERCIAL,
  },
];
