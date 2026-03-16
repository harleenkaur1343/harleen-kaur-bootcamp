import { Request, Response, NextFunction } from "express";
import { registerUser } from "../services/authService.js";
import { loginUser } from "../services/authService.js";
import { generateToken } from "../utils/jwt.js";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  //console.log("In login controller");
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);
    //console.log(user);

    if (!user) {
      return res.status(401).json({
        title: "Unauthorized",
        status: 401,
        detail: "Invalid email or password",
      });
    }

    const token = generateToken({
      _id: user.id,
      role: user.role,
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      domain: "localhost", 
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
      token
    });
  } catch (err) {
    next(err);
  }
}
