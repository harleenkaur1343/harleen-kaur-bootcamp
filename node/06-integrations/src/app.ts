import express from "express";
import { fetchJson } from "./http/fetchJson.js"
import { env } from "./config/env.js"
import { withRetry } from "./http/retry.js";
import { requestIdMiddleware } from "./middleware/requestIds.js";


export const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.set('json spaces', 2);
app.get("/ping", (req, res) => {
  res.json({ ok: true });
});

app.get("/test-weather", async (req, res) => {
  const city = req.query.city || "London";

  const url = `${env.baseUrl}/data/2.5/weather?q=${city}&appid=${env.openWeatherApiKey}`;

  const data = await withRetry(() => fetchJson(url));

  res.json(data);
});