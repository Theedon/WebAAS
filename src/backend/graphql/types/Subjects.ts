import getAllSubjects from "@/backend/data-sources/getAllSubjects";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    allSubjects: [Subject!]!
  }

  type Subject {
    id: ID!
    name: String!
    description: String
  }
`;

export const resolvers = {
  Query: {
    allSubjects: (_parent: any) => {
      return getAllSubjects();
    },
  },
};
