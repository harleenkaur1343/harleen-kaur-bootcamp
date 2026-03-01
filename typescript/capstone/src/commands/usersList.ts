import { createDb } from "../db/client.js";
import { users } from "../db/schema.js";
import { loadConfig } from "../config.js";
import { createLogger } from "../logger.js";

export async function usersList() {
  const config = loadConfig();
  const logger = createLogger(config.logLevel);
  const db = createDb(config.dbPath);

  const allUsers = db.select().from(users).all();

  if (allUsers.length === 0) {
    logger.info("No users found");
    return;
  }

  console.table(allUsers);
}