import { createDb } from "../db/client.js";
import { users } from "../db/schema.js";
import { loadConfig } from "../config.js";
import { createLogger } from "../logger.js";

export async function usersAdd(options: { name: string; email: string }) {
  const config = loadConfig();
  const logger = createLogger(config.logLevel);
  const db = createDb(config.dbPath);

  try {
    db.insert(users).values({ name: options.name, email: options.email }).run();
    logger.info({ name: options.name, email: options.email }, "User added successfully");
    console.log(`Added user: ${options.name} (${options.email})`);
  } catch (err: any) {
    if (err?.code === "SQLITE_CONSTRAINT_UNIQUE") {
      console.error(`Error: email ${options.email} already exists`);
      process.exit(1);
    }
    throw err;
  }
}