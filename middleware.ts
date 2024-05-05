
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/userPage(.*)',
]);

const clerkMiddlewareWithHeader = clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }

  // Add x-current-path header
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
  return NextResponse.next({ headers });
});

export default clerkMiddlewareWithHeader;

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
