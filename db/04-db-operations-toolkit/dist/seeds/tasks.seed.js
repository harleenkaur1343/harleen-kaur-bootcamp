"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedTasks = seedTasks;
const connection_1 = require("../db/connection");
async function seedTasks() {
    console.log("Seeding tasks...");
    await (0, connection_1.query)(`
    INSERT INTO tasks (title, project_id)
    VALUES
      ('Design database schema', 1),
      ('Implement migrations', 1),
      ('Create UI components', 2),
      ('Setup CI/CD', 3)
  `);
}
//# sourceMappingURL=tasks.seed.js.map