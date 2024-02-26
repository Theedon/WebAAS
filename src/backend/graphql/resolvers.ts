import { merge } from "lodash";
import { resolvers as SubjectResolvers } from "./types/AllSubjects";
import { resolvers as QuestionResolvers } from "./types/AllQuestions";
import { resolvers as CreateUserResolvers } from "./mutations/CreateUser";
import { resolvers as TestQuestionResolvers } from "./types/TestQuestions";
import { resolvers as SaveExamResolvers } from "./mutations/SaveExam";
import { resolvers as UserResolvers } from "./types/User";

const mergedResolvers = [
  SubjectResolvers,
  QuestionResolvers,
  CreateUserResolvers,
  TestQuestionResolvers,
  SaveExamResolvers,
  UserResolvers,
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const resolvers = merge({}, ...mergedResolvers);
