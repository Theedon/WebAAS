import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import NextCors from "nextjs-cors";

// This function can be marked `async` if using `await` inside
export function middleware() {
  //   await NextCors(req, {
  //     origin: [
  //       process.env.NEXTAUTH_URL as string,
  //       "https://studio.apollographql.com",
  //     ],
  //   });

  // retrieve the current response
  const res = NextResponse.next();

  // add the CORS headers to the response
  res.headers.append("Access-Control-Allow-Credentials", "true");
  // res.headers.append(
  //   "Access-Control-Allow-Origin",
  //   "http://localhost:3000/api/graphql",
  // );
  res.headers.append("Access-Control-Allow-Origin", "https://web-*"); // replace this your actual origin
  // replace this your actual origin
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT",
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
