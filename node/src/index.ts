import express from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import http from "http";
import path from "path";
import userRouter from "./routes/userRoutes.js";
import { fileURLToPath } from "url";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "../src/middleware/errorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import swaggerUi from "swagger-ui-express";
import { openapiSpec } from "./docs/openapi.js";
import {metrics, getAverage, metricsMeasure} from "./middleware/metrics.js"
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//PINO LOGGER
// app.use(requestLogger);
app.use(metricsMeasure);
app.use("/api/users", userRouter);
app.use("/tasks", taskRoutes);

// const onlyForSpecial = (req: Request, res: Response, next: NextFunction) => {
//   console.log("Special middleware triggered");
//   next();
// };
app.use(express.static(path.join(__dirname, "../public")));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
console.log(path.join(__dirname, "../public"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello express");
});

app.get("/bad", (req: Request, res: Response) => {
  res.status(400).json({ error: "Bad request example" });
});

app.get("/metrics", (req, res) => {
  const avgTimes : any = {};

  for (const endpoint in metrics.responseTimes) {
    avgTimes[endpoint] = getAverage(
      metrics.responseTimes[endpoint]
    );
  }

  res.json({
    requests: metrics.requests,
    success: metrics.success,
    errors: metrics.errors,
    averageResponseTimes: avgTimes,
  });
});

// app.use(errorHandler);

const server: http.Server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down server");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
