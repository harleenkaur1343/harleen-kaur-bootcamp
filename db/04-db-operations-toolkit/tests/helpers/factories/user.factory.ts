//factories generate realistic test data automatically 
let userCounter = 1;

export function createUser() {
  return {
    name: `User ${userCounter}`,
    email: `user${userCounter++}@test.com`,
  };
}