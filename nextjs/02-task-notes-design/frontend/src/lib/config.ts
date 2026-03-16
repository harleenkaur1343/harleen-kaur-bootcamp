const getEnvVar = (key: string, required = true): string => {
  const value = process.env[key]

  if (required && !value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Make sure it is set in .env.local (dev) or your deployment platform (prod)`
    )
  }

  return value ?? ""
}

export const config = {
  apiUrl: getEnvVar("NEXT_PUBLIC_API_URL"),
  jwtSecret: getEnvVar("JWT_SECRET"),
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction:  process.env.NODE_ENV === "production",
  isTest:        process.env.NODE_ENV === "test",

  cookie: {
    secure:   process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production"
      ? ("none" as const)
      : ("lax"  as const),
  }
} as const

// log on startup so you can see which env is active
if (config.isDevelopment) {
  console.log("Running in development mode")
  console.log("API URL:", config.apiUrl)
}