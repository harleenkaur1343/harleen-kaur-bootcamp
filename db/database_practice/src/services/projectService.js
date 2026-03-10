import { withTransaction } from "../db/transaction.js";

export function createProjectService(projectRepo, taskRepo) {

  return {

    async createProjectWithTasks(name, tasks, userId) {

      return withTransaction(async (client) => {

        const project = await projectRepo.create(name, client);

        for (const task of tasks) {

          await taskRepo.create(
            task,
            userId,
            project.id,
            client
          );

        }

        return project;

      });

    }

  };
}