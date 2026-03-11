import { BaseRepository } from "./base.repository";
import { pool } from "../db/pool";

export class CommentsRepository extends BaseRepository {

  constructor() {
    super("comments");
  }

  async create(
    taskId: string,
    userId: string,
    content: string,
    parentId?: string
  ) {

    const result = await pool.query(
      `
      INSERT INTO comments
      (task_id, user_id, content, parent_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [taskId, userId, content, parentId || null]
    );

    return result.rows[0];
  }

  async findByTask(taskId: string) {
    const result = await pool.query(
      `
      SELECT *
      FROM comments
      WHERE task_id = $1
      ORDER BY created_at ASC
      `,
      [taskId]
    );

    return result.rows;
  }

}