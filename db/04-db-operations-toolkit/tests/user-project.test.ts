import { describe, it, expect } from "vitest";
import Database from "better-sqlite3";
import { createUser } from "./helpers/factories/user.factory";

describe("User operations", () => {
  it("should create a user", () => {
    const db = new Database(":memory:");

    db.exec(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
      )
    `);

    const user = createUser();

    const stmt = db.prepare(
      "INSERT INTO users (name,email) VALUES (?,?)"
    );

    const result = stmt.run(user.name, user.email);

    expect(result.lastInsertRowid).toBeDefined();
  });
});