import { query } from "../db/connection";

export async function seedTasks() {
  console.log("Seeding tasks...");

  await query(`
    INSERT INTO tasks (title, project_id)
    VALUES
      ('Design database schema', 1),
      ('Implement migrations', 1),
      ('Create UI components', 2),
      ('Setup CI/CD', 3)
  `);
}