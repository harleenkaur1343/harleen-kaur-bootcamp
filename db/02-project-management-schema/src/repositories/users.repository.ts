import { BaseRepository } from "./base.repository";
import { pool } from "../db/pool";

export class UsersRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  async create(name: string, email: string, preferences: any) {
    const result = await pool.query(
      `
      INSERT INTO users (name, email, preferences)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, email, preferences]
    );

    return result.rows[0];
  }
}