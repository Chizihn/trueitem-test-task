import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: getEnv("DATABASE_URL"),
  nodeEnv: process.env.NODE_ENV || "development",
};
