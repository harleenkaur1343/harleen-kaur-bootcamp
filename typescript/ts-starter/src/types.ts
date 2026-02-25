export interface Task {
  id: string,
  title:string,
  completed:boolean,
  priority:'low' | 'medium' | 'high',
  createdAt: Date
}

//predefined values
export type TaskStatus = 'pending' | 'in-progress' | 'completed'
export type Priority = Task['priority'];