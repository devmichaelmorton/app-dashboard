// Clerk middleware — runs on every request so Clerk knows who's logged in.
// Right now every page is public; to protect a page later, see:
// https://clerk.com/docs/references/nextjs/clerk-middleware
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Run on everything except Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Clerk's auto-proxy path (required in Clerk v7)
    "/__clerk/:path*",
  ],
};
