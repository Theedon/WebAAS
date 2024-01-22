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
    name: "Accounting",
    code: SubjectCode.ACCOUNTING,
    description:
      "Explore the principles of financial accounting, including recording financial transactions, preparing financial statements, and understanding financial performance.",
    facultyId: "",
    facultyCode: FacultyCode.COMMERCIAL,
  },
  {
    name: "Biology",
    code: SubjectCode.BIOLOGY,
    description:
      "Study the fascinating world of living organisms, from microorganisms to complex ecosystems. Biology explores the processes of life, genetics, evolution, and the diversity of living organisms.",
    facultyId: "",
    facultyCode: FacultyCode.SCIENCES,
  },
  {
    name: "Book Keeping",
    code: SubjectCode.BOOK_KEEPING,
    description:
      "Master the art of systematic recording, organizing, and maintaining financial transactions. Bookkeeping is crucial for businesses to track their financial health and make informed decisions.",
    facultyId: "",
    facultyCode: FacultyCode.COMMERCIAL,
  },
  {
    name: "Business Studies",
    code: SubjectCode.BUSINESS_STUDIES,
    description:
      "Delve into the fundamentals of business, covering topics like management, marketing, finance, and entrepreneurship. Business Studies equips you with essential skills for navigating the business world.",
    facultyId: "",
    facultyCode: FacultyCode.COMMERCIAL,
  },
  {
    name: "Chemistry",
    code: SubjectCode.CHEMISTRY,
    description:
      "Uncover the properties, composition, and behavior of matter. Chemistry explores the interactions between atoms and molecules, providing insights into the substances that make up our world.",
    facultyId: "",
    facultyCode: FacultyCode.SCIENCES,
  },
  {
    name: "Cultural and Creative Arts",
    code: SubjectCode.CULTURAL_AND_CREATIVE_ARTS,
    description:
      "Immerse yourself in the world of culture and creativity. This subject explores various forms of artistic expression, including visual arts, music, dance, and literature.",
    facultyId: "",
    facultyCode: FacultyCode.ARTS,
  },
  {
    name: "English",
    code: SubjectCode.ENGLISH,
    description:
      "Master the language of literature and communication. English studies encompass language skills, literature analysis, and effective communication in both written and spoken forms.",
    facultyId: "",
    facultyCode: FacultyCode.ARTS,
  },
  {
    name: "Law",
    code: SubjectCode.LAW,
    description:
      "Explore the principles and regulations that govern society. Law studies cover legal systems, justice, and the application of laws to resolve conflicts and maintain order.",
    facultyId: "",
    facultyCode: FacultyCode.ARTS,
  },
  {
    name: "Linguistics",
    code: SubjectCode.LINGUISTICS,
    description:
      "Delve into the study of language, including its structure, meaning, and use. Linguistics explores how languages evolve, are structured, and influence communication.",
    facultyId: "",
    facultyCode: FacultyCode.ARTS,
  },
  {
    name: "Literature in English",
    code: SubjectCode.LITERATURE_IN_ENGLISH,
    description:
      "Explore the rich world of literary works in the English language. Literature in English studies cover various genres, authors, and literary analysis.",
    facultyId: "",
    facultyCode: FacultyCode.GENERAL,
  },
  {
    name: "Math",
    code: SubjectCode.MATH,
    description:
      "Master the language of numbers and patterns. Mathematics explores the principles of quantity, structure, space, and change, providing a foundation for various scientific and engineering disciplines.",
    facultyId: "",
    facultyCode: FacultyCode.SCIENCES,
  },
];
