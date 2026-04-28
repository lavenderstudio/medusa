import { defineConfig } from "@medusajs/utils"

export default defineConfig({
  projectConfig: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 10000,
    databaseUrl: process.env.DATABASE_URL,
    databaseType: "postgres",
    databaseExtra: { 
      ssl: { rejectUnauthorized: false } 
    },
    http: {
      jwtSecret: process.env.JWT_SECRET || "lavender_prime_secret_2026",
      cookieSecret: process.env.COOKIE_SECRET || "lavender_prime_cookie_2026",
      storeCors: process.env.STORE_CORS || "http://localhost:8000,https://medusa-lavender.onrender.com",
      adminCors: process.env.ADMIN_CORS || "https://medusa-lavender.onrender.com",
    },
  },
  admin: {
    disable: false,
    path: "/dashboard", // Đã đổi thành /dashboard để không trùng với /admin của hệ thống
    backendUrl: "https://medusa-lavender.onrender.com"
  }
})
