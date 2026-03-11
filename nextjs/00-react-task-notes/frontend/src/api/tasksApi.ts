import { apiFetch } from "../utils/apiClient";
import type { Task, CreateTaskInput, UpdateTaskInput } from "../types/task";

export async function getTasks() : Promise<Task[]>{
  return apiFetch("/tasks/")
}

export async function getTask(id: string): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`)
}

export async function createTask(data: CreateTaskInput): Promise<Task> {
  return apiFetch<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export async function updateTask(
  id: string,
  data: UpdateTaskInput
): Promise<Task> {
  return apiFetch<Task>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  })
}

export async function deleteTask(id: string): Promise<void> {
  return apiFetch<void>(`/tasks/${id}`, {
    method: "DELETE"
  })
}