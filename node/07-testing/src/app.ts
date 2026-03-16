import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { requestLogger } from "./middleware/requestLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import healthRouter from "./routes/health.js";
import infoRouter from "./routes/info.js";
import echoRouter from "./routes/echo.js";
import tasksRoutes from "./routes/tasksRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import swaggerUi from "swagger-ui-express"
import { openapiSpec } from "./docs/openapi.js"
import { metrics } from "./metrics/metrics.js"
import { requestId } from "./middleware/requestIds.js"
import { withRetry } from "./http/retry.js";
import { fetchJson } from "./http/fetchJson.js";
import cookieParser from 'cookie-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cookieParser('dev-secret'));
//for HTTP headers
//app.use(helmet());
//middleware
app.use(cors({
  origin: 'http://localhost:3000', 
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
app.use("/health", healthRouter);
app.use("/api/info", infoRouter);
app.use("/api/echo", echoRouter);
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);
app.get("/metrics", (req, res) => {
  res.type("text/plain").send(metrics())
})
app.get('/debug-cookies', (req, res) => {
  console.log('ALL COOKIES:', req.cookies);
  console.log('RAW COOKIE HEADER:', req.headers.cookie);
  res.json({ cookies: req.cookies, header: req.headers.cookie });
});


app.get("/test-weather", async (req, res) => {
  const city = req.query.city || "London";

  const url = `${process.env.OPENWEATHER_BASE_URL}/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`;

  const data = await withRetry(() => fetchJson(url));

  res.json(data);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec))
//404
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found", message: "Route does not exist" });
});

//global error handler 
app.use(errorHandler);

export default app;
