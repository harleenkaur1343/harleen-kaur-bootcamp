CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,

  project_id INTEGER NOT NULL,

  completed BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_project
    FOREIGN KEY (project_id)
    REFERENCES projects(id)
    ON DELETE CASCADE
);