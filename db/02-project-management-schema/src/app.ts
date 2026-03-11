import express from "express";

import usersRoutes from "./routes/users.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/projects", projectsRoutes);
app.use("/tasks", tasksRoutes);

export default app;