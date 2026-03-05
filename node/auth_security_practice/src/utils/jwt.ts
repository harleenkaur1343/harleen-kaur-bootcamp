import jwt from "jsonwebtoken";

const SECRET = "my-secret-key";

// Create token
export function generateToken(userId: number, role: string) {
  return jwt.sign(
    {userId, role},
    SECRET,
    {expiresIn:"1d"}
  );
}

// Verify token
export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}