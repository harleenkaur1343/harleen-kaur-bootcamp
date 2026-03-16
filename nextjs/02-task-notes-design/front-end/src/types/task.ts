export type Task = {
  id:string;
  title:string;
  description?: string | null
  completed: boolean
  priority: 'low' | 'medium' | 'high',
  created_at: string
  updatedAt: string
  user_id: number
}

export type Priority = Task['priority'];