import fs from "fs-extra";

await fs.ensureDir(".data")
await fs.writeJSON(".data/example.json", {name:"Harleen"});
const content = await fs.readJSON(".data/example.json");

// console.log(content);