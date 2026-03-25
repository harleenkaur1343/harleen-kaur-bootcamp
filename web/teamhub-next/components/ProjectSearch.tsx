"use client";

import Link from "next/link";

type Project = { id: number; name: string; status: string };

import { useState } from "react";

export default function ProjectSearch({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState("");
  console.log("Search", search);
  const filtered = projects.filter((p: Project) => {
    console.log(p.name);
    return p.name.toLowerCase().includes(search.toLowerCase());
  });
  console.log("rendered in browser");

  return (
    <div className="mb-6">
      <input
        className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search projects..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p className="text-sm text-gray-500 mt-2">{filtered.length} results</p>
      <div className="grid gap-4 mt-6">
        {filtered.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="block bg-white p-5 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-500">Status: {p.status}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
