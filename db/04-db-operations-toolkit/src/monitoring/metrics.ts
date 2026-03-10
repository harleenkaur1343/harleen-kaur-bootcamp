import { query } from "../db/connection.js";

export async function getDatabaseMetrics() {
  const connections = await query(`
    SELECT count(*) as total
    FROM pg_stat_activity
  `);

  const dbStats = await query(`
    SELECT
      numbackends,
      xact_commit,
      xact_rollback,
      blks_read,
      blks_hit
    FROM pg_stat_database
    WHERE datname = current_database()
  `);

  return {
    activeConnections: connections.rows[0].total,
    stats: dbStats.rows[0],
  };
}