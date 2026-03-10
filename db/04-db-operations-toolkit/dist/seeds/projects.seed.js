"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedProjects = seedProjects;
const connection_1 = require("../db/connection");
async function seedProjects() {
    console.log("Seeding projects...");
    await (0, connection_1.query)(`
    INSERT INTO projects (name, user_id)
    VALUES
      ('Backend API', 1),
      ('Frontend App', 1),
      ('DevOps Toolkit', 2)
    ON CONFLICT DO NOTHING
  `);
}
//# sourceMappingURL=projects.seed.js.map