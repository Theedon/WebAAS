import * as Types from '../types';

export type GetSubjectsQueryVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type GetSubjectsQuery = { __typename?: 'Query', user: { __typename?: 'User', userExamInfo: { __typename?: 'UserExamInfo', rec_course_1: string | null, rec_course_2: string | null, rec_course_3: string | null, anti_course_1: string | null, anti_course_2: string | null, anti_course_3: string | null } }, allAdvisors: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, created_at: string, updated_at: string, phone_no: string | null, faculty: { __typename?: 'Faculty', name: string } | null }> };
