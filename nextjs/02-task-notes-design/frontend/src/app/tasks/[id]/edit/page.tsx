import AnimatedEditForm from "./client-form";
import { apiClient } from "@/lib/api-client";
import { notFound } from "next/navigation";


export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const id = param.id;

  let task;

  try {
    task = await apiClient.getTask(id);
  } catch (error) {
    console.log("Edit form error", error);
    notFound();
  }

  return <AnimatedEditForm task={task} id={id} />;
}
