import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger";
import errorHandler from "./middlewares/errorHandler";
import { taskRoutes } from "./modules/task/tasks.route";
import { env } from "./config/env";
import { requestLogger } from "./middlewares/logger";

const app = express();

app.use(
  cors({
    origin: env.nodeEnv === "development" ? "*" : env.allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());

// Logger middleware
if (env.nodeEnv !== "test") {
  app.use(requestLogger);
}

// Swagger Documentation Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root route health check for pings (Uptime Robot, Render warmups, etc.)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Todo API Service is running.",
    documentation: "/docs",
  });
});

app.use("/tasks", taskRoutes);

// Error middleware
app.use(errorHandler);

export default app;
