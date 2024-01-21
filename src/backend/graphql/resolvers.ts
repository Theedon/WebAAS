import { merge } from "lodash";
import { resolvers as SubjectResolvers } from "./types/Subjects";
import { resolvers as QuestionResolvers } from "./types/Questions";
import { resolvers as CreateUserResolvers } from "./mutations/CreateUser";
import { resolvers as TestQuestionResolvers } from "./types/TestQuestions";

const mergedResolvers = [
  SubjectResolvers,
  QuestionResolvers,
  CreateUserResolvers,
  TestQuestionResolvers,
];

export const resolvers = merge({}, ...mergedResolvers);
