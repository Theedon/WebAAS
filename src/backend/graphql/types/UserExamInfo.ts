import gql from "graphql-tag";

export const typeDefs = gql`
  type UserExamInfo {
    test_information: String
    ai_recommendation: String
    rec_course_1: String
    rec_course_2: String
    rec_course_3: String
    anti_course_1: String
    anti_course_2: String
    anti_course_3: String
    taken_exam: Boolean!
    updated_at: Date!
  }
`;
