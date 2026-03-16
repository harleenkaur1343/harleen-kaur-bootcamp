export const tasks = [
  {
    id: "1",
    title: "Setup Next.js project",
    description: "Initialize the project with TypeScript and Tailwind.",
    completed: true,
    created_at: "2026-03-01T10:00:00Z",
    user_id: 1,
  },
  {
    id: "2",
    title: "Build Tasks List Page",
    description: "Create UI to display tasks list.",
    completed: false,
    created_at: "2026-03-02T12:00:00Z",
    user_id: 1,
  },
  {
    id: "3",
    title: "Implement Task Detail Page",
    description: "Add dynamic routing for task pages.",
    completed: false,
    created_at: "2026-03-03T09:30:00Z",
    user_id: 1,
  },
];

export function getTaskById(id: string) {
  return tasks.find((task) => task.id === id)
}