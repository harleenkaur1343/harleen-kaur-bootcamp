import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: 'appuser',
  password: 'pracpass',     // ← Plain string!
  host: 'localhost',
  port: 5432,
  database: 'practicedb',
  max: 10,           
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});



