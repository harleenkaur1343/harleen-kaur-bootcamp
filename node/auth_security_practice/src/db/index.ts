import Database from "better-sqlite3";
import {drizzle} from "drizzle-orm/better-sqlite3";

const sqlite = new Database("sqlite.db");

const db = drizzle(sqlite);

export function closeDb() {
 sqlite.close();
  console.log("Database connection closed");
}

export default db;
//It creates a connection to a SQLite database file (sqlite.db) and 
// wraps it with Drizzle ORM so you can use type‑safe SQL queries in your app.