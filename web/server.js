import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


app.use(express.static(__dirname));

app.get("/", (req, res) => {
  // console.log("Request received for /", req.method);
  // res.send("<h1>Hello from the toolbox</h1>");
  res.sendFile(path.join(__dirname,"learn.html"));
});

app.get("/api/time", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("*slach", (req, res) => {
  res.status(404).json({ ok: false, message: "not found" });
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
