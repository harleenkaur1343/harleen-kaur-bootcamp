// src/routes/taskRoutes.ts
import { Router } from "express";
import { Request, Response } from "express";
import { tasks, Task } from "../data/tasks.js";
import { randomUUID } from "crypto";
import { validate } from "../middleware/validate.js";
import { createTaskSchema, taskQuerySchema } from "../schema/taskSchema.js";
import { AppError } from "src/errors/AppError.js";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  const { userId, completed, page, limit, sort, order } = req.query as any;

  let result: Task[] = [...tasks];

  if (userId) {
    result = result.filter((t) => t.userId === userId);
  }

  if (completed) {
    const isCompleted = completed === "true";
    result = result.filter((t) => t.completed === isCompleted);
  }

  result.sort((a, b) => {
    const aValue = a[sort];
    const bValue = b[sort];

    if (aValue < bValue) return order === "asc" ? -1 : 1;
    if (aValue > bValue) return order === "asc" ? 1 : -1;
    return 0;
  });

  const total = result.length;
  //2 page skip 10 items bydefault
  const start = (page - 1) * limit;
  //next limimt number of items from start
  const paginated = result.slice(start, start + limit);

  res.status(200).json({
    data: paginated,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    // return res.status(404).json({
    //   error: {
    //     code: "TASK_NOT_FOUND",
    //     message: "Task not found",
    //   },
    // });
    throw new AppError(404, "Task not found");
  }

  res.status(200).json({ data: task });
});

router.post(
  "/",
  validate(createTaskSchema, "body"),
  (req: Request, res: Response) => {
    const { title, description, userId } = req.body;

    if (!title) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "Title is required",
        },
      });
    }

    const newTask: Task = {
      id: randomUUID(),
      title,
      description,
      completed: false,
      userId,
      createdAt:new Date().toISOString(),
    };

    tasks.push(newTask);

    res.status(201).json({ data: newTask });
  },
);

router.put("/:id", (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);

  if (!task) {
    // return res.status(404).json({
    //   error: {
    //     code: "TASK_NOT_FOUND",
    //     message: "Task not found",
    //   },
    // });
    throw new AppError(404, "Task not found");
  }

  const { title, description, completed } = req.body;

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.completed = completed ?? task.completed;

  res.status(200).json({ data: task });
});

router.delete("/:id", (req: Request, res: Response) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    // return res.status(404).json({
    //   error: {
    //     code: "TASK_NOT_FOUND",
    //     message: "Task not found",
    //   },
    // });
    throw new AppError(404, "Task not found");
  }

  tasks.splice(index, 1);

  res.status(204).send();
});

// GET /users/123/tasks
// List all tasks for user 123.
// POST /users/123/tasks
// Create a new task that belongs to user 123.
// GET /users/123/tasks/456
// Get task 456 for user 123.
// PUT /users/123/tasks/456
// Replace the whole task 456 under user 123.
// PATCH /users/123/tasks/456
// Partially update that task.
// DELETE /users/123/tasks/456
// Delete that task.

export default router;
