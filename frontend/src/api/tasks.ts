import api from "./api";
import type {
  CreateTaskPayload,
  PaginatedResponse,
  Task,
  ToggleTaskPayload,
} from "../types";

const tasksService = {
  getTasks: async (
    clientId: string,
    page = 1,
    limit = 10,
  ): Promise<PaginatedResponse<Task>> => {
    const response = await api.get<{ success: boolean } & PaginatedResponse<Task>>("/tasks", {
      params: { page, limit, clientId },
    });
    return response.data;
  },

  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await api.post<{ success: boolean; data: Task }>("/tasks", payload);
    return response.data.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  toggleTask: async (payload: ToggleTaskPayload): Promise<Task> => {
    const response = await api.patch<{ success: boolean; data: Task }>(
      `/tasks/${payload.id}`,
      { completed: payload.completed },
    );
    return response.data.data;
  },
};

export default tasksService;
