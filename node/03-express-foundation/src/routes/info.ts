import { Router, Request, Response } from "express";

const router = Router();
const startedAt = new Date();

router.get("/", (_req: Request, res: Response) => {
  const uptimeSeconds = process.uptime();

  res.status(200).json({
    name: "noteserver",
    version: process.env.npm_package_version ?? "1.0.0",
    node: process.version,
    environment: process.env.NODE_ENV ?? "development",
    uptime: {
      seconds: Math.floor(uptimeSeconds),
      human: formatUptime(uptimeSeconds),
    },
    startedAt: startedAt.toISOString(),
    timestamp: new Date().toISOString(),
    memory: {
      rss: formatBytes(process.memoryUsage().rss),
      heapUsed: formatBytes(process.memoryUsage().heapUsed),
      heapTotal: formatBytes(process.memoryUsage().heapTotal),
    },
  });
});

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

function formatBytes(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default router;
