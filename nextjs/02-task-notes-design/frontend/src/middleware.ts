// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

// Routes that require authentication
const protectedRoutes = ['/tasks', '/profile', '/settings'];

// Routes that should redirect to tasks if already authenticated
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('auth-token')?.value;

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    path.startsWith(route)
  );

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route =>  
    path.startsWith(route)                        
  );

  // Verify token if it exists
  let isValidToken = false;
  if (token) {
    try {
      const decoded = await jwtVerify(token, JWT_SECRET);
      //console.log("Decoded with middleware",decoded);
      isValidToken = true;
    } catch (error) {
      // Token is invalid or expired
     // const response = NextResponse.redirect(new URL('/login', request.url));
      // response.cookies.delete('auth-token');
      // response.cookies.delete('user');
      isValidToken = false
    }
  }

  // Redirect logic
  if (isProtectedRoute && !isValidToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && isValidToken) {
    return NextResponse.redirect(new URL('/tasks', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};