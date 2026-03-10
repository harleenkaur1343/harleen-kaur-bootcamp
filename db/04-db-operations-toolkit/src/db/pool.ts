import { Pool } from "pg";
import { dbConfig } from "./config";

export const pool = new Pool({
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  max: dbConfig.pool.max,
  idleTimeoutMillis: dbConfig.pool.idleTimeoutMillis,
});

pool.on("connect", () => {
  console.log("New database connection established");
});

pool.on("error", (err) => {
  console.error("Unexpected database error", err);
});