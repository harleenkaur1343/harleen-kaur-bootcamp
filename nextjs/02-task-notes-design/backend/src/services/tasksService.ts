import { db } from "../db/index.js";
import { tasks } from "../db/schema.js";
import { and, ilike, desc, eq } from "drizzle-orm";
import { Task, TaskFilters, Priority } from "../types/tasks.js";
import { sql } from 'drizzle-orm';

export async function getTasks({
  curruser,
  page,
  limit,
  completed,
  sort,
  search,
  priority,
}: TaskFilters) {
  //array of conditions
  const conditions = [eq(tasks.user_id, curruser._id)];

  if (completed !== undefined) {
    conditions.push(eq(tasks.completed, completed));
  }

  if (search) {
    conditions.push(ilike(tasks.title, `%${search}%`));
  }

  if (priority && typeof priority === "string") {
    conditions.push(eq(tasks.priority, priority as Priority));
  }

  let query = db
    .select()
    .from(tasks)
    .where(and(...conditions))
    .orderBy(desc(tasks.created_at));

  //diff func for admin
  if (curruser.role === "admin") {
    return db.select().from(tasks);
  }

  const data = await query;

  //count
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(tasks)
    .where(and(...conditions));

  const total = totalResult[0].count;

  return {
    data,
    meta: {
      total,
    },
  };
}

//create task
export async function createTask(task: Task) {
  await db.insert(tasks).values(task);

  return task;
}

//get task by its id
export async function getTaskById(id: string) {
  const result = await db.select().from(tasks).where(eq(tasks.id, id));

  return result[0];
}

//update a task
export async function updateTask(id: string, data: Partial<Task>) {
  await db.update(tasks).set(data).where(eq(tasks.id, id));

  const updated = await getTaskById(id);

  return updated;
}

//delete a task
export async function deleteTask(id: string) {
  await db.delete(tasks).where(eq(tasks.id, id));
}
