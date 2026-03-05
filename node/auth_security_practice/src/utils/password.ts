import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Hash password
export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

// Compare password
export async function comparePassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}