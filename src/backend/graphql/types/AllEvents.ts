import { getAllEvents } from "@/backend/data-sources/getAllEvents";
import { getUserFromId } from "@/backend/data-sources/getUserFromId";
import { EventDomain } from "@/backend/domains/EventDomain";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    allEvents: [Event!]!
  }

  type Event {
    id: String!
    creator_id: String!
    title: String!
    description: String!
    event_date: Date!
    creator: User
  }
`;

export const resolvers = {
  Query: {
    allEvents: async (_parent: unknown) => {
      return await getAllEvents();
    },
  },
  Event: {
    creator: async (parent: EventDomain) => {
      const creator = await getUserFromId(parent.creator_id);
      return creator;
    },
  },
};
