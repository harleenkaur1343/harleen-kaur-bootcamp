// src/app/tasks/[id]/page.tsx
import { notFound } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { Task } from "@/types/task";
import TaskDetailClient from "./TaskDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const res = await params;
  const task = await apiClient.getTask(res.id);
  if (!task) return { title: "Task Not Found" };

  return {
    title: `${task.title} | Task Notes`,
    description: task.description,
    openGraph: {
      title: task.title,
      description: task.description,
      type: "article",
    },
  };
}

// server component — fetches data
export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let task: Task | undefined;

  try {
    const res = await params;
    task = await apiClient.getTask(res.id);
  } catch {
    notFound();
  }

  if (!task) notFound();

  // pass data to client component for interactions
  return <TaskDetailClient task={task} />;
}
