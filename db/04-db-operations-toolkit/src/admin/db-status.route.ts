import { Router } from "express";
import { checkDatabaseHealth } from "../monitoring/db-health";
import { getDatabaseMetrics } from "../monitoring/metrics";
import { renderDbStatus } from "./db-status.view";


const router = Router();

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
  const health = await checkDatabaseHealth();
  const metrics = await getDatabaseMetrics();

  const html = renderDbStatus({
    health,
    metrics
  });

  res.send(html);
});

export default router;
