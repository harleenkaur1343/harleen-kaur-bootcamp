import {z} from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  userId:z.string().optional()
})

export const taskQuerySchema = z.object({
  userId: z.string().optional(),
  completed: z
    .enum(["true","false"])
    .optional(),

  //pagination 
  page : z
  .string()
  .optional()
  .transform(val => (val? parseInt(val, 10):1))
  .refine(val => val>0,"Page number should be > 0"),

  limit: z
  .string()
  .optional()
  .transform(val => (val ? parseInt(val, 10) : 10))
  .refine(val => val > 0 && val <= 100, "Limit must be between 1 and 100"),

  sort:z
   .enum(["createdAt","title"])
   .optional()
   .default("createdAt"),

  order: z
   .enum(["asc", "desc"])
    .optional()
    .default("asc")

})

export type CreateTaskInput = z.infer<typeof createTaskSchema>;

const task :CreateTaskInput = {
  title:"Any",
  // description:356
}
