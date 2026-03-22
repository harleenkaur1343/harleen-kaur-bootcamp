// export type Task = {
//   id: string
//   title: string
//   description?: string
//   completed: boolean
//   created_at: Date,
//   user_id: number | null | undefined
// }

import { InferSelectModel } from "drizzle-orm";
import { tasks } from "src/db/schema.js";

export type Task = InferSelectModel<typeof tasks>;

interface User {
  _id: number;
  role: string;
}
export interface TaskFilters {
  curruser: User;
  page: number;
  limit: number;
  completed?: boolean | undefined;
  sort?: boolean | undefined;
  search?: string | undefined;
  priority?: string | undefined;
}

export type Priority = Task["priority"];
