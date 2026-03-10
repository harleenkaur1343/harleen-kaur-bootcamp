import { query } from "../db/query-helper.js";
import { pool } from "../db/index.js";
//common crud operations for tables
export class BaseRepository {
  constructor(tableName) {
    this.table = tableName;
  }

  async findAll() {
    const res = await query(`SELECT * FROM ${this.table}`);
    return res.rows;
  }

  async findById(id, client = pool) {
    const result = await client.query(`SELECT * FROM ${this.table} WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  }

  async delete(id) {
    await query(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
  }
}
