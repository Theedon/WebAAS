import { getAdvice } from "@/backend/data-sources/getAdvice";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    userAdvice(userId: String!): Advice
  }

  type Advice {
    id: String
    ai_recommendation: String
  }
`;

export const resolvers = {
  Query: {
    userAdvice: (_parent: any, { userId }: { userId: string }) => {
      return getAdvice(userId);
    },
  },
};
