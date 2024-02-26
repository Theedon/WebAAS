import { getFacultyFromId } from "@/backend/data-sources/getFacultyFromId";
import { getUserExamInfo } from "@/backend/data-sources/getUserExamInfo";
import { getUserFromId } from "@/backend/data-sources/getUserFromId";
import { UserDomain } from "@/backend/domains/UserDomain";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    user(id: String!): User!
  }
  type Faculty {
    id: ID!
    name: String!
    code: String!
  }
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    onboarded: Boolean!
    verified: Boolean!
    role: String!
    faculty_id: String
    faculty: Faculty
    userExamInfo: UserExamInfo!
  }
`;

export const resolvers = {
  Query: {
    user: async (_parent: unknown, { id }: { id: string }) => {
      if (!id) return null;
      const user = await getUserFromId(id);
      return user;
    },
  },
  User: {
    faculty: async (parent: UserDomain) => {
      const faculty = await getFacultyFromId(parent.faculty_id);
      return faculty;
    },
    userExamInfo: async (parent: UserDomain) => {
      const examInfo = await getUserExamInfo(parent.clerk_id as string);
      return examInfo;
    },
  },
};
