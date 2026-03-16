import { Request, Response, NextFunction } from "express"
import { createTaskSchema, updateTaskSchema } from "../schemas/taskSchemas.js"
import { Task } from "../types/tasks.js"
import crypto from "crypto";
import * as dbOps from "../services/tasksService.js"

export async function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const data : any = createTaskSchema.parse(req.body)
   // console.log("task data", data, req.user._id)
    const task: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      completed: data.completed ?? false,
      priority: data.priority?? 'medium',
      created_at: new Date(),
      updated_at: new Date(),
      user_id: req.user!._id,
    }

  const created = await dbOps.createTask(task)

    res.status(201).json(created)
  } catch (err) {
    next(err)
  }
}

export async function listTasks(req: Request, res: Response, next : NextFunction) {
  //let result = [...tasks]
  try{
let result = await dbOps.getTasks(req.user);
//console.log("DB USER TASKS", result);
const { page = "1", limit = "10", completed, sort } = req.query

  if (completed !== undefined) {
    result = result.filter(
      (t) => t.completed === (completed === "true")
    )
  }

  if (sort === "created_at") {
    result.sort((a, b) => a.created_at.toISOString().localeCompare(b.created_at.toISOString()));
  }

  const p = Number(page)
  const l = Number(limit)

  const start = (p - 1) * l
  const end = start + l

  const paginated = result.slice(start, end)

  res.json({
    data: result,
    meta: {
      page: p,
      limit: l,
      total: result.length
    }
  })
  }catch(err){
    next(err);
  }
 
}

export async function getTask(req: Request, res: Response, next: NextFunction) {

  const task = await dbOps.getTaskById(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id)
  
  if (!task) {
    return next({
      status: 404,
      title: "Not Found",
      message: "Task not found"
    })
  }

  res.json(task);
}

export async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const data = updateTaskSchema.parse(req.body)

 const task = await dbOps.updateTask(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, data)
    if (!task) {
      return next({
        status: 404,
        title: "Not Found",
        message: "Task not found"
      })
    }

    Object.assign(task, data)

    res.json(task)
  } catch (err) {
    next(err)
  }
}

export async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {

    await dbOps.deleteTask(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id)

    res.status(200).json({success : true});

  } catch (err) {
    next(err)
  }
}