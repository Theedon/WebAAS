import { merge } from "lodash";
import { resolvers as SubjectResolvers } from "./types/Subjects";
import { resolvers as QuestionResolvers } from "./types/Questions";
import { resolvers as CreateUserResolvers } from "./mutations/CreateUser";

const mergedResolvers = [
  SubjectResolvers,
  QuestionResolvers,
  CreateUserResolvers,
];

export const resolvers = merge({}, ...mergedResolvers);
