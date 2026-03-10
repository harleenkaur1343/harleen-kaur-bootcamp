import { pool } from "./index.js";
export async function query(text, params) {
  return pool.query(text, params);
}