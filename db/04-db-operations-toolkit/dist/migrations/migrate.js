"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = runMigrations;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const connection_1 = require("../db/connection");
const migrationsDir = path_1.default.join(__dirname);
async function runMigrations() {
    console.log("Running migrations...");
    // create migrations table if missing
    await (0, connection_1.query)(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename TEXT UNIQUE NOT NULL,
      executed_at TIMESTAMP DEFAULT NOW()
    )
  `);
    // read migration files
    const files = fs_1.default
        .readdirSync(migrationsDir)
        .filter((f) => f.endsWith(".sql"))
        .sort();
    // get applied migrations
    const applied = await (0, connection_1.query)(`SELECT filename FROM _migrations`);
    const appliedFiles = applied.rows.map((r) => r.filename);
    for (const file of files) {
        if (appliedFiles.includes(file)) {
            continue;
        }
        console.log(`Applying migration: ${file}`);
        const sql = fs_1.default.readFileSync(path_1.default.join(migrationsDir, file), "utf8");
        await (0, connection_1.query)(sql);
        await (0, connection_1.query)(`INSERT INTO _migrations (filename) VALUES ($1)`, [file]);
    }
    console.log("Migrations complete");
}
//# sourceMappingURL=migrate.js.map