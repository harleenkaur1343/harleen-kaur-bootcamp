"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSeeds = runSeeds;
const users_seed_1 = require("./users.seed");
const projects_seed_1 = require("./projects.seed");
const tasks_seed_1 = require("./tasks.seed");
const connection_1 = require("../db/connection");
async function runSeeds() {
    const client = await (0, connection_1.getClient)();
    try {
        await client.query("BEGIN");
        await (0, users_seed_1.seedUsers)();
        await (0, projects_seed_1.seedProjects)();
        await (0, tasks_seed_1.seedTasks)();
        await client.query("COMMIT");
    }
    catch (err) {
        await client.query("ROLLBACK");
        throw err;
    }
    finally {
        client.release();
    }
}
//# sourceMappingURL=seed.js.map