import { BaseRepository } from "./baserepo";
import { query } from "../db/query-helper";

export class UserRepository extends BaseRepository {
  constructor() {
    super("users");
  }

  async create(email) {
    const result = await query(
      `INSERT INTO users (email)
       VALUES ($1)
       RETURNING *`,
      [email],
    );

    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await query(`SELECT * FROM users WHERE email = $1`, [email]);

    return result.rows[0];
  }
}
