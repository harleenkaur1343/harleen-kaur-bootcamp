import { runSeeds } from "../../src/seeds/seed";

async function main() {
  await runSeeds();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});