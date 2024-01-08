import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserFromCredentials } from "@/backend/data-sources/getUserFromCredentials";
import { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt";
import * as jwtLibrary from "jsonwebtoken";

const useSecureCookies = process.env.NODE_ENV === "production";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "secret",
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `${useSecureCookies ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain:
          process.env.NODE_ENV === "production"
            ? `.${process.env.PARENT_DOMAIN as string}` // note the leading dot
            : undefined,
        secure: useSecureCookies,
      },
    },
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        const email = credentials?.email;
        const password = credentials?.password;

        if (email && password) {
          try {
            const user = await getUserFromCredentials(email, password);
            if (user) {
              return { ...user };
            }
          } catch (e) {
            return null;
          }
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  jwt: {
    // Generating the jwt that will be stored in the next-auth.session-token cookie here
    encode(params: JWTEncodeParams): Promise<string> {
      // return a custom encoded JWT string
      if (!params.token) throw new Error("No token provided");
      const token = jwtLibrary.sign(params.token, params.secret, {
        algorithm: "HS256",
      });
      return Promise.resolve(token);
    },
    async decode(params: JWTDecodeParams): Promise<JWT | null> {
      // return a `JWT` object, or `null` if decoding failed
      try {
        if (!params.token) throw new Error("No token provided");
        const decodedJWT = jwtLibrary.verify(
          params.token,
          params.secret,
        ) as JWT;
        return Promise.resolve(decodedJWT);
      } catch (err: any) {
        return null;
      }
    },
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    session: async ({ session, token }) => {
      if (session?.user) {
        return {
          ...session,
          user: {
            id: token.uid,
            ...session.user,
          },
        };
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
