"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const config_1 = require("./config");
exports.pool = new pg_1.Pool({
    host: config_1.dbConfig.host,
    port: config_1.dbConfig.port,
    user: config_1.dbConfig.user,
    password: config_1.dbConfig.password,
    database: config_1.dbConfig.database,
    max: 10,
    idleTimeoutMillis: 30000,
});
exports.pool.on("connect", () => {
    console.log("New database connection established");
});
exports.pool.on("error", (err) => {
    console.error("Unexpected database error", err);
});
//# sourceMappingURL=pool.js.map