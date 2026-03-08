import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  role: text("role").notNull().default("user"),
});

export const tasks = sqliteTable("tasks",{
  id:text("id").primaryKey(),
   title: text("title").notNull(),
  description: text("description"),
  completed: integer("completed", {mode:"boolean"}).notNull().default(false),
  createdAt: text("created_at").notNull(),
  userId : integer("user_id").notNull().references(()=>users.id),
})