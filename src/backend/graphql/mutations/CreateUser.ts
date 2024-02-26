import { createUser } from "@/backend/data-sources/createUser";
import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      password: String!
      email: String!
      facultyCode: String!
      clerkId: String!
    ): String!
  }
`;

export const resolvers = {
  Mutation: {
    createUser: (
      _parent: unknown,
      args: {
        firstName: string;
        lastName: string;
        password: string;
        email: string;
        facultyCode: string;
        clerkId: string;
      },
    ) => {
      return createUser(
        args.firstName,
        args.lastName,
        args.password,
        args.email,
        args.facultyCode,
        args.clerkId,
      );
    },
  },
};
