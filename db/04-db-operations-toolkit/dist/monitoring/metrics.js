"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseMetrics = getDatabaseMetrics;
const connection_js_1 = require("../db/connection.js");
async function getDatabaseMetrics() {
    const connections = await (0, connection_js_1.query)(`
    SELECT count(*) as total
    FROM pg_stat_activity
  `);
    const dbStats = await (0, connection_js_1.query)(`
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
//# sourceMappingURL=metrics.js.map