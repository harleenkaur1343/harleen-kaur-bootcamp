"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_health_1 = require("../monitoring/db-health");
const metrics_1 = require("../monitoring/metrics");
const db_status_view_1 = require("./db-status.view");
const router = (0, express_1.Router)();
// router.get("/admin/db-status", async (req, res) => {
//   try {
//     const health = await checkDatabaseHealth();
//     const metrics = await getDatabaseMetrics();
//     res.json({
//       database: health,
//       metrics,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error:any) {
//     res.json({ message: error.message });
//   }
// });
router.get("/admin/db-status", async (req, res) => {
    const health = await (0, db_health_1.checkDatabaseHealth)();
    const metrics = await (0, metrics_1.getDatabaseMetrics)();
    const html = (0, db_status_view_1.renderDbStatus)({
        health,
        metrics
    });
    res.send(html);
});
exports.default = router;
//# sourceMappingURL=db-status.route.js.map