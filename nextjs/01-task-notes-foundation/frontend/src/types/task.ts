export interface Task{
  id:string;
  title:string;
  description?: string
  completed: boolean
  created_at: string
  user_id: number
}