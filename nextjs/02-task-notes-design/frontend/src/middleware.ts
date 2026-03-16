import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/tasks', '/profile', '/settings'];
const authRoutes = ['/login', '/register'];



export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth-token');
  
  // console.log("PATH:", path);
  // console.log("TOKEN:", token?.value);

  const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET
  );

  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  // Skip middleware for login/register pages entirely
  if (isAuthRoute) {

    const hasValidToken = await hasValidTokenAsync(token, JWT_SECRET);
    if (hasValidToken) {
      return NextResponse.redirect(new URL('/tasks', request.url));
    }
    return NextResponse.next(); // Allow access to login/register
  }

  // Protected routes
  if (isProtectedRoute) {
    const hasValidToken = await hasValidTokenAsync(token, JWT_SECRET);
    if (!hasValidToken) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      response.cookies.delete('user');
      return response;
    }
  }

  return NextResponse.next();
}

//  Helper function
async function hasValidTokenAsync(token: ReturnType<NextRequest['cookies']['get']> | null, secret: Uint8Array) {
  if (!token?.value) return false;
  try {
    await jwtVerify(token.value, secret);
    return true;
  } catch(error) {
    console.log("Error in verifying", error);
    return false;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'],
};
