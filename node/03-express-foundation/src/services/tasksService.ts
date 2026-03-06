import  db  from "../db/index.js";
import { tasks } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { Task } from "../types/tasks.ts"

export async function getTasks(user: any) {
  if (user.role === "admin") {
    return db.select().from(tasks);
  }

  return db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, user._id));
}

export async function createTask(task: Task) {
  await db.insert(tasks).values(task)

  return task;
}

export async function getTaskById(id: string) {
  const result = await db
    .select()
    .from(tasks)
    .where(eq(tasks.id, id))

  return result[0]
}

export async function updateTask(id: string, data: Partial<Task>) {
  await db
    .update(tasks)
    .set(data)
    .where(eq(tasks.id, id))

  const updated = await getTaskById(id)

  return updated
}

export async function deleteTask(id: string) {
  await db
    .delete(tasks)
    .where(eq(tasks.id, id))
}

