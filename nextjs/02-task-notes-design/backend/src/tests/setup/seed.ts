//insert test data

import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

export async function seedDb() {
  await db.insert(users).values({
    name: "Test User",
    email: "test@example.com",
    password_hash: "dummyhash",
    role: "user",
  });
}
