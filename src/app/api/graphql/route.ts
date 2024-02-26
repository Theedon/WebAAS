import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/backend/graphql/typeDefs";
import { resolvers } from "@/backend/graphql/resolvers";
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const schema = makeExecutableSchema({ typeDefs, resolvers });
const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  // eslint-disable-next-line @typescript-eslint/require-await
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
