import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

function getAllowedOrigins(): string | string[] {
  const origins = process.env.ALLOWED_ORIGINS;
  if (!origins) return "*";
  if (origins.includes(",")) {
    return origins.split(",").map((o) => o.trim());
  }
  return origins.trim();
}

export const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: getEnv("DATABASE_URL"),
  nodeEnv: process.env.NODE_ENV || "development",
  allowedOrigins: getAllowedOrigins(),
  apiUrl: process.env.API_URL || `http://localhost:${process.env.PORT}`,
};
