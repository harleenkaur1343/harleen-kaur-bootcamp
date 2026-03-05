// src/data/tasks.ts

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId?: string;
  createdAt: string;

}

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Learn REST",
    description: "Understand REST resource design",
    completed: false,
    userId: "u1",
    createdAt : new Date().toISOString(),
    
  },
  {
    id: "t2",
    title: "Build API",
    completed: true,
    userId: "u2",
   createdAt : new Date().toISOString(),
    
  }
];