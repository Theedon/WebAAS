import * as Types from '../../types';

export type UserAdviceQueryVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type UserAdviceQuery = { __typename?: 'Query', user: { __typename?: 'User', userExamInfo: { __typename?: 'UserExamInfo', test_information: string | null, ai_recommendation: string | null, rec_course_1: string | null } } };
