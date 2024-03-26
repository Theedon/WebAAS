import * as Types from '../../types';

export type AllEventsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllEventsQuery = { __typename?: 'Query', allEvents: Array<{ __typename?: 'Event', description: string, id: string, title: string, event_date: any, creator_id: string, creator: { __typename?: 'User', firstName: string, lastName: string } | null }> };
