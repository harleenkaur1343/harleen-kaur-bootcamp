import express from "express"
import {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask
} from "../controllers/tasksController.js"
import { authMiddleware} from "../middleware/authMiddleware.js"
import {requireRole} from "../middleware/roleMiddleware.js";

const router = express.Router()

router.use(authMiddleware);

router.post("/", createTask)
router.get("/", listTasks)
router.get("/:id", getTask)
router.put("/:id", updateTask)
router.delete("/:id", requireRole("admin"), deleteTask)

export default router;