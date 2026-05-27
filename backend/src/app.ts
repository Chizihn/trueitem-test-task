import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import { taskRoutes } from "./modules/task/tasks.route";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use("/tasks", taskRoutes);

app.use(errorHandler);

export default app;
