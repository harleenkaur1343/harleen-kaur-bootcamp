import { execSync } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const user = process.env.DB_USER;
const host = process.env.DB_HOST;

const file = process.argv[2];

if (!file) {
  console.error("Please provide backup file");
  process.exit(1);
}

console.log(`Restoring database from ${file}`);

execSync(
  `psql -h ${host} -U ${user} ${dbName} < ${file}`,
  { stdio: "inherit" }
);

console.log("Restore complete");