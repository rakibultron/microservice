import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const loggedInRoutes = ["/dashboard"];
const loggedOutRoutes = ["/auth/login", "/register"];

export default async function AuthMiddleware(
  req: NextRequest
): Promise<NextResponse> {
  const { pathname } = req.nextUrl;

  if (
    !loggedInRoutes.some((path) => pathname.startsWith(path)) &&
    !loggedOutRoutes.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.next();
  }

  const token = true;
  // const token = req.cookies.get("token")?.value || null;

  if (!token && loggedInRoutes.some((path) => pathname.startsWith(path))) {
    // Redirect to login if not authenticated and accessing logged-in routes
    return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);
  } else if (
    token &&
    loggedOutRoutes.some((path) => pathname.startsWith(path))
  ) {
    // Redirect to dashboard if authenticated and accessing logged-out routes
    return NextResponse.redirect(`${req.nextUrl.origin}/dashboard`);
  }

  return NextResponse.next();
}
