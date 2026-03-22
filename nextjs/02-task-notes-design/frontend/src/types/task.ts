export type Task = {
  id:string;
  title:string;
  description?: string | null
  completed: boolean
  priority: 'low' | 'medium' | 'high' ,
  created_at: string
  updated_at: string
  user_id: number
}
export type Priority = Task['priority'];

export interface TaskFilters {
  page?: number;
  limit?: number;
  completed?: boolean | undefined;
  sort?: boolean | undefined;
  search?: string | undefined;
  priority?: Priority | undefined;
}



