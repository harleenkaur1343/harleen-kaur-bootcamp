import bcrypt from "bcrypt"
import  db  from "../db/index.js"
import { users } from "../db/schema.js"
import { eq } from "drizzle-orm"

export async function registerUser(data: {
  name: string
  email: string
  password: string
}) {
  const hash = await bcrypt.hash(data.password, 10)

  const result = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      password_hash: hash
    })
    .returning()
  return result[0];
}


export async function loginUser(email: string, password: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email))

  const user = result[0]

  if (!user) return null

  const valid = await bcrypt.compare(password, user.password_hash)

  if (!valid) return null

  return user
}