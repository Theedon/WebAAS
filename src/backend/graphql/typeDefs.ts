import { typeDefs as SubjectTypeDefs } from "./types/AllSubjects";
import { typeDefs as QuestionTypeDefs } from "./types/AllQuestions";
import { typeDefs as CreateUserTypeDefs } from "./mutations/CreateUser";
import { typeDefs as SaveExamTypeDefs } from "./mutations/SaveExam";
import { typeDefs as TestQuestionTypeDefs } from "./types/TestQuestions";
import { typeDefs as UserTypeDefs } from "./types/User";
import { typeDefs as UserExamInfoTypeDefs } from "./types/UserExamInfo";
import { typeDefs as AllUsersTypeDefs } from "./types/AllUsers";
import { typeDefs as AllStudentsTypeDefs } from "./types/AllStudents";
import { typeDefs as AllAdvisorsTypeDefs } from "./types/AllAdvisors";

export const typeDefs = [
  SubjectTypeDefs,
  QuestionTypeDefs,
  CreateUserTypeDefs,
  TestQuestionTypeDefs,
  SaveExamTypeDefs,
  UserTypeDefs,
  UserExamInfoTypeDefs,
  AllUsersTypeDefs,
  AllStudentsTypeDefs,
  AllAdvisorsTypeDefs,
];
