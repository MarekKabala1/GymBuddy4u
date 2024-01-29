import { authMiddleware, redirectToSignIn, redirectToSignUp } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      if (req.url === "/") {
        return redirectToSignUp({ returnBackUrl: "/" });
      } else if (req.url === "/userPage") {
        return redirectToSignIn({ returnBackUrl: "/userPage" });
      }
    }
  },

  publicRoutes: ["/"],

});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

