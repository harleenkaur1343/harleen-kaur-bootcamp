let projectCounter = 1;

export function createProject(userId: number) {
  return {
    name: `Project ${projectCounter++}`,
    user_id: userId,
  };
}