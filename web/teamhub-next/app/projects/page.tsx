import Link from "next/link";
import { projects } from "../../data";
import ProjectSearch from "../../components/ProjectSearch";

export default function ProjectsPage() {
  console.log("Project main page rendered on server");
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <ProjectSearch projects={projects} />
    </main>
  );
}
