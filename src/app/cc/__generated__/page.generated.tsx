import * as Types from "../../types";

export type AllQuestionsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type AllQuestionsQuery = {
  __typename?: "Query";
  allQuestions: Array<{
    __typename?: "Question";
    id: string;
    option_a: string | null;
    option_b: string | null;
    option_c: string | null;
    option_d: string | null;
    question: string;
    subject_id: string | null;
  }>;
};
