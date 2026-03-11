import { pool } from "../db/pool";

export class BaseRepository {
  protected table: string;

  constructor(table: string) {
    this.table = table;
  }

  async findAll() {
    const result = await pool.query(
      `SELECT * FROM ${this.table}`
    );
    return result.rows;
  }

  async findById(id: string) {
    const result = await pool.query(
      `SELECT * FROM ${this.table} WHERE id = $1`,
      [id]
    );

    return result.rows[0];
  }

  async deleteById(id: string) {
    await pool.query(
      `DELETE FROM ${this.table} WHERE id = $1`,
      [id]
    );
  }
}