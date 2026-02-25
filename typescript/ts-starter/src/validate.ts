import {z} from "zod";
//zod is schema verifictaioin library for ts 

const User = z.object({
  id:z.string().uuid(),
  email:z.string().email()
});

export type User = z.infer<typeof User>;