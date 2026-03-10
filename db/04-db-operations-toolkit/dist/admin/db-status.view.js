"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderDbStatus = renderDbStatus;
function renderDbStatus(data) {
    return `
  <html>
  <head>
    <title>Database Status</title>
    <style>
      body { font-family: Arial; margin:40px }
      .card { padding:20px; border:1px solid #ccc; margin-bottom:20px }
      .healthy { color: green }
      .unhealthy { color: red }
    </style>
  </head>

  <body>
    <h1>Database Monitoring Dashboard</h1>

    <div class="card">
      <h2>Health</h2>
      <p>Status: <span class="${data.health.status}">
        ${data.health.status}
      </span></p>

      <p>Latency: ${data.health.latency}</p>
    </div>

    <div class="card">
      <h2>Connections</h2>
      <p>Active Connections: ${data.metrics.activeConnections}</p>
    </div>

    <div class="card">
      <h2>Transactions</h2>
      <p>Commits: ${data.metrics.stats.xact_commit}</p>
      <p>Rollbacks: ${data.metrics.stats.xact_rollback}</p>
    </div>

    <div class="card">
      <h2>Cache</h2>
      <p>Blocks Read: ${data.metrics.stats.blks_read}</p>
      <p>Blocks Hit: ${data.metrics.stats.blks_hit}</p>
    </div>

  </body>
  </html>
  `;
}
//# sourceMappingURL=db-status.view.js.map