import fs from "fs";
import { pool } from "../src/db/pool";

async function migrate() {
  const sql = fs.readFileSync(
    "src/db/migrations/001_init.sql",
    "utf8"
  );

  await pool.query(sql);

  console.log("Migration complete");
  process.exit(0);
}

migrate();