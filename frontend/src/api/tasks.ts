import type { PaginatedResponse, Task } from "../types";
import api from "./api";

const tasksService = {
  getTasks: async (page = 1, limit = 10): Promise<PaginatedResponse<Task>> => {
    const response = await api.get<PaginatedResponse<Task>>("/tasks", {
      params: { page, limit },
    });
    return response.data;
  },

  createTask: async (title: string): Promise<Task> => {
    const response = await api.post<Task>("/tasks", { title });
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  toggleTask: async (id: string, completed: boolean): Promise<Task> => {
    const response = await api.patch<Task>(`/tasks/${id}`, { completed });
    return response.data;
  },
};

export default tasksService;
