import "dotenv/config";
import app from "./app.js";
import { closeDb } from "./db/index.js";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "localhost";

const server = app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});

// Graceful shutdown on SIGINT (Ctrl+C)
function shutdown() {
  console.log("Shutting down server...")

  server.close(() => {
    console.log("HTTP server closed")
    closeDb();
    process.exit(0)
  })

  setTimeout(() => {
    console.error("Force shutdown")
    process.exit(1)
  }, 10000).unref()
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
