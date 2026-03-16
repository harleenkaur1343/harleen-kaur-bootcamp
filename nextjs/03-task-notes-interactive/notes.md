## Implementation Details

The features required for this project are covered in the 02-task-notes-design folder (which is covering the features for other sub modules as well) 

Here is the information about what has been implemented 

### Create Task Form
Located at `tasks/new`. Implemented as a `"use client"` component using a native
`<form action={createTask}>` pointing directly at a server action. Fields: title
(required), description (optional), priority (low / medium / high, defaults to medium).
Server action (`tasks/new/action.ts`) validates that title is non-empty and priority
is a valid enum value, calls `apiClient.createTask`, runs `revalidatePath('/tasks')`
to clear the cached task list, then redirects to `/tasks` on success. Errors are
thrown and caught by the nearest `error.tsx` boundary.

### Edit Task Form
Located at `tasks/[id]/edit`. The page (`page.tsx`) is a server component that fetches
the existing task via `apiClient.getTask(id)` and passes it as props to the client
component (`AnimatedEditForm`). If the task is not found, `notFound()` is called.
The form pre-populates all fields using `defaultValue`. The server action (`updateTask`)
is bound to the task id using `updateTask.bind(null, id)` and validates title and
priority before calling `apiClient.updateTask`, revalidating `/tasks`, and redirecting
on success.

### Toggle Completion
Implemented in `TaskActions` (`"use client"`). Uses `useTransition` to call
`toggleTaskCompletion(task.id, !task.completed)` in the background. The button is
disabled and shows "Updating..." while `isPending` is true, and changes style between
green (completed) and yellow (pending) based on current status.

### Delete Confirmation
Implemented in `TaskActions` alongside the toggle. A custom modal is rendered
conditionally using `useState(isDeleteModalOpen)`. Clicking Delete opens the modal
showing the task title. Confirming calls `deleteTask(task.id)` inside `startTransition`.
The confirm button shows "Deleting..." and is disabled while `isPending` is true.

### Form Validation

**Server-side (create and edit):**
- Title must be non-empty after trim
- Priority must be one of `low`, `medium`, `high`
- Errors are thrown and surface via the `error.tsx` boundary

**Client-side (login and register only):**
- Real-time validation using touched state (errors shown only after field interaction)
- Email format, password minimum 8 characters, uppercase letter, number required
- Password strength indicator and confirm password match check
- Server errors captured via `useActionState` and shown inline

### Server Actions
All data mutations use Next.js server actions:
- `createTask` — `tasks/new/action.ts`
- `updateTask` — `tasks/[id]/edit/action.ts`
- `toggleTaskCompletion` — `lib/actions.ts`
- `deleteTask` — `lib/actions.ts`
- `login`, `register`, `logout` — `app/login/actions.ts`

Each action calls `apiClient` (authenticated HTTP client in `lib/api-client.ts`),
runs `revalidatePath` where needed, and redirects on success.

### Client Components
Client components (`"use client"`) are used only where interactivity is required:
- Form pages (Framer Motion animations require client context)
- `TaskActions` (toggle and delete use `useState` and `useTransition`)
- `LoginForm` / `RegisterForm` (real-time validation, `useActionState`, `useFormStatus`)
- `TaskDetailClient` (completion toggle, delete modal, `useRouter`)

### Progressive Enhancement
Create and edit forms use `<form action={serverAction}>` directly — no JavaScript
event handlers on the form itself. Both forms submit and complete the full
create/update/redirect flow without JavaScript enabled in the browser.

### Error Handling
- `app/tasks/error.tsx` — catches thrown errors from server actions and API failures,
  shows a "Something went wrong" UI with a "Try Again" button that calls `reset()`
- Server actions throw `new Error(...)` on validation failure or API error
- `notFound()` called in edit page if task fetch fails
- `apiClient` throws on non-ok responses and deletes auth cookies on 401

### Loading States
- `app/tasks/loading.tsx` — shown by Next.js automatically during server component
  fetch, displays animated text, a `LoadingSpinner`, and shadcn `Skeleton` elements
- `TaskActions` toggle button shows "Updating..." and is disabled while `isPending`
- Delete confirm button shows "Deleting..." and is disabled while `isPending`
- Login/register submit buttons use `useFormStatus` to show "Signing in..." /
  "Creating account..." with a `Loader2` spinner while the form is pending

### Optimistic Updates
The completion toggle in `TaskDetailClient` calls `setIsCompleted(!isCompleted)`
immediately before the server action resolves, giving instant visual feedback. The
server revalidates `/tasks` and `/tasks/[id]` after confirming the update. No other
mutations use optimistic updates — create, edit, and delete wait for the server
before updating the UI.