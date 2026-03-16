import { Task } from "../types/task";

const BASE_URL = "http://localhost:9000/api";

export async function getTaskById(id:string) : Promise<Task>{
  const res = await fetch(`${BASE_URL}/tasks/${id}`,{
    cache:"no-store" //get them from server
  })
   if (!res.ok) {
    throw new Error("Failed to fetch task")
  }

  return res.json();
}
