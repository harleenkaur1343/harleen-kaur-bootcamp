//creating better-sqlite3 db for testing 

import Database from "better-sqlite3";


let db:any;

export function createTestDB() {
  db = new Database(":memory:");

  db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );

    CREATE TABLE projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      user_id INTEGER,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      project_id INTEGER,
      completed BOOLEAN DEFAULT FALSE,
      FOREIGN KEY(project_id) REFERENCES projects(id)
    );
  `);

  return db;
}

export function closeTestDB() {
  db.close();
}
