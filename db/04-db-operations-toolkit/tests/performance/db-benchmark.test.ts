import { describe, it } from "vitest";
import Database from "better-sqlite3";

describe("Database performance", () => {
  it("should insert 10000 tasks quickly", () => {
    const db = new Database(":memory:");

    db.exec(`
      CREATE TABLE tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT
      )
    `);

    const stmt = db.prepare(
      "INSERT INTO tasks (title) VALUES (?)"
    );

    const start = Date.now();

    const insert = db.transaction(() => {
      for (let i = 0; i < 10000; i++) {
        stmt.run(`Task ${i}`);
      }
    });

    insert();

    const duration = Date.now() - start;

    console.log("Insert time:", duration, "ms");
  });
});