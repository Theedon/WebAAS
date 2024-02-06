/**
 * Configures and returns an Apollo Client instance for server-side rendering.
 *
 * Uses Next.js integration from @apollo/experimental-nextjs-app-support to handle:
 * - Server-side rendering with a shared cache
 * - Lazy-loading the client on the client-side
 *
 * The client is configured with:
 * - An HttpLink to the GraphQL API endpoint
 * - A NextSSRInMemoryCache for the cache
 *
 * The configured client is exported via the registerApolloClient helper.
 */
import { HttpLink } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { getEndpoint } from "../exposeUri";

const endpoint = getEndpoint();
console.log(endpoint);
export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: new HttpLink({
      uri: `${endpoint}/api/graphql`,
    }),
  });
});
