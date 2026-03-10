let taskCounter = 1;

export function createTask(projectId: number) {
  return {
    title: `Task ${taskCounter++}`,
    project_id: projectId,
    completed: false,
  };
}