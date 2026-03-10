import  { pool } from "./index.js"

export async function createUser(name:string, email:string){
  const result = await pool.query(
    "INSERT INTO testusers (name, email) VALUES ($1, $2) RETURNING", [name, email]
  );

  return result.rows[0];
}

export async function getUsers() {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
}


export async function getUserById(id: number) {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0];
}