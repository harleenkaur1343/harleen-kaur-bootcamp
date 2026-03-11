import { Router } from "express";
import { UsersRepository } from "../repositories/users.repository";

const router = Router();
const usersRepo = new UsersRepository();

router.post("/", async (req, res) => {
  const { name, email, preferences } = req.body;

  const user = await usersRepo.create(name, email, preferences);

  res.json(user);
});

router.get("/", async (req, res) => {
  const users = await usersRepo.findAll();

  res.json(users);
});

export default router;