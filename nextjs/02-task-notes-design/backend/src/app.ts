import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import healthRouter from "./routes/health.js";
import tasksRoutes from "./routes/tasksRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { metrics } from "./metrics/metrics.js"
import { requestId } from "./middleware/requestIds.js"
import { withRetry } from "./http/retry.js";
import { fetchJson } from "./http/fetchJson.js";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cookieParser('dev-secret'));
//for HTTP headers
//app.use(helmet());
//middleware
const crossurl = process.env.FRONTEND_URL;
app.use(cors({
  origin: crossurl, 
  credentials: true,               // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // 100 requests per IP
//   standardHeaders: true,
//   legacyHeaders: false,
// })
//app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Request logger 
app.use(requestId);
app.use(requestLogger);

// Static files
app.use(express.static(path.join(__dirname, "..", "public")));

//routes
app.use("/api/health", healthRouter);
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);
app.get("/metrics", (req, res) => {
  res.type("text/plain").send(metrics())
})

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found", message: "Route does not exist" });
});

//global error handler 
app.use(errorHandler);

export default app;
