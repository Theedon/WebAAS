import * as Types from '../types';

export type GetSubjectsQueryVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type GetSubjectsQuery = { __typename?: 'Query', user: { __typename?: 'User', role: string, userExamInfo: { __typename?: 'UserExamInfo', rec_course_1: string | null, rec_course_2: string | null, rec_course_3: string | null, anti_course_1: string | null, anti_course_2: string | null, anti_course_3: string | null } } };
