//for task search 

import { Priority, Task } from "./types";

export type TaskQuery = {
  //by status 
  completed?:boolean;
  //filter by priority 
  priority:Priority | Priority[];
  //find by name
  titleContains? : string;
  //by date or range
  createdAfter?:Date;
  createdBefore?:Date;

}

//sort 
export type SortKey = keyof Pick<Task , 'title' | 'priority' | 'createdAt'>;
export type SortDirection = 'asc' | 'desc';

export interface QueryResult <T> {
  data:T[],
  total:number;
  page?:number;
  hasMore?:boolean;
}