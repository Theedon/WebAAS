import * as Types from '../../../types';

export type RegisterUserMutationVariables = Types.Exact<{
  firstName: Types.Scalars['String']['input'];
  lastName: Types.Scalars['String']['input'];
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  faculty: Types.Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', createUser: string };
