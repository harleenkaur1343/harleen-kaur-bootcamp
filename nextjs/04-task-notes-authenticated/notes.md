## Authentication
The features required for this project are covered in the 02-task-notes-design folder (which is covering the features for other sub modules as well) 

### Login & Register Pages

Both pages follow the same architecture — a server component (`page.tsx`) that
exports metadata and renders a client component (`LoginForm` / `RegisterForm`).

The client components use:
- `useActionState` to capture server action return values (`{ error: string } | null`)
  and display inline error messages without a page reload
- `useFormStatus` inside a dedicated `SubmitButton` component to show loading state
  ("Signing in..." / "Creating account...") and disable the button during submission
- `useState` + touched state for real-time client-side validation — errors only appear
  after the user has interacted with a field
- A reusable `FormField` component (`src/app/components/FormField.tsx`) that supports
  `input`, `textarea`, and `select` types with consistent error display and validation icons

Register form additionally shows a password strength indicator (Weak / Fair / Good /
Strong) that updates as the user types.

### Server Actions (`app/login/actions.ts`)

All authentication mutations are handled server-side via `"use server"` actions:

- `login(prevState, formData)` — validates email and password presence, calls
  `api.login()`, sets two cookies on success: `auth-token` (HTTP-only, 7 days) and
  `user` (readable, for client-side display), then redirects to `/tasks`
- `register(prevState, formData)` — validates all fields, checks password confirmation
  and minimum length, calls `api.register()`, sets `auth-token` cookie, redirects
  to `/tasks`
- `logout()` — deletes both `auth-token` and `user` cookies via `next/headers`,
  redirects to `/login`

The `login` and `register` actions accept `prevState` as their first parameter to
satisfy the `useActionState` signature requirement.

### HTTP-Only Cookies

The `auth-token` is stored as an HTTP-only cookie — it cannot be read or modified
by JavaScript in the browser. This prevents XSS attacks from stealing the token.
Settings used:
```ts
{
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7   // 7 days
}
```


### Middleware (`middleware.ts`)

Runs on every request except static files, API routes, and Next.js internals
(controlled by the `matcher` config). For each request it:

1. Reads `auth-token` from request cookies
2. Verifies the JWT using `jose.jwtVerify` against `JWT_SECRET`
3. Sets `isValidToken` — token verification failure sets it to `false` rather than
   redirecting inside the catch block, preventing redirect loops
4. Redirects unauthenticated users away from protected routes (`/tasks`, `/profile`,
   `/settings`) to `/login`
5. Redirects authenticated users away from auth routes (`/login`, `/register`) to
   `/tasks`

Protected routes and auth routes are defined as arrays and checked with
`path.startsWith()` to handle nested routes correctly.

### User Context (`contexts/AuthContext.tsx`)

A client-side context that reads the non-HTTP-only `user` cookie on mount and makes
user data available throughout the component tree. Provides:

- `user` — parsed user object (`id`, `email`, `name`) or `null`
- `loading` — true until the cookie read completes
- `clearUser` — sets user to null, called by `LogoutButton` before the server action
  runs so the navbar updates immediately

`AuthProvider` wraps the entire app in `layout.tsx`. Any component can access user
state via `useAuth()`.

### Logout Flow

`LogoutButton` (`"use client"`) uses `useTransition` to:
1. Call `clearUser()` from `AuthContext` immediately — navbar stops showing user info
2. Call the `logout()` server action — deletes HTTP-only cookies server-side and
   redirects to `/login`

The button shows a `Loader2` spinner and "Logging out..." text while pending.

### Authenticated API Calls (`lib/api-client.ts`)

All task operations go through `authenticatedRequest` which:
- Reads `auth-token` from cookies via `next/headers` (server-side only)
- Attaches it as a `Bearer` token in the `Authorization` header
- Throws `"Authentication required"` and deletes both cookies if the API returns 401
- Throws a generic error for other non-ok responses

`api-client.ts` has no `"use server"` directive — it is a plain server-side utility
file that exports `apiClient` as an object, which is valid outside of `"use server"`
files.

`api.ts` handles public (unauthenticated) requests for login and register. It uses
`credentials: "include"` and does not attach any auth headers.

### TypeScript Types
```ts
// types/user.ts
interface Login { email: string; password: string }
interface Register { name: string; email: string; password: string }

// contexts/AuthContext.tsx
interface User { id: string; email: string; name?: string }
interface AuthContextType { user: User | null; loading: boolean; clearUser: () => void }

// app/login/actions.ts
type AuthResponse = { token: string; user: { id: number; email: string } }
```