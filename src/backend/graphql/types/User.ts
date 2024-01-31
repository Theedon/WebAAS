import { getAdvice } from "@/backend/data-sources/getAdvice";
import { getFacultyFromId } from "@/backend/data-sources/getFacultyFromId";
import { getTestInfo } from "@/backend/data-sources/getTestInfo";
import { getUserFromId } from "@/backend/data-sources/getUserFromId";
import { UserDomain } from "@/backend/domains/UserDomain";
import gql from "graphql-tag";
import test from "node:test";

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
    ai_recommendation: String
    test_information: String
    faculty: Faculty
  }
`;

export const resolvers = {
  Query: {
    user: async (_parent: any, { id }: any) => {
      if (!id) return null;
      const user = await getUserFromId(id);
      return user;
    },
  },
  User: {
    faculty: async (parent: UserDomain, args: any) => {
      const faculty = await getFacultyFromId(parent.faculty_id);
      return faculty;
    },
    test_information: async (parent: UserDomain, args: any) => {
      const testInfo = await getTestInfo(parent.clerk_id);
      return testInfo.test_information;
    },
    ai_recommendation: async (parent: UserDomain, args: any) => {
      const advice = await getAdvice(parent.clerk_id);
      return advice.ai_recommendation;
    },
  },
};
