# Task Notes React App

A **React + TypeScript** frontend application that connects to a **Task Notes API** backend.
The app allows users to **register, login, and manage tasks** including creating, editing, completing, filtering, and deleting tasks.

---

# Features

### Authentication

* Register new users
* Login with existing account
* JWT token stored in `localStorage`
* Authenticated API requests using `Authorization` headers

### Task Management

* View tasks
* Create new tasks
* Edit task details
* Toggle task completion
* Delete tasks with confirmation modal
* Filter tasks (All / Active / Completed)

### UI & Error Handling

* Loading state indicators
* Error messages for failed API calls
* React `ErrorBoundary` for runtime component errors
* Reusable React components
* Basic CSS styling

---

# Tech Stack

* React
* TypeScript
* Vite
* Fetch API
* CSS

---

# Project Structure

```
src/
  components/
    TaskList.tsx
    TaskItem.tsx
    AddTaskForm.tsx
    DeleteModal.tsx
    LoadingSpinner.tsx
    ErrorMessage.tsx
    ErrorBoundary.tsx

  auth/
    LoginForm.tsx
    RegisterForm.tsx
    authApi.ts

  hooks/
    useTasks.ts

  utils/
    apiClient.ts

  types/
    task.ts
```

---

# Backend Requirement

This project **uses an external backend API** from the **Node module: `07-testing`**.

The backend server must be running at:

```
http://localhost:9000
```

API endpoints used:

```
POST   /api/auth/register
POST   /api/auth/login

GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

# Running the Project

### 1. Start Backend

Run the backend from the **Node module (07-testing)**:

```
cd Node/07-testing
pnpm install
pnpm dev
```

Backend runs on:

```
http://localhost:9000
```

---

### 2. Start Frontend

Navigate to the React project:

```
cd next/00-react-task-notes
```

Install dependencies:

```
pnpm install
```

Start the development server:

```
pnpm dev
```

Frontend runs on:

```
http://localhost:5173
```
