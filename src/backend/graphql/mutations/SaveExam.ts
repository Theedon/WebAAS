import { getAIRecommendations } from "@/backend/data-sources/getAIRecommendation";
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
    saveExam(assessmentInfo: [AssessmentInfoInput!]!): String!
  }
`;
export const resolvers = {
  Mutation: {
    saveExam: (_parent: any, args: { assessmentInfo: any[] }, context: any) => {
      // Assuming getAIRecommendations expects an array of AssessmentInfo
      return getAIRecommendations(args.assessmentInfo);
    },
  },
};
