import { notFound } from "next/navigation";
import { projects } from "@/data";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === Number(id));

  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-2xl shadow max-w-xl">
        <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
        <p className="text-gray-600">Status: {project.status}</p>
      </div>
    </main>
  );
}
