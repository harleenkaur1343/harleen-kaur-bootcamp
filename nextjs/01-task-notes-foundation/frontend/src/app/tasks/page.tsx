import Link from "next/link"
import { tasks } from "@/lib/dummyTasks"

export const metadata = {
  title: "Tasks | Task Notes",
  description: "View and manage your tasks",
}


export default function TasksPage() {
  return (
    
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {tasks.map((task) => (
        <Link key={task.id} href={`/tasks/${task.id}`} className="border p-4 rounded hover:bg-gray-50"
        >
          <h2 className="text-lg font-semibold">{task.title}</h2>

          <p className="text-gray-600 text-sm">
            {task.description} 
          </p>

          <span className="text-xs mt-2 inline-block">
            {task.completed ? "Completed" : "Pending"}
          </span>
        </Link>
      ))}
    </div>
  )
}