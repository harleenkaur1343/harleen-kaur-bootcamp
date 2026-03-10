"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabaseHealth = checkDatabaseHealth;
const connection_js_1 = require("../db/connection.js");
async function checkDatabaseHealth() {
    const start = Date.now();
    try {
        await (0, connection_js_1.query)("SELECT 1");
        const latency = Date.now() - start;
        return {
            status: "working",
            latency: `${latency}`
        };
    }
    catch (error) {
        return {
            status: "unhealthy",
            error: error.message,
        };
    }
}
//# sourceMappingURL=db-health.js.map