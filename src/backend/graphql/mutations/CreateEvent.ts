import { createEvent } from "@/backend/data-sources/createEvent";
import gql from "graphql-tag";

export const typeDefs = gql`
  type Mutation {
    createEvent(
      title: String!
      date: String!
      description: String!
      creator_id: String!
    ): String!
  }
`;

export const resolvers = {
  Mutation: {
    createEvent: async (
      _parent: unknown,
      args: {
        title: string;
        date: string;
        description: string;
        creator_id: string;
      },
    ) => {
      const event = await createEvent(
        args.title,
        args.description,
        args.date,
        args.creator_id,
      );

      return event.id;
    },
  },
};
