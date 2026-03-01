import {sqliteTable, text, integer} from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users",{
  id: integer("id").primaryKey({autoIncrement:true}),
  name:text("name").notNull(),
  email:text("email").notNull().unique()
});

export const cities = sqliteTable("cities",{
  cityname: text("cityname").notNull(),
  state:text("state").notNull()
})