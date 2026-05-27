import "./config/env";
import app from "./app";
import { env } from "./config/env";
import prisma from "./config/prisma";

const start = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();
