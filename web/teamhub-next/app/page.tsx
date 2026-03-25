import Link from "next/link";
import { projects, articles, team } from "@/data";

export default function Home(){
  return(
     <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">TeamHub</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500">Projects</p>
          <h2 className="text-2xl font-semibold">{projects.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500">Articles</p>
          <h2 className="text-2xl font-semibold">{articles.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500">Team</p>
          <h2 className="text-2xl font-semibold">{team.length}</h2>
        </div>
      </div>

      <nav className="flex gap-4">
        <Link className="text-blue-600 hover:underline" href="/projects">
          Projects
        </Link>
        <Link className="text-blue-600 hover:underline" href="/articles">
          Articles
        </Link>
        <Link className="text-blue-600 hover:underline" href="/team">
          Team
        </Link>
      </nav>
    </main>
  )
}