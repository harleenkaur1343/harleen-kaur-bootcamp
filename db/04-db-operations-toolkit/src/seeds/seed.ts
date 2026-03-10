import { seedUsers } from "./users.seed";
import { seedProjects } from "./projects.seed";
import { seedTasks } from "./tasks.seed";
import { getClient } from "../db/connection";

export async function runSeeds() {
  const client = await getClient();

  try {
    await client.query("BEGIN");

    await seedUsers();
    await seedProjects();
    await seedTasks();

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}