//TaskSyncManager 

export class TaskSynManager{
  constructor(
    private storage:Storage<TaskCollection>;
    private remote?:RemoteSync
  );

  async save(): Promise<void>; 
  //write task collection to local storage
  async load(): Promise<TaskCollection>;
  //read tasks from storage to memory 
  async sync(): Promise<SyncResult>; } 
  //get local data 
  //send to remote 
  //get latest 
  //resolve conflicts 
  //save final version locally 
  
  
  export interface RemoteSync { push(data: TaskCollection): Promise<void>; 
  pull(): Promise<TaskCollection>; 
}