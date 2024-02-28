import getAllSubjects from "@/backend/data-sources/getAllSubjects";
import { getAllUsers } from "@/backend/data-sources/getAllUsers";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    allAdvisors: [User!]!
  }
`;

export const resolvers = {
  Query: {
    allAdvisors: (_parent: unknown) => {
      return getAllUsers("advisor");
    },
  },
};
