import * as Types from '../../../app/types';

export type CreateEventMutationVariables = Types.Exact<{
  title: Types.Scalars['String']['input'];
  date: Types.Scalars['String']['input'];
  description: Types.Scalars['String']['input'];
  creatorId: Types.Scalars['String']['input'];
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: string };
