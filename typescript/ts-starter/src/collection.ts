import { Priority, Task, TaskStatus } from "./types"

export interface TaskCollection{
  tasks:Task[],
  metadata:{
    total:number,
    complete:number,
    lastModified:Date
  }
}

export interface TaskStats{
  byPriority:Record<Priority,number>,
  //confirm 
  byStatus:Record<TaskStatus,number>
  averageAge:number;
}