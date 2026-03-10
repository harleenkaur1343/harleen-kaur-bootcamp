import { pool } from "../db/index.js"
import { BaseRepository } from "./baserepo.js";

export class ProjectRepository extends BaseRepository {

  constructor() {
    super("projects");
  }

  async create(name, client = pool) {

    const res = await client.query(
      `INSERT INTO projects (name)
       VALUES ($1)
       RETURNING *`,
      [name]
    );

    return res.rows[0];
  }

}