// import { Task } from "@/types/task";
// import { notFound } from "next/navigation";
// import { apiClient } from "@/lib/api-client";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const res = await params;
//   const task = await apiClient.getTask(res.id);
//   if (!task) {
//     return {
//       title: "Task Not Found",
//     };
//   }

//   return {
//     title: `${task.title} | Task Notes`,
//     description: task.description,
//     openGraph: {
//       title: task.title,
//       description: task.description,
//       type: "article",
//     },
//   };
// }

// export default async function TaskDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   let task: Task | undefined;

//   try {
//     const res = await params;
//     task = await apiClient.getTask(res.id);
//   } catch {
//     notFound();
//   }

//   return (
//     <div className="bg-white shadow p-6 rounded-lg">
//       <h2 className="text-2xl font-bold">{task.title}</h2>

//       <p className="mt-3 text-gray-600">
//         {task.description || "No description provided"}
//       </p>

//       <div className="mt-4">
//         <span
//           className={`px-3 py-1 rounded text-sm ${
//             task.completed
//               ? "bg-green-100 text-green-700"
//               : "bg-yellow-100 text-yellow-700"
//           }`}
//         >
//           {task.completed ? "Completed" : "Pending"}
//         </span>
//       </div>

//       <p className="mt-4 text-sm text-gray-500">
//         Created: {new Date(task.created_at).toLocaleString()}
//       </p>
//     </div>
//   );
// }

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
