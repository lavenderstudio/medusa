import { defineConfig } from "@medusajs/utils"

export default defineConfig({
  projectConfig: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 9000,
    databaseUrl: process.env.DATABASE_URL,
    databaseType: "postgres",
    databaseExtra: { 
      ssl: { rejectUnauthorized: false } 
    },
    http: {
      jwtSecret: process.env.JWT_SECRET || "supersecret_jwt_lavender",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret_cookie_lavender",
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7000,https://medusa-lavender.onrender.com",
    },
  },
  admin: {
    disable: false,
    path: "/admin",
    backendUrl: process.env.MEDUSA_BACKEND_URL || "https://medusa-lavender.onrender.com"
  }
})
