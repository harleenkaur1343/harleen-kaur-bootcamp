import { query } from "../../src/db/connection";

async function test() {
  const result = await query("SELECT NOW()");
  console.log("Database time:", result.rows[0]);
}

test().then(() => process.exit());