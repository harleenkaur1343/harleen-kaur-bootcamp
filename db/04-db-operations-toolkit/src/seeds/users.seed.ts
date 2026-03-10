import { query } from "../db/connection";

export async function seedUsers() {
  console.log("Seeding users...");

  await query(`
    INSERT INTO users (name, email)
    VALUES
      ('Harry', 'harrypotter@example.com'),
      ('Hermione', 'hgranger@example.com'),
      ('Ron', 'ronweasly@example.com')
    ON CONFLICT (email) DO NOTHING
  `);
}