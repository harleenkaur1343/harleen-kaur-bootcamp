import { Router, Request, Response, NextFunction } from "express";
import { z } from "zod";

const router = Router();

// Body must be a non-empty JSON object
const EchoSchema = z.record(z.string(), z.unknown()).refine(
  (obj) => Object.keys(obj).length > 0,
  { message: "Request body must not be empty" }
);

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  const result = EchoSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      error: "Bad Request",
      details: result.error.flatten().formErrors,
    });
    return;
  }

  res.status(200).json({
    echo: result.data,
    receivedAt: new Date().toISOString(),
  });
});

// Method not allowed for non-POST
router.all("/", (_req: Request, res: Response) => {
  res.status(405).json({ error: "Method Not Allowed", allowed: ["POST"] });
});

export default router;
