import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users",{
  id: serial("id").primaryKey(),
  username:text("username").notNull(),
  password:text("password").notNull()
})

export const projects = pgTable("projects",{
  id:serial("id").primaryKey(),
  name:text("name").notNull(),
  status:text("status").notNull(),
  team:integer("team").references(()=>users.id)
})

export const sessions = pgTable("sessions",{
  id:text("id").primaryKey(),
  userId:integer("user_id").references(()=>users.id)
})