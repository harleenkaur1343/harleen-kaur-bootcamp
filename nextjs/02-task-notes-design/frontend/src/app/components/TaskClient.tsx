"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "../components/TaskCard";
import Link from "next/link";
import type { Task } from "@/types/task";
import { Input } from "@/components/ui/input";

export default function TaskClient({ alltasks }: { alltasks: Task[] }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(alltasks);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedSearch(search);
  //   }, 600);

  //   return () => clearTimeout(timer);
  // }, [search]);

  // useEffect(() => {
  //   async function searchTask() {
  //     try {
  //       setLoading(true);

  //       const { fetchFilterTasks } = await import("@/lib/fetchTasks");
  //       const res = await fetchFilterTasks(debouncedSearch);
  //       console.log("Searched tasks", res);
  //       setTasks(res.data!);
  //     } catch (err) {
  //       console.error("Search failed", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   searchTask();
  // }, [debouncedSearch]);

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <Input
          value={search}
          placeholder="Search tasks..."
          style={{ width: "50vw" }}
          className="h-9 bg-white/80"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link href="/tasks/new">
          <Button className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            + Add New Task
          </Button>
        </Link>
      </div>

      {/* Tasks Grid */}
      {tasks.length === 0 ? (
        <div className="text-center py-20">
          <div className="mb-6">
            <p className="text-xl text-gray-500 mb-4">No tasks yet!</p>
            <Link
              href="/tasks/new"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Create your first task
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <Link key={task.id} href={`/tasks/${task.id}`} className="block">
              <TaskCard task={task} index={index} />
            </Link>
          ))}
        </div>
      )}

      {/* Error State (if API failed but still want to show page) */}
      {tasks.length === 0 && (
        <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 mb-4">
            Failed to load tasks. Some features may not work.
          </p>
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in again
          </Link>
        </div>
      )}
    </div>
  );
}
