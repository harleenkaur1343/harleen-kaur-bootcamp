"use server";

import { revalidatePath } from "next/cache";
import { apiClient } from "@/lib/api-client";
import { redirect } from "next/navigation";

export async function updateTask(id:string, formData:FormData){
    const title = formData.get('title') as string;
    const description = (formData.get('description') as string) || "";
    const priority = (formData.get('priority') as string) || 'medium';

    if(!title || title.trim().length === 0 ){
      throw new Error('Title is invalid')
    }

    if (!['low', 'medium', 'high'].includes(priority)) {
    throw new Error('Invalid priority level');
  }

  try{
    const upd_task = await apiClient.updateTask(id,{
      title:title.trim(),
      description,
      priority,
    });
    console.log("Updated task",upd_task)
    //console.log("New task", new_task);
    revalidatePath('/tasks') //refesh the task list, remove the tasks stored in cache
    
  }catch(error){
      console.error('Failed to update task:', error);
      throw new Error('Failed to update task. Please try again.');
    }
  redirect('/tasks');
}