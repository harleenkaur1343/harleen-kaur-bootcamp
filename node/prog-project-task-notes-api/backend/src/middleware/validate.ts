import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body)
      next()
    } catch (err: any) {
      res.status(400).json({
        type: "validation_error",
        title: "Invalid request body",
        status: 400,
        detail: err.errors?.[0]?.message || "Validation failed"
      })
    }
  }
}