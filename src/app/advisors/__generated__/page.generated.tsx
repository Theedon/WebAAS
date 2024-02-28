import * as Types from '../../types';

export type AllAdvisorsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllAdvisorsQuery = { __typename?: 'Query', allAdvisors: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, created_at: string, updated_at: string, phone_no: string | null, faculty: { __typename?: 'Faculty', name: string } | null }> };
