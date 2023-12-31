import { merge } from "lodash";
import { resolvers as SubjectResolvers } from "./types/Subjects";
import { resolvers as QuestionResolvers } from "./types/Questions";

const mergedResolvers = [SubjectResolvers, QuestionResolvers];

export const resolvers = merge({}, ...mergedResolvers);
