// export type Task = {
//   id: string
//   title: string
//   description?: string
//   completed: boolean
//   created_at: Date,
//   user_id: number | null | undefined
// }


import { InferSelectModel } from 'drizzle-orm';
import { tasks } from 'src/db/schema.js';

export type Task = InferSelectModel<typeof tasks>;

// export const tasks : Task[] = [
 
// ]