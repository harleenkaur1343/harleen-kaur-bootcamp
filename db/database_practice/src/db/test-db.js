import { pool } from "./index.js";

async function test() {
  const result = await pool.query("SELECT NOW()");
  console.log(result.rows[0]);
}
export default pool;

async function run() {
  try {
    // creating schema
    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS users(
    //     id SERIAL PRIMARY KEY,
    //     email TEXT UNIQUE,
    //     created_at TIMESTAMPTZ DEFAULT NOW()
    //   )
    //   `)

    //  await pool.query(`
    //   CREATE TABLE IF NOT EXISTS tasks (
    //     id SERIAL PRIMARY KEY,
    //     title TEXT NOT NULL,
    //     completed BOOLEAN DEFAULT FALSE
    //   );
    // `);

    // console.log("Tables created");

    //INSERT VALUE

    // await pool.query(`INSERT INTO users (email) VALUES ($1)`, [
    //   "pooja@example.com",
    // ]);
    // await pool.query(`INSERT INTO tasks (title,user_id) VALUES ($1, $2)`,["Practice joins", 4]);

    // console.log("Inserted rows");

    // const userRes = await pool.query(`SELECT * FROM users`);
    // console.log("All users", userRes.rows);

    // const tasks = await pool.query(`SELECT * FROM tasks where completed = $1`,[false]);
    // const tasks = await pool.query(`SELECT * FROM tasks where user_id = $1`,[4]);

    // console.log("Tasks:", tasks.rows);

    // await pool.query(`
    //   ALTER TABLE tasks ADD COLUMN user_id INTEGER REFERENCES users(id);
    //   `);
    // await pool.query(`TRUNCATE users`);
    // await pool.query(`TRUNCATE tasks`);


    //JOINS
    const innerJ = await pool.query(
      `SELECT u.email, o.product FROM users u INNER JOIN orders o ON u.id = o.user_id`,
    );
    console.log("Inner Join", innerJ.rows);

    const leftJ = await pool.query(`SELECT U.email, COALESCE(o.product, 'unassigned') 
FROM users u  
LEFT JOIN orders o 
ON u.id=o.user_id`);
    console.log("Left Join", leftJ.rows);

    const rightJ = await pool.query(
      `SELECT U.email, o.product FROM users u RIGHT JOIN orders o ON u.id=o.user_id`,
    );
    console.log("Right Join", rightJ.rows);

    const outerJ = await pool.query(
      `SELECT U.email, o.product FROM users u FULL OUTER JOIN orders o ON u.id=o.user_id`,
    );
    console.log("Outer Join", outerJ.rows);

    const allCars = await pool.query(
      `SELECT * FROM cars`,
    );
    console.log("All Cars", allCars.rows);

     const fewCars = await pool.query(
      `SELECT propulsion_type, AVG(ts60mph) AS mean_time FROM cars WHERE limited_production_count IS NOT NULL GROUP BY propulsion_type HAVING AVG(ts60mph) > 2;`,
    );
    console.log("Few Cars", fewCars.rows);
    
    //aggregating 
     const tasksByCat = await pool.query(`SELECT c.name, ARRAY_AGG(t.title) AS tasks FROM tasks t INNER JOIN categories c ON t.category_id = c.id GROUP BY c.name ORDER BY c.name DESC;`)
      console.log("Groups tasks by Category", tasksByCat.rows);

  } catch (err) {
    console.error("DB ERROR", err);
  } finally {
    await pool.end();
  }
}

run();
// SELECT
// t.title,
// ARRAY_AGG(g.name) AS tags
// FROM tasks t
// JOIN task_tags tt ON t.id = tt.task_id
// JOIN tags g ON tt.tag_id = g.id
// GROUP BY t.title;

//on first call create/second replace - so that no error for alrady exists  
// CREATE OR REPLACE FUNCTION update_task_count()
//   RETURN TRIGGER AS $$
//   BEGIN 
//     IF TG_OP = 'INSERT' THEN
//       UPDATE users 
//       SET task_count = task_count+1
//       WHERE id = NEW.user_id;

//     ELSIF TG_OP='DELETE' THEN
//       UPDATE users
//       SET task_count = task_count - 1
//       WHERE id = OLD.user_id;
//     END IF;

//     RETURN NULL;
  
//   END;
// $$ LANGUAGE plpgsql;

// CREATE TRIGGER taskcount_trigger
// AFTER INSERT OR DELETE ON tasks
// FOR EACH ROW
// EXECUTE FUNCTION update_task_count();