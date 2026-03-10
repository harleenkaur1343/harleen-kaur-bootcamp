import fs from "fs";
import path from "path";
import { query } from "../db/connection";

const migrationsDir = path.join(__dirname);

export async function runMigrations() {
  console.log("Running migrations...");

  // create migrations table if missing
  await query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // read migration files
  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  // get applied migrations
  const applied = await query(`SELECT filename FROM _migrations`);
  const appliedFiles = applied.rows.map((r) => r.filename);

  for (const file of files) {
    if (appliedFiles.includes(file)) {
      continue;
    }

    console.log(`Applying migration: ${file}`);

    const sql = fs.readFileSync(
      path.join(migrationsDir, file),
      "utf8"
    );

    await query(sql);

    await query(
      `INSERT INTO _migrations (filename) VALUES ($1)`,
      [file]
    );
  }

  console.log("Migrations complete");
}