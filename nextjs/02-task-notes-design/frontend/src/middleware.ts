import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const protectedRoutes = ["/tasks", "/profile", "/settings"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("auth-token");

  const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

  let isValidToken = false;
  if (token) {
    try {
      isValidToken = await hasValidTokenAsync(token, JWT_SECRET);
    } catch (error) {
      console.log("Middleware error", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth-token");
      response.cookies.delete("user");
      return response;
    }
  }

  if (isProtectedRoute && !isValidToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && isValidToken) {
    return NextResponse.redirect(new URL("/tasks", request.url));
    //return redirect("/tasks");
  }

  return NextResponse.next();
}

//  Helper function
async function hasValidTokenAsync(
  token: ReturnType<NextRequest["cookies"]["get"]> | null,
  secret: Uint8Array,
) {
  if (!token?.value) return false;
  try {
    await jwtVerify(token.value, secret);
    return true;
  } catch (error) {
    console.log("Error in verifying", error);
    return false;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
