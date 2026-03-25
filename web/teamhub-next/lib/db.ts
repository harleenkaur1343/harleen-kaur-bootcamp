import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.js";

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  max:20
})


export const db = drizzle(pool,{schema});

export async function closeDb(){
  await pool.end();
}