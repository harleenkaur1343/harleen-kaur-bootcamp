import { pool } from "./pool";

export async function query(text: string, params?: any[]) {
  const start = Date.now();

  const result = await pool.query(text, params);

  const duration = Date.now() - start;

  if (duration > 100) {
    console.warn("⚠️ Slow query detected", {
      text,
      duration,
      params,
    });
  }

  return result;
}

export async function getClient() {
  return pool.connect();
}