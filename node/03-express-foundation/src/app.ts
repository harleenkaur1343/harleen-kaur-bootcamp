import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import healthRouter from "./routes/health.js";
import infoRouter from "./routes/info.js";
import echoRouter from "./routes/echo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Request logger 
app.use(requestLogger);

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));

//routes
app.use("/health", healthRouter);
app.use("/api/info", infoRouter);
app.use("/api/echo", echoRouter);

//404
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found", message: "Route does not exist" });
});

//global error handler 
app.use(errorHandler);

export default app;
