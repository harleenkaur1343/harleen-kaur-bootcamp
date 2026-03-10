import { pool } from "./index.js";
import fs from "fs";
import path from "path";

async function runMigrations() {
  const client = await pool.connect();

  try {
     const applied = await client.query(
      "SELECT filename FROM migrations"
    );

    const appliedSet = new Set(applied.rows.map(r => r.filename));

    const files = fs.readdirSync("./migrations").sort();

    for (const file of files) {
      if (!appliedSet.has(file)) {
        console.log("Running:", file);

        const sql = fs.readFileSync(
          path.join("./migrations", file),
          "utf8"
        );

        await client.query("BEGIN");
        await client.query(sql);
        await client.query(
          "INSERT INTO migrations (filename) VALUES ($1)",
          [file]
        );
        await client.query("COMMIT");
      }
    }

  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
  } finally {
    client.release();
  }
}

runMigrations();