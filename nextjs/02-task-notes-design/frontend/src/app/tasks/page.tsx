import Link from "next/link";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { TaskCard } from "../components/TaskCard"
import { apiClient } from "@/lib/api-client";
import type { Task } from '@/types/task';

type Taskwrapper = {
 data : Task[]
}
export default async function TasksPage() {
  
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;
  
  if (!token) {
    redirect('/login'); // Auto-redirect if not logged in
  }

   let tasks: Task[] = [];

  try {
    const taskwrapper = await apiClient.getTasks() as Taskwrapper;
    tasks = taskwrapper.data ;

  } catch (error: unknown) {
    console.error("Failed to fetch tasks:", error);
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <Link href="/tasks/new">
          <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
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
