"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiClient } from "@/lib/api-client";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const priority = (formData.get("priority") as string) || "medium";

  if (!title || title.trim().length === 0) {
    throw new Error("Title is invalid");
  }

  if (!["low", "medium", "high"].includes(priority)) {
    throw new Error("Invalid priority level");
  }

  try {
    const new_task = await apiClient.createTask({
      title: title.trim(),
      description,
      priority,
      completed: false,
    });

    //console.log("New task", new_task);
    revalidatePath("/tasks"); //refesh the task list, remove the tasks stored in cache
  } catch (error) {
    console.error("Failed to create task:", error);
    throw new Error("Failed to create task. Please try again.");
  }
  redirect('/tasks');
 
}
