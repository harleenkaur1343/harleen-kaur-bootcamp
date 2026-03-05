import express from "express";
import { getUserByEmail, createUser } from "../controllers/userController.js";
const router = express.Router();
router.get("/", getUserByEmail);
router.post("/", createUser);
export default router;
//# sourceMappingURL=userRoutes.js.map