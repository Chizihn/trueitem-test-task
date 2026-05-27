import { type Request, type Response, type NextFunction } from "express";
import taskService from "./task.service";

const taskController = {
  getTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { clientId, page = "1", limit = "10" } = req.query;

      const result = await taskService.getTasks({
        clientId: clientId as string,
        page: Number(page),
        limit: Number(limit),
      });

      res.status(200).json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  },

  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, clientId } = req.body;
      const task = await taskService.createTask(clientId, title);
      res.status(201).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },

  toggleTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { completed } = req.body;
      const task = await taskService.toggleTask(id as string, completed);
      res.status(200).json({ success: true, data: task });
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await taskService.deleteTask(id as string);
      res.status(200).json({ success: true, message: "Task deleted" });
    } catch (error) {
      next(error);
    }
  },
};

export default taskController;
