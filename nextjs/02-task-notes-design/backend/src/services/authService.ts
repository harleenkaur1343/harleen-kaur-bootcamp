import bcrypt from "bcrypt"
import  {db}  from "../db/index.js"
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
    //console.log(result);
  return result[0];
  
}


export async function loginUser(email: string, password: string) {
  const result = await db
  .select().from(users).where(eq(users.email, email))

  const user = result[0];
  //console.log("User in service", user)

  if (!user) return null

  const valid = await bcrypt.compare(password, user.password_hash)
  //console.log("Is valid ", valid)
  if (!valid) return null

  return user;
}