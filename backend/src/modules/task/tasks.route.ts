import { Router } from "express";
import taskController from "./task.controller";
import { validate } from "../../middlewares/validate";
import { createTaskSchema, toggleTaskSchema } from "./task.validate";

const router = Router();

router.get("/", taskController.getTasks);
router.post("/", validate(createTaskSchema), taskController.createTask);
router.patch("/:id", validate(toggleTaskSchema), taskController.toggleTask);
router.delete("/:id", taskController.deleteTask);

export { router as taskRoutes };
