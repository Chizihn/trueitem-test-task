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

// Swagger Documentation Route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/tasks", taskRoutes);

// Error middleware
app.use(errorHandler);

// Logger middleware
if (env.nodeEnv !== "test") {
  app.use(requestLogger);
}

export default app;
