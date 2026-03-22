import { TaskServer } from './app';
import { loadConfig } from './config/config';

async function main() {
  const config = loadConfig();
  const server = new TaskServer(config);

  // Graceful shutdown handlers
  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);

  async function gracefulShutdown() {
    console.log('Shutting down gracefully...');
    await server.stop();
    process.exit(0);
  }

  // Start server
  await server.start();
}

main().catch(console.error);