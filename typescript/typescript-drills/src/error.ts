export class TaskError extends Error {
  constructor(
    message: string,
    public code: TaskErrorCode,
    public context?: object
  );
}