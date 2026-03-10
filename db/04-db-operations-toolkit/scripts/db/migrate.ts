import { runMigrations } from "../../src/migrations/migrate";

async function main() {
  await runMigrations();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});