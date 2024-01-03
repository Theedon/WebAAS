/**
 * Creates an Apollo client instance configured for SSR with Next.js.
 * Uses NextSSRInMemoryCache and NextSSRApolloClient from @apollo/experimental-nextjs-app-support/ssr.
 * Configures SSRMultipartLink for SSR requests and plain HttpLink for client requests.
 * Exports a React component ApolloWrapper that wraps the app with ApolloNextAppProvider.
 */
"use client";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
  ApolloNextAppProvider,
} from "@apollo/experimental-nextjs-app-support/ssr";
import React from "react";
import { endpoint } from "../exposeUri";

function makeClient() {
  const httpLink = new HttpLink({
    uri: `${endpoint}/api/graphql`,
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
