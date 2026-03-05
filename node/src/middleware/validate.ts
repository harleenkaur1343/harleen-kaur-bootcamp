import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../errors/AppError.js";

export const validate = (schema:ZodSchema, property:"body" | "query" | "params" = "body")=>
  (req: Request, res: Response, next: NextFunction) =>{
    const result = schema.safeParse(req[property]);

    if(!result.success){
      // return res.status(400).json({
      //   error:{
      //     code:'VALIDATION_ERROR',
      //     details:result.error.format()
      //   }
      // })
      //res sent from here only - er not passed to the error middleware / class
      return next(
        new AppError(
          400,
          "Validation Error",
          result.error.format()
        )
      )
    }

    req[property] = result.data;
    console.log(`Vaildated data ${result.data}`);
    next();

  }
