import { cookies } from "next/headers";
import type { Task } from "@/types/task";

export interface TaskWrapper {
  data: Task[];
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000/api";

async function authenticatedRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const cookie = await cookies();
  const token = cookie.get("auth-token")?.value;

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  if (response.status === 401) {
    // Token expired or invalid
    cookie.delete("auth-token");
    cookie.delete("user");
    throw new Error("Authentication required");
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

export const apiClient = {
  // Authenticated endpoints
  getTasks: () => authenticatedRequest<TaskWrapper>("/tasks"),
  getTask: (id: string) => authenticatedRequest<Task>(`/tasks/${id}`),
  createTask: (task: Omit<Task, "id" | "created_at" | "updated_at" | "user_id">) =>
    authenticatedRequest<Task>("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    }),
  updateTask: (id: string, updates: Partial<Task>) =>
    authenticatedRequest<Task>(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    }),
  deleteTask: (id: string) =>
    authenticatedRequest<void>(`/tasks/${id}`, {
      method: "DELETE",
    }),
};
