import dotenv from "dotenv"
dotenv.config()

export const env = {
  // existing
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY!,
  baseUrl:           process.env.OPENWEATHER_BASE_URL!,
  timeout:           Number(process.env.HTTP_TIMEOUT  || 5000),
  retries:           Number(process.env.HTTP_RETRIES  || 3),

  // add these
  db: {
    url:      process.env.DATABASE_URL!,
  },
  auth: {
    jwtSecret:    process.env.JWT_SECRET!,
  },
  server: {
    port:        Number(process.env.PORT || 9000),
    nodeEnv:     process.env.NODE_ENV || "development",
    isDev:       process.env.NODE_ENV === "development",
    isProd:      process.env.NODE_ENV === "production",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  }
}