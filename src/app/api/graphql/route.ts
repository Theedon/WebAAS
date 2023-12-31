/**
 * Configures and initializes an Apollo GraphQL server instance using the provided typeDefs and
 * resolvers. Creates a Next.js API route handler that will handle incoming GraphQL requests.
 *
 * The schema is created by combining the typeDefs and resolvers. An ApolloServer instance is
 * created with this schema. The startServerAndCreateNextHandler utility from @as-integrations/next
 * is used to generate a Next.js API route handler function that can handle GraphQL requests.
 *
 * This handler is then exported as both GET and POST handlers for the route.
 */
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/backend/graphql/typeDefs";
import { resolvers } from "@/backend/graphql/resolvers";
import { NextRequest, NextResponse } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";

const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
