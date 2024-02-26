import { saveExam } from "@/backend/data-sources/saveExam";
import { gql } from "graphql-tag";

export const typeDefs = gql`
  input AssessmentInfoInput {
    id: String!
    option_a: String!
    option_b: String!
    option_c: String!
    option_d: String!
    question: String!
    subject_id: String!
    correct_option: String!
    index: Int
    choice: String!
  }

  type Mutation {
    saveExam(userId: String!, assessmentInfo: [AssessmentInfoInput!]!): String!
  }
`;
export const resolvers = {
  Mutation: {
    saveExam: (
      _parent: unknown,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: { userId: string; assessmentInfo: any[] },
    ) => {
      // Assuming getAIRecommendations expects an array of AssessmentInfo
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return saveExam(args.userId, args.assessmentInfo);
    },
  },
};
