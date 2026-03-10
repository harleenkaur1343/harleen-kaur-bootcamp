//You cannot drop the database you're connected to. So lifecycle scripts connect to the default database:
import { Client } from "pg";
import dotenv from "dotenv";
import { runMigrations } from "../../src/migrations/migrate";
import { runSeeds } from "../../src/seeds/seed";

dotenv.config();
const dbName = process.env.DB_NAME || "toolkit_db";

async function resetDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres",
  });

  await client.connect();
  console.log("Dropping database if exists...");
  //PostgreSQL prevents dropping a database with active connections. Kills the active processes
  await client.query(`SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity
    WHERE datname = '${dbName}'
    AND pid <> pg_backend_pid();`);

  await client.query(`DROP DATABASE IF EXISTS ${dbName}`);

  console.log("Creating fresh database...");

  await client.query(`CREATE DATABASE ${dbName}`);

  await client.end();
  console.log("Running migrations");
  await runMigrations();

  console.log("Running seeds");
  await runSeeds();

  console.log("Database reset complete");
}

resetDatabase().catch((err) => {
  console.error("Reset failed:", err);
  process.exit(1);
});
