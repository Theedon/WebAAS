import getTestQuestions from "@/backend/data-sources/getTestQuestions";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    testQuestions(faculty: String!): [[Question!]!]!
  }

  type Question {
    id: String!
    option_a: String
    option_b: String
    option_c: String
    option_d: String
    subject_id: String
    question: String!
    correct_option: String
  }
`;

export const resolvers = {
  Query: {
    testQuestions: async (_parent: any, { faculty }: any) => {
      const questions = await getTestQuestions(faculty);
      return questions;
    },
  },
};
