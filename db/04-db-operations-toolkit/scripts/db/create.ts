import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME || "toolkit_db";

async function createDatabase() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres",
  });

  await client.connect();

  const result = await client.query(
    `SELECT 1 FROM pg_database WHERE datname=$1`,
    [dbName]
  );

  if (result.rowCount === 0) {
    console.log(`Creating database ${dbName}`);
    await client.query(`CREATE DATABASE ${dbName}`);
  } else {
    console.log(`Database ${dbName} already exists`);
  }

  await client.end();
}

createDatabase()
  .then(() => {
    console.log("Database ready");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to create database", err);
    process.exit(1);
  });