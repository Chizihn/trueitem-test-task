import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import { taskRoutes } from "./modules/task/tasks.route";
import { env } from "./config/env";
import { requestLogger } from "./middlewares/logger";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use("/tasks", taskRoutes);

// Error middleware
app.use(errorHandler);

// Logger middleware
if (env.nodeEnv !== "test") {
  app.use(requestLogger);
}

export default app;
