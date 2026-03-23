import express from "express";
import { rmSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname));
app.use((req, res, next) => {
  res.set("X-Debug-Trace", `route=${req.path}`);
  next();
});

app.get("/", (req, res) => {
  // console.log("Request received for /", req.method);
  // res.send("<h1>Hello from the toolbox</h1>");
  // res.set("Cache-Control","no-store");
  res.sendFile(path.join(__dirname, "learn.html"));
  //   res.send(`<!doctype html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>CSS Debug Lab</title>
  //     <link rel="stylesheet" href="/styles/main.css" />
  //   </head>
  //   <body>
  //     <h1 class="title">Debug My CSS</h1>
  //   </body>
  // </html>`)
});

app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "profile.html"));
});
app.get("/api/profile", (req, res) => {
  res.json({
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/100",
  });
});

app.get("/old-home", (req, res) => {
  res.redirect(302, "/");
});

app.get("/api/time", (req, res) => {
  console.log("Fail", req.query.fail);
  if (req.query.fail === "1") {
    res.set("X-Debug-Trace", "forced-500");
    throw new Error("Controlled failure");
  }
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("*slach", (req, res) => {
  res.status(404).send(`<body><h2>This page was not found</h2></body>`);
});

app.use((error, req, res, next) => {
  res.status(500).json({
    error: "Something went wrong!",
    message: error.message,
  });
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
