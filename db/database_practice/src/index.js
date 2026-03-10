import express from "express";
import { createTaskRoutes } from "./routes/taskRoutes.js";
import { TaskRepository } from "./respositories/taskrepo.js";

const app = express();
app.use(express.json());
const taskRepo = new TaskRepository();

app.use("/api", createTaskRoutes(taskRepo));

app.listen(3000, () => {
  console.log("Server running");
});