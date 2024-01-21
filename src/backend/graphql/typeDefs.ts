import { typeDefs as SubjectTypeDefs } from "./types/Subjects";
import { typeDefs as QuestionTypeDefs } from "./types/Questions";
import { typeDefs as CreateUserTypeDefs } from "./mutations/CreateUser";
import { typeDefs as TestQuestionTypeDefs } from "./types/TestQuestions";

export const typeDefs = [
  SubjectTypeDefs,
  QuestionTypeDefs,
  CreateUserTypeDefs,
  TestQuestionTypeDefs,
];
