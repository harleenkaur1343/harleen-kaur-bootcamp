//initialize DB connection for tests 

import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg";
import * as schema from "../../db/schema.js";

let pool : Pool;

export function initDb(){
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  })
  return drizzle(pool,{schema});
}

export async function closeDb(){
  await pool.end();
}