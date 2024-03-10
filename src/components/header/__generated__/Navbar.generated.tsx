import * as Types from '../../../app/types';

export type UserQueryVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', role: string } };
