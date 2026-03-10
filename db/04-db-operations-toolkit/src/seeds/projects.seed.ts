import { query } from "../db/connection";

export async function seedProjects() {
  console.log("Seeding projects...");

  await query(`
    INSERT INTO projects (name, user_id)
    VALUES
      ('Backend API', 1),
      ('Frontend App', 1),
      ('DevOps Toolkit', 2)
    ON CONFLICT DO NOTHING
  `);
}