import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    email: text("email").notNull().unique(),
    password_hash: text("password_hash").notNull(),
    role: text("role").notNull(),
});
//# sourceMappingURL=schema.js.map