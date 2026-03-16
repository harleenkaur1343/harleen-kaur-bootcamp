import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  uuid,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  role: text("role").default("user").notNull(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false).notNull(),
  priority: priorityEnum("priority").default("medium").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
  user_id: integer("user_id").references(() => users.id).notNull(),
});
