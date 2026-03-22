import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAllTasks } from "../../lib/fetchTasks"
import type { Task } from "@/types/task";
import TaskClient from "../components/TaskClient";

type Taskwrapper = {
  data: Task[];
};
export default async function TasksPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    redirect("/login");
  }

  let tasks: Task[] = [];

  try {
    const taskwrapper = await getAllTasks() as Taskwrapper;
    tasks = taskwrapper.data;
  } catch (error: unknown) {
    console.error("Failed to fetch tasks:");
  }

  return <TaskClient alltasks={tasks} />;
}
