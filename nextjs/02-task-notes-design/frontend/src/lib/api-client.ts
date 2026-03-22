import { cookies } from "next/headers";
import type { Task, TaskFilters } from "@/types/task";

export interface TaskWrapper {
  data: Task[];
}

interface ApiError {
  status: number;
  message: string;
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
    const errorText = await response.text();
    throw {
      status: response.status,
      message: errorText || `API Error: ${response.statusText}`,
    } as ApiError;
  }

  return response.json();
}
function addIfDefined(
  params: URLSearchParams,
  key: string,
  value: string | undefined,
) {
  if (value) params.append(key, value);
}

export const apiClient = {
  // Authenticated endpoints
  getTasks: (data: TaskFilters) => {
    const params = new URLSearchParams({
      page: (data.page ?? 1).toString(),
      limit: (data.limit ?? 10).toString(),
    });

    addIfDefined(params, "search", data.search);
    addIfDefined(params, "priority", data.priority);
    addIfDefined(params, "completed", data.completed?.toString());

    return authenticatedRequest<TaskWrapper>(`/tasks?${params}`);
  },
  getTask: (id: string) => authenticatedRequest<Task>(`/tasks/${id}`),
  createTask: (
    task: Omit<Task, "id" | "created_at" | "updated_at" | "user_id">,
  ) =>
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
