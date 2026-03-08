import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret"

export function generateToken(payload: { userId: number; role: string }) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "1h"
  })
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET)
}

