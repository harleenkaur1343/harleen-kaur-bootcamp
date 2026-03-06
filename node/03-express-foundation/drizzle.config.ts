import type { Config } from "drizzle-kit"

export default {
  schema: "./src/db/schema.ts", //table definitions 
  out: "./drizzle", // folder where drizzle will create the migration SQL files 
  dialect: "sqlite", //database we are using
  dbCredentials:{
    url:"./sqlite.db" //the database file, created automatically 
  },
} satisfies Config  //type chekcing