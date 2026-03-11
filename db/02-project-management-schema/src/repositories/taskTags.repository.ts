import { pool } from "../db/pool";

export class TaskTagsRepository {

  async addTag(taskId: string, tagId: string) {
    const result = await pool.query(
      `
      INSERT INTO task_tags (task_id, tag_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [taskId, tagId]
    );

    return result.rows[0];
  }

  async removeTag(taskId: string, tagId: string) {
    await pool.query(
      `
      DELETE FROM task_tags
      WHERE task_id = $1 AND tag_id = $2
      `,
      [taskId, tagId]
    );
  }

  async getTagsForTask(taskId: string) {
    const result = await pool.query(
      `
      SELECT t.*
      FROM tags t
      JOIN task_tags tt
      ON tt.tag_id = t.id
      WHERE tt.task_id = $1
      `,
      [taskId]
    );

    return result.rows;
  }
}