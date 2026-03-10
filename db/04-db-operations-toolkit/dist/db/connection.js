"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
exports.getClient = getClient;
const pool_1 = require("./pool");
async function query(text, params) {
    const start = Date.now();
    const result = await pool_1.pool.query(text, params);
    const duration = Date.now() - start;
    if (duration > 100) {
        console.warn("⚠️ Slow query detected", {
            text,
            duration,
            params,
        });
    }
    return result;
}
async function getClient() {
    return pool_1.pool.connect();
}
//# sourceMappingURL=connection.js.map