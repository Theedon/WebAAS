import { authMiddleware } from "@clerk/nextjs";
import { createContext } from "./backend/graphql/context";

export default authMiddleware({
  publicRoutes: ["/api/graphql"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
