import express from "express";
import { projects, team, articles } from "./data.js";

const app = express();
const PORT = 3000;

app.use("/projects", express.static("public"));

app.get("/", (req, res) => {
  res.type("html");
  res.send(`
    <html>
      <head>
        <title>TeamHub</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          .cards { display: flex; gap: 16px; margin: 20px 0; }
          .card { padding: 16px; border: 1px solid #ccc; border-radius: 8px; }
          nav a { margin-right: 12px; }
        </style>
      </head>
      <body>
        <h1>TeamHub</h1>

        <div class="cards">
          <div id ="project-count" class="card">Projects: Loading... </div>
          <div class="card">Articles: ${articles.length}</div>
          <div class="card">Team Size: ${team.length}</div>
        </div>

        <nav>
          <a href="/api/projects">Projects</a>
          <a href="/api/articles">Articles</a>
          <a href="/api/team">Team</a>
        </nav>
      </body>
      <script>
      async function loadProjects() {
            const el = document.getElementById('project-count');
            try {
              const res = await fetch('/api/projects');
              if (!res.ok) {
              throw new Error('Could not fetch projects');
      }
              const data = await res.json();

              el.textContent = 'Projects: ' + data.length;
            } catch (err) {
              console.error('Failed to fetch projects', err);
              el.textContent = 'Projects: unavailable';
              throw new Error("There is some error in fetching")
            }
          }

          loadProjects();
      </script>
    </html>
  `);
});

//project routes
app.get("/api/projects", (req, res) => {
  res.type("json").json(projects);
});

//3 render types

app.get("/projects/csr", (req, res) => {
  res.type("html");

  res.send(`<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Project CSR</title>
  </head>
  <body>
    <h1>Inventory Redesign</h1>
    <div id="project-list">Loading...</div>

    <script>
      const prjtlist = document.getElementById("project-list");
      async function loadProjects() {
        //.join('') - takes that array and merges all elements into ONE string
        try {
          const res = await fetch("/api/projects");
          const data = await res.json();
          prjtlist.innerHTML = data.map((p)=>\`<div><h3 style="color:crimson">\${p.name}</h3> <p style="color:teal">Status: \${p.status}</p></div>\`).join('');
        } catch (error) {
          prjtlist.textContent = "Failed to load the projects"
        }
      }

      loadProjects();
    </script>
  </body>
</html>
    `);
});

app.get("/projects/ssr", (req, res) => {
  res.type("html");

  const cards = projects
    .map(
      (p) => `
    <div>
      <h3 style="color:green">${p.name}</h3>
      <p>Status: ${p.status}</p>
    </div>
  `,
    )
    .join("");

  res.send(`
    <html>
    <head><title>Projects (SSR)</title></head>
      <body>
        <h1>Inventory Redesign</h1>
        <div>${cards}</div>
      </body>
    </html>
  `);
});

app.get("/api/projects/:id", (req, res) => {
  const pid = Number(req.params.id);
  const project = projects.filter((p) => p.id === pid);
  if (project.length != 0) {
    return res.status(200).type("json").json(project);
  }
  return res.status(404).type("json").json({ error: "Project not found" });
});

//articles
app.get("/api/articles", (req, res) => {
  res.type("json").json(articles);
});

app.get("/api/articles/:id", (req, res) => {
  const artid = Number(req.params.id);
  const article = articles.filter((a) => a.id === artid);
  if (article.length !== 0) {
    return res.status(200).type("json").json(article);
  }
  return res.status(404).type("json").json({ error: "Article not found" });
});

//the redirect
app.get("/people", (req, res) => {
  res.type("json").redirect(301, "/api/team");
});

app.get("/api/team", (req, res) => {
  res.type("json").json(team);
});

app.get("/set-cookie", (req, res) => {
  res.cookie("theme", "light", {
    httpOnly: true,
    Path: "/",
  });
  res.type("json").json({ ok: true });
});

app.use((error, req, res, next) => {
  res.status(500).type("json").json({
    error: "Something went wrong!",
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
