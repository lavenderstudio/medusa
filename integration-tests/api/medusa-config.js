const { Modules } = require("@medusajs/utils")

const DB_URL = process.env.DATABASE_URL 
const enableMedusaV2 = process.env.MEDUSA_FF_MEDUSA_V2 === "true" || true

module.exports = {
  admin: {
    // Để false để Render build giao diện quản trị cho Lavender Prime Studio
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true" || false,
    backendUrl: process.env.MEDUSA_BACKEND_URL || "https://medusa-lavender.onrender.com"
  },
  projectConfig: {
    databaseUrl: DB_URL,
    databaseType: "postgres",
    databaseExtra: { 
      ssl: { rejectUnauthorized: false } 
    },
    http: {
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7000,https://medusa-lavender.onrender.com",
    },
  },
  featureFlags: {
    medusa_v2: enableMedusaV2,
  },
  modules: {
    [Modules.AUTH]: true,
    [Modules.USER]: {
      scope: "internal",
      resolve: "@medusajs/user",
      options: {
        jwt_secret: process.env.JWT_SECRET,
      },
    },
    [Modules.CACHE]: {
      resolve: "@medusajs/cache-inmemory",
      options: { ttl: 0 },
    },
    [Modules.FILE]: {
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            // SỬA Ở ĐÂY: Bỏ @medusajs/ nếu bạn dùng package medusa-file-cloudinary
            resolve: "medusa-file-cloudinary",
            id: "cloudinary",
            options: {
              cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
              api_key: process.env.CLOUDINARY_API_KEY,
              api_secret: process.env.CLOUDINARY_API_SECRET,
              secure: true,
            },
          },
        ],
      },
    },
    [Modules.PRODUCT]: true,
    [Modules.PRICING]: true,
    [Modules.PROMOTION]: true,
    [Modules.REGION]: true,
    [Modules.CUSTOMER]: true,
    [Modules.SALES_CHANNEL]: true,
    [Modules.CART]: true,
    [Modules.WORKFLOW_ENGINE]: true,
    [Modules.API_KEY]: true,
    [Modules.STORE]: true,
    [Modules.TAX]: true,
    [Modules.CURRENCY]: true,
    [Modules.ORDER]: true,
    [Modules.PAYMENT]: {
      resolve: "@medusajs/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/payment-manual",
            id: "manual",
          }
        ],
      },
    },
    [Modules.FULFILLMENT]: {
      resolve: "@medusajs/fulfillment",
      options: {
        providers: [
          {
            resolve: "@medusajs/fulfillment-manual",
            id: "manual",
          }
        ],
      },
    },
    [Modules.NOTIFICATION]: {
      resolve: "@medusajs/notification",
      options: {
        providers: [
          {
            resolve: "@medusajs/notification-local",
            id: "local",
            options: {
              channels: ["log"],
            },
          },
        ],
      },
    },
  },
}
