import { BaseRepository } from "./base.repository";
import { pool } from "../db/pool";

export class TagsRepository extends BaseRepository {
  constructor() {
    super("tags");
  }

  async create(name: string) {
    const result = await pool.query(
      `
      INSERT INTO tags (name)
      VALUES ($1)
      RETURNING *
      `,
      [name]
    );

    return result.rows[0];
  }

  async findByName(name: string) {
    const result = await pool.query(
      `
      SELECT * FROM tags
      WHERE name = $1
      `,
      [name]
    );

    return result.rows[0];
  }
}