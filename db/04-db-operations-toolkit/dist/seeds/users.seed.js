"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedUsers = seedUsers;
const connection_1 = require("../db/connection");
async function seedUsers() {
    console.log("Seeding users...");
    await (0, connection_1.query)(`
    INSERT INTO users (name, email)
    VALUES
      ('Harry', 'harrypotter@example.com'),
      ('Hermione', 'hgranger@example.com'),
      ('Ron', 'ronweasly@example.com')
    ON CONFLICT (email) DO NOTHING
  `);
}
//# sourceMappingURL=users.seed.js.map