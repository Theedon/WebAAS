import { typeDefs as SubjectTypeDefs } from "./types/AllSubjects";
import { typeDefs as QuestionTypeDefs } from "./types/AllQuestions";
import { typeDefs as CreateUserTypeDefs } from "./mutations/CreateUser";
import { typeDefs as SaveExamTypeDefs } from "./mutations/SaveExam";
import { typeDefs as TestQuestionTypeDefs } from "./types/TestQuestions";
import { typeDefs as UserAdviceTypeDefs } from "./types/UserAdvice";
import { typeDefs as UserTypeDefs } from "./types/User";
import { typeDefs as UserExamInfoTypeDefs } from "./types/UserExamInfo";

export const typeDefs = [
  SubjectTypeDefs,
  QuestionTypeDefs,
  CreateUserTypeDefs,
  TestQuestionTypeDefs,
  SaveExamTypeDefs,
  UserAdviceTypeDefs,
  UserTypeDefs,
  UserExamInfoTypeDefs,
];
