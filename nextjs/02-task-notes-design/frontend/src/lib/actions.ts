"use server";

import { notFound } from "next/navigation";
import { apiClient } from "./api-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function toggleTaskCompletion(id: string, completed: boolean) {
  try {
      
    // const completeStatus = !task.completed;
    // await apiClient.updateTask(id, { completed: completeStatus });
    const task = await apiClient.updateTask(id, { completed })
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
    const response = await apiClient.deleteTask(id);
    console.log(response);
    revalidatePath("/tasks")
  } catch (error) {
    console.error("Delete error", error)
    throw new Error("Failed to delete task.")
  }
}

