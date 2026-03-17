"use server";

import { notFound } from "next/navigation";
import { apiClient } from "./api-client";
import { revalidatePath } from "next/cache";

export async function toggleTaskCompletion(id: string, completed: boolean) {
  try {
    // const completeStatus = !task.completed;
    // await apiClient.updateTask(id, { completed: completeStatus });
    const task = await apiClient.updateTask(id, { completed });
    if (!task) {
      notFound();
    }
    revalidatePath(`/tasks/${id}`);
    revalidatePath(`/tasks`);
  } catch (error) {
    console.log("Toggle error", error);
    throw new Error(
      "There was some error updating the status. Please try again!",
    );
  }
}

export async function deleteTask(id: string) {
  try {
    await apiClient.deleteTask(id);
    
    revalidatePath("/tasks");
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "status" in (error as Record<string, unknown>) &&
      (error as Record<string, unknown>).status === 403
    ) {
      return { success: false, error: "Only admins can delete tasks" };
    }

    return {
      success: false,
      error: "Failed to delete tasks",
    };
  }
}
