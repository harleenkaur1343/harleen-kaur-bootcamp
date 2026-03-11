import { BaseRepository } from "./base.repository";
import { pool } from "../db/pool";

export class TasksRepository extends BaseRepository {
  constructor() {
    super("tasks");
  }

  async create(projectId: string, title: string) {
    const result = await pool.query(
      `
      INSERT INTO tasks (project_id, title)
      VALUES ($1, $2)
      RETURNING *
      `,
      [projectId, title]
    );

    return result.rows[0];
  }

  async findByProject(projectId: string) {
    const result = await pool.query(
      `
      SELECT * FROM tasks
      WHERE project_id = $1
      `,
      [projectId]
    );

    return result.rows;
  }
}