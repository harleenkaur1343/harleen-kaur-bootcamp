import { Router, Request, Response, NextFunction } from "express";

const router = Router();

/* Router-level middleware */
router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Users router middleware");
  next();
});

/* Routes */
router.get("/", (req: Request, res: Response) => {
  res.json({ users: ["alice", "bob"] });
});

router.get("/:id", (req: Request, res: Response) => {
  res.json({ userId: req.params.id });
});

export default router;