import { Request, Response, NextFunction } from "express";
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchemas.js";
import { Task } from "../types/task.js";
import crypto from "crypto";
//import { tasks } from "../types/task.js";
import * as dbOps from "../services/tasksService.js";
import { Priority } from "../types/task.js";
export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = createTaskSchema.parse(req.body);

    const task: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      completed: data.completed ?? false,
      priority: data.priority ?? "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: Number(req.user!._id),
    };

    const created = await dbOps.createTask(task);

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function listTasks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //let result = [...tasks]
  try {
    let result = await dbOps.getTasks(req.user);
    const { page = "1", limit = "10", completed, sort } = req.query;

    if (completed !== undefined) {
      result = result.filter((t) => t.completed === (completed === "true"));
    }

    if (sort === "createdAt") {
      result.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    }

    const p = Number(page);
    const l = Number(limit);

    const start = (p - 1) * l;
    const end = start + l;

    const paginated = result.slice(start, end);

    res.json({
      data: result,
      meta: {
        page: p,
        limit: l,
        total: result.length,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  const task = await dbOps.getTaskById(req.params.id as string);

  if (!task) {
    return next({
      status: 404,
      title: "Not Found",
      message: "Task not found",
    });
  }

  res.json(task);
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = updateTaskSchema.parse(req.body);

    const task = await dbOps.updateTask(req.params.id as string, data);
    if (!task) {
      return next({
        status: 404,
        title: "Not Found",
        message: "Task not found",
      });
    }

    Object.assign(task, data);

    res.json(task);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    await dbOps.deleteTask(req.params.id as string);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
