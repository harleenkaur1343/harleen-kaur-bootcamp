export type Task = {
  id: string
  title: string
  description?: string
  completed: boolean
  created_at: Date,
  user_id: number | null | undefined
}


export const tasks : Task[] = [
 
]