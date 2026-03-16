//the env vars 
import dotenv from "dotenv";
dotenv.config();

export const env = {
 openWeatherApiKey: process.env.OPENWEATHER_API_KEY!,
  baseUrl: process.env.OPENWEATHER_BASE_URL!,
  timeout: Number(process.env.HTTP_TIMEOUT || 5000),
  retries: Number(process.env.HTTP_RETRIES || 3)
}