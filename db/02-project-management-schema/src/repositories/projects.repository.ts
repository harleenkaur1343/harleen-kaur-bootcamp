import { BaseRepository } from "./base.repository";
import { pool } from "../db/pool";

export class ProjectsRepository extends BaseRepository {
  constructor() {
    super("projects");
  }

  async create(ownerId: string, name: string, description?: string) {
    const result = await pool.query(
      `
      INSERT INTO projects (owner_id, name, description)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [ownerId, name, description]
    );

    return result.rows[0];
  }

  async findByOwner(ownerId: string) {
    const result = await pool.query(
      `
      SELECT * FROM projects
      WHERE owner_id = $1
      `,
      [ownerId]
    );

    return result.rows;
  }
}