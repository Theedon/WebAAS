import getAllSubjects from "@/backend/data-sources/getAllSubjects";
import { getAllUsers } from "@/backend/data-sources/getAllUsers";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    allStudents: [User!]!
  }
`;

export const resolvers = {
  Query: {
    allStudents: (_parent: unknown) => {
      return getAllUsers("student");
    },
  },
};
