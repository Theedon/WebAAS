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
