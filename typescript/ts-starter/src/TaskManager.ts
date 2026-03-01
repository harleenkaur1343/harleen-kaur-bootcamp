import { TaskCollection } from "./collection";
import { Task } from "./types";

export class TaskManager {
  private tasks: Map<string, Task>;
  private listeners: Set<TaskEventListener>;

  constructor(initalTasks?: Task[]) {}

  add(task: Omit<Task, "id" | "createdAt">): Task;
  update(id: string, updates: Partial<Task>): Task;
  delete(id: string): boolean;

  getStats(): TaskStats {
    console.log();
  }
  export(): TaskCollection{
    console.log();
  }
}
