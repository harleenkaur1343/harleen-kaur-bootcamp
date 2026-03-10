import express from "express";
import { ProjectRepository } from "../respositories/projectrepo.js";
import { TaskRepository } from "../respositories/taskrepo.js";
import { createProjectService } from "../services/projectService.js";

const router = express.Router();

export function createTaskRoutes(taskRepo) {
  router.get("/tasks/user/:id", async (req, res) => {
    const tasks = await taskRepo.findByUser(req.params.id);
    res.json(tasks);
  });
  return router;
}
router.post("/projects", async (req, res) => {
  const projectRepo = new ProjectRepository();
  const taskRepo = new TaskRepository();

  const projectService = createProjectService(projectRepo, taskRepo);
  const { name, tasks, userId } = req.body;
  
  const project = await projectService.createProjectWithTasks(
    name,
    tasks,
    userId,
  );

  console.log(project);
  res.json(project);
});
