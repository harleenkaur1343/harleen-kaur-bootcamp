import { apiClient } from "@/lib/api-client";

export async function fetchFilterTasks(debouncedSearch:string) {
  try {
    const res = await apiClient.getTasks({
      search: debouncedSearch || undefined,
      priority: undefined,
    });

    return res;
  } catch (error) {
    console.error("Search failed", error);
    throw new Error("Failed to fetch filtered tasks")
  }
}

export async function getAllTasks() {
   try {
    const res = await apiClient.getTasks({});
    return res;
  } catch (error) {
    console.error("Search failed", error);
    throw new Error("Failed to fetch tasks")
  }
}