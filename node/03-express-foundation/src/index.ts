import "dotenv/config";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 3001;
const HOST = process.env.HOST || "localhost";

const server = app.listen(PORT, HOST, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});

// Graceful shutdown on SIGINT (Ctrl+C)
process.on("SIGINT", () => {
  console.log("SIGINT received — shutting down gracefully...");

  server.close((err) => {
    if (err) {
      console.error("Error during shutdown:", err);
      process.exit(1);
    }
    console.log("Server closed. Goodbye!");
    process.exit(0);
  });

  // Force-kill if graceful shutdown takes too long
  setTimeout(() => {
    console.error("Shutdown timed out — forcing exit.");
    process.exit(1);
  }, 10_000).unref();
});
