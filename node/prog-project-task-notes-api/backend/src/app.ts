import express, { Express, Request, Response, NextFunction } from "express";
import { createServer, Server } from "http";
import { AppConfig } from "./config/config";
import { logger } from "./config/logger";
import taskRoutes from "./routes/tasksRoutes";

export class TaskServer {
  private app: Express;
  private server?: Server;
  private readonly config: AppConfig;

  constructor(config: AppConfig) {
    this.config = config;
    this.app = this.setupApp();
  }

  private setupApp(): Express {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.json({ message: "Hello from Express n TypeScript!" });
    });

    app.get("/health", (req, res) => {
      res.json({ status: "OK" });
    });

    //taskroutes

    app.use("/api/tasks",taskRoutes);

    app.use("/*splat", (req: Request, res: Response) => {
      res.status(404).json({ error: "Route not found" });
    });

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      logger.error({ error: error.message }, "The error");
    });

    return app;
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      const port = this.config.port;
      const host = this.config.host;

      this.server = createServer(this.app);

      this.server.listen(port, host, () => {
        console.log(`TaskServer running on http://${host}:${port}`);
        resolve();
      });
      this.server.on("error", reject);
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        return resolve();
      }

      this.server.close((err) => {
        if (err) {
          console.error('Server close error:', err);
          return reject(err);
        }
        console.log('TaskServer stopped');
        resolve();
      });

      // Force kill backup
      setTimeout(() => {
        console.error('Force shutdown');
        reject(new Error('Server timeout'));
      }, 10000).unref();
    });
  }
}
