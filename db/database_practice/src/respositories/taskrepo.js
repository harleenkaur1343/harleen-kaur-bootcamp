import { BaseRepository } from "./baserepo.js";
import { query } from "../db/query-helper.js";
import { pool } from "../db/index.js";

export class TaskRepository extends BaseRepository {
  constructor() {
    super("tasks");
  }


  async create(title, userId, projectId, client = pool) {

    const res = await client.query(
      `INSERT INTO tasks (title, user_id, project_id)
       VALUES ($1,$2,$3)
       RETURNING *`,
      [title, userId, projectId]
    );

    return res.rows[0];
  }

  async findByUser(userId) {
    const result = await query(`SELECT * FROM tasks WHERE user_id = $1`, [
      userId,
    ]);

    return result.rows;
  }

  async markComplete(taskId) {
    const result = await query(
      `UPDATE tasks
       SET completed = true
       WHERE id = $1
       RETURNING *`,
      [taskId],
    );

    return result.rows[0];
  }
}
