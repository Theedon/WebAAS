import * as Types from "../../types";

export type UserAdviceQueryVariables = Types.Exact<{
  userId: Types.Scalars["String"]["input"];
}>;

export type UserAdviceQuery = {
  __typename?: "Query";
  userAdvice: {
    __typename?: "Advice";
    ai_recommendation: string | null;
  } | null;
  user: { __typename?: "User"; ai_recommendation: string | null };
};
