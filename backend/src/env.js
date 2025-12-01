export const env = {
  accessSecret: process.env.ACCESS_TOKEN_SECRET || "dev_access_secret",
  refreshSecret: process.env.REFRESH_TOKEN_SECRET || "dev_refresh_secret",
  // Aceita valores em texto como "15m" ou números (segundos)
  accessTtl: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  refreshTtl: process.env.JWT_REFRESH_EXPIRES_IN || "8h",
  simulatorUrl: process.env.SIMULATOR_URL || "",
};
