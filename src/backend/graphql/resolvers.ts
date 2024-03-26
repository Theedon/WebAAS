import { merge } from "lodash";
import { resolvers as SubjectResolvers } from "./types/AllSubjects";
import { resolvers as QuestionResolvers } from "./types/AllQuestions";
import { resolvers as CreateUserResolvers } from "./mutations/CreateUser";
import { resolvers as TestQuestionResolvers } from "./types/TestQuestions";
import { resolvers as SaveExamResolvers } from "./mutations/SaveExam";
import { resolvers as UserResolvers } from "./types/User";
import { resolvers as AllUsersResolvers } from "./types/AllUsers";
import { resolvers as AllStudentsResolvers } from "./types/AllStudents";
import { resolvers as AllAdvisorsResolvers } from "./types/AllAdvisors";
import { resolvers as CreateEventResolvers } from "./mutations/CreateEvent";
import { resolvers as AllEventsResolvers } from "./types/AllEvents";
import { resolvers as DateResolvers } from "./types/Date";

const mergedResolvers = [
  SubjectResolvers,
  QuestionResolvers,
  CreateUserResolvers,
  TestQuestionResolvers,
  SaveExamResolvers,
  UserResolvers,
  AllUsersResolvers,
  AllStudentsResolvers,
  AllAdvisorsResolvers,
  CreateEventResolvers,
  AllEventsResolvers,
  DateResolvers,
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const resolvers = merge({}, ...mergedResolvers);
