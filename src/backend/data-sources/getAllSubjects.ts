import { Subject } from "@prisma/client";
import SubjectDomain from "../domains/SubjectDomain";
import prisma from "../prisma/prisma";

const getAllSubjects = async () => {
  let subjects = [];
  subjects = await prisma.subject.findMany();

  return subjects.map((subject: Subject) => {
    return new SubjectDomain(subject.id, subject.name, subject.description);
  });
};

export default getAllSubjects;
