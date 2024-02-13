import * as Types from "../../types";

export type TestQuestionsQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type TestQuestionsQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    ai_recommendation: string | null;
    faculty: { __typename?: "Faculty"; code: string } | null;
  };
  testQuestions: Array<
    Array<{
      __typename?: "Question";
      id: string;
      option_a: string | null;
      option_b: string | null;
      option_c: string | null;
      option_d: string | null;
      subject_id: string | null;
      question: string;
      correct_option: string | null;
    }>
  >;
};
