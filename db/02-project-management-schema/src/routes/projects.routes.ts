import { Router } from "express";
import { ProjectsRepository } from "../repositories/projects.repository";

const router = Router();
const projectsRepo = new ProjectsRepository();

router.post("/", async (req, res) => {
  const { ownerId, name, description } = req.body;

  const project = await projectsRepo.create(ownerId, name, description);

  res.json(project);
});

router.get("/owner/:ownerId", async (req, res) => {
  const projects = await projectsRepo.findByOwner(req.params.ownerId);

  res.json(projects);
});

export default router;

