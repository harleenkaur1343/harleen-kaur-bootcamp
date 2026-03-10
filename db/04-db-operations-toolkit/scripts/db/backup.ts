import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const user = process.env.DB_USER;
const host = process.env.DB_HOST;

const backupDir = path.resolve("backups");

function timestamp() {
  return new Date()
    .toISOString()
    .replace(/[:.]/g, "-");
}

async function backupDatabase() {
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const file = `db-${timestamp()}.sql`;
  const filepath = path.join(backupDir, file);

  console.log("Creating backup:", filepath);

  execSync(
    `pg_dump -h ${host} -U ${user} ${dbName} > ${filepath}`,
    { stdio: "inherit" }
  );

  console.log("Backup complete");
}

backupDatabase();