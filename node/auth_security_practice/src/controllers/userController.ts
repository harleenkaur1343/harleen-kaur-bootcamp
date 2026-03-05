import db from "../db/index.js";
import { users } from "../db/schema.js";
import {eq} from "drizzle-orm";
import { Request, Response } from "express";
import { hashPassword } from "../utils/password.js";

export type User = {
  id?: number;
  email: string;
  password_hash: string;
  role: string;
};

// Create user
export async function createUser(req: Request, res: Response) {
  try { 
   const { email, password, role } = req.body;
    const password_hash = await hashPassword(password); 
    const user = await db.insert(users).values({
    email,
    password_hash,
    role
  });
    res.status(201).json({
      message: "User created",
      user
    });

  } catch (err : any) {
    res.status(500).json({
      error: "Failed to create user",
      err: err.message,
    });
  }
}


// Get user by email
export async function getUserByEmail(req:Request, res:Response) {
  
  const email = req.query.email; //from ?query= format for :emain - req.params.emails)
   if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Invalid email" });
  }
  const user = await db.select().from(users).where(eq(users.email, email))

  if(!user){
    res.status(404).json({message : "No such user exists"})
  }

  res.status(200).json(user);

}