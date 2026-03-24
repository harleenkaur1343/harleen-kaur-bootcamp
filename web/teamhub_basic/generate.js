import fs from "fs";
import { projects } from "./data.js";

const cards = projects
  .map(
    (p) => `
  <div>
    <h3>${p.name}</h3>
    <p>Status: ${p.status}</p>
  </div>
`,
  )
  .join("");

const html = `
<html>
<head><title>Project SSG</title></head>
  <body>
     <h1>Inventory Redesign</h1>
    <div>${cards}</div>
  </body>
</html>
`;

fs.writeFileSync("./public/projects-static.html", html);

console.log("Static page generated");
