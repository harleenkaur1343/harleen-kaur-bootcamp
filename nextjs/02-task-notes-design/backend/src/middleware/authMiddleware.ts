import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
   const authHeader = req.headers.authorization;
// let token = req.cookies.token;
// console.log("Cookie check in auth middleware", token);
  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization header missing",
    });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      error: "Invalid authorization format",
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
  
    req.user = decoded as any;

    next();
  } catch (err) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
  
}