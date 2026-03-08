import express from "express";
import { fetchJson } from "./http/fetchJson.js"
import { env } from "./config/env.js"
import { withRetry } from "./http/retry.js";
import { requestIdMiddleware } from "./middleware/requestIds.js";
const app = express()

app.use(express.json());
app.use(requestIdMiddleware);
app.set('json spaces', 2);
app.get("/health", (req, res) => {
  res.json({ status: "ok" })
})
app.get("/test-weather", async (req,res) => {
  
  const url =  `${env.baseUrl}/data/2.5/weather?q=London&appid=${env.openWeatherApiKey}`;

  const data = await withRetry(() => fetchJson(url));
 res.json(data);
})


const port = 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})