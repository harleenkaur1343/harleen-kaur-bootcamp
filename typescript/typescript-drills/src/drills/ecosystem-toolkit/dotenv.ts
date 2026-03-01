import "dotenv/config";
import {z} from "zod"

const Env = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development","production","test"]).default("development")
})

export const env = Env.parse(process.env)