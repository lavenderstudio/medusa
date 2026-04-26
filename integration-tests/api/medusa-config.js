const { Modules } = require("@medusajs/utils")

// Render dùng DATABASE_URL trực tiếp từ Neon
const DB_URL = process.env.DATABASE_URL 

process.env.LOG_LEVEL = "error"
const enableMedusaV2 = process.env.MEDUSA_FF_MEDUSA_V2 === "true" || true

const customPaymentProvider = {
  resolve: {
    services: [require("@medusajs/payment/dist/providers/system").default],
  },
  id: "default_2",
}

const customFulfillmentProvider = {
  resolve: "@medusajs/fulfillment-manual",
  id: "test-provider",
}

module.exports = {
  admin: {
    // Nếu bạn muốn dùng giao diện quản trị, hãy đổi true thành false
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true" || true,
  },
  plugins: [],
  projectConfig: {
    databaseUrl: DB_URL,
    databaseType: "postgres",
    // Cấu hình bắt buộc để kết nối Neon.tech từ Render
    databaseExtra: { 
      ssl: { rejectUnauthorized: false } 
    },
    http: {
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
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
            // Cấu hình Cloudinary để lưu và xử lý Mockup
            resolve: "@medusajs/file-cloudinary",
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
    [Modules.STOCK_LOCATION]: { resolve: "@medusajs/stock-location", options: {} },
    [Modules.INVENTORY]: { resolve: "@medusajs/inventory", options: {} },
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
        providers: [customPaymentProvider],
      },
    },
    [Modules.FULFILLMENT]: {
      options: {
        providers: [customFulfillmentProvider],
      },
    },
    [Modules.NOTIFICATION]: {
      options: {
        providers: [
          {
            resolve: "@medusajs/notification-local",
            id: "local-notification-provider",
            options: {
              name: "Local Notification Provider",
              channels: ["log", "email"],
            },
          },
        ],
      },
    },
  },
}
