import * as Types from '../../types';

export type UserAdviceQueryVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type UserAdviceQuery = { __typename?: 'Query', user: { __typename?: 'User', role: string, userExamInfo: { __typename?: 'UserExamInfo', ai_recommendation: string | null, updated_at: string | null } | null } };
