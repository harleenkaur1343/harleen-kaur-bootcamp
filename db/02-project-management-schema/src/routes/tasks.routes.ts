import { Router } from "express";
import { TasksRepository } from "../repositories/tasks.repository.js";
import { TaskTagsRepository } from "../repositories/taskTags.repository.js";
import { CommentsRepository } from "../repositories/comments.repository.js";

const router = Router();

const tasksRepo = new TasksRepository();
const taskTagsRepo = new TaskTagsRepository();
const commentsRepo = new CommentsRepository();

router.post("/", async (req, res) => {
  const { projectId, title } = req.body;

  const task = await tasksRepo.create(projectId, title);

  res.json(task);
});

router.get("/project/:projectId", async (req, res) => {
  const tasks = await tasksRepo.findByProject(req.params.projectId);

  res.json(tasks);
});

router.post("/:taskId/tags", async (req, res) => {
  const { tagId } = req.body;

  const result = await taskTagsRepo.addTag(
    req.params.taskId,
    tagId
  );

  res.json(result);
});

router.get("/:taskId/tags", async (req, res) => {
  const tags = await taskTagsRepo.getTagsForTask(
    req.params.taskId
  );

  res.json(tags);
});

router.post("/:taskId/comments", async (req, res) => {
  const { userId, content, parentId } = req.body;

  const comment = await commentsRepo.create(
    req.params.taskId,
    userId,
    content,
    parentId
  );

  res.json(comment);
});

router.get("/:taskId/comments", async (req, res) => {
  const comments = await commentsRepo.findByTask(
    req.params.taskId
  );

  res.json(comments);
});