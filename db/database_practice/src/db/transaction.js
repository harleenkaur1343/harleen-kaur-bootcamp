import { pool } from "../db/index.js";

export async function withTransaction(fn, retries = 3) {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const result = await fn(client);

    await client.query("COMMIT");

    return result;

  } catch (err) {

    await client.query("ROLLBACK");

    if (err.code === "40P01" && retries > 0) {
      console.log("Deadlock detected, retrying...");
      return withTransaction(fn, retries - 1);
    }

    throw err;

  } finally {
    client.release();
  }
}