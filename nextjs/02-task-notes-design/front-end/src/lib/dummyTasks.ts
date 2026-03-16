import { Task } from "@/types/task"

export const tasks: Task[] = [
  {
    id: "1",
    title: "Design homepage",
    description: "Create layout for landing page",
    completed: false,
    priority: "high",
    created_at: "2026-03-10T12:00:00Z",
    updatedAt: "2026-03-10T12:00:00Z",
    user_id: 1
  },
  {
    id: "2",
    title: "Fix API bug",
    description: "Resolve authentication middleware issue",
    completed: true,
    priority: "medium",
    created_at: "2026-03-09T08:30:00Z",
    updatedAt: "2026-03-10T09:00:00Z",
    user_id: 1
  },
  {
    id: "3",
    title: "Write documentation",
    description: "Add README for frontend project",
    completed: false,
    priority: "low",
    created_at: "2026-03-08T15:00:00Z",
    updatedAt: "2026-03-08T15:00:00Z",
    user_id: 1
  }
]

export function getTaskById(id:string){
  return tasks.find((task)=>task.id ===id);
}