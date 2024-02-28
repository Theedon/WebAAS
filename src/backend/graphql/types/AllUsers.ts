import getAllSubjects from "@/backend/data-sources/getAllSubjects";
import { getAllUsers } from "@/backend/data-sources/getAllUsers";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    allUsers: [User!]!
  }
`;

export const resolvers = {
  Query: {
    allUsers: (_parent: unknown) => {
      return getAllUsers("all");
    },
  },
};
