import getAllQuestions from "@/backend/data-sources/getAllQuestions";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    allQuestions: [Question!]!
  }

  type Question {
    id: String!
    option_a: String
    option_b: String
    option_c: String
    option_d: String
    subject_id: String
    question: String!
  }
`;

export const resolvers = {
  Query: {
    allQuestions: (_parent: any) => {
      return getAllQuestions();
    },
  },
};
