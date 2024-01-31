import * as Types from "../../types";

export type TestQuestionsQueryVariables = Types.Exact<{
  faculty: Types.Scalars["String"]["input"];
}>;

export type TestQuestionsQuery = {
  __typename?: "Query";
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
