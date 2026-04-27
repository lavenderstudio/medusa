import { defineConfig } from "@medusajs/utils"

export default defineConfig({
  projectConfig: {
    // Ép port và host chuẩn cho Render
    port: process.env.PORT ? parseInt(process.env.PORT) : 10000,
    databaseUrl: process.env.DATABASE_URL,
    databaseType: "postgres",
    databaseExtra: { 
      ssl: { rejectUnauthorized: false } 
    },
    // Vô hiệu hóa Redis để tránh lỗi "fake redis" trong sản xuất
    redisUrl: process.env.REDIS_URL, 
    http: {
      jwtSecret: process.env.JWT_SECRET || "lavender_prime_secret_2026",
      cookieSecret: process.env.COOKIE_SECRET || "lavender_prime_cookie_2026",
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "https://medusa-lavender.onrender.com",
    },
  },
  admin: {
    disable: false,
    backendUrl: "https://medusa-lavender.onrender.com"
  }
})
