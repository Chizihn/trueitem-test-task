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
    const response = await api.get<PaginatedResponse<Task>>("/tasks", {
      params: { page, limit, clientId },
    });
    return response.data;
  },

  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await api.post<Task>("/tasks", payload);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },

  toggleTask: async (payload: ToggleTaskPayload): Promise<Task> => {
    const response = await api.patch<Task>(
      `/tasks/${payload.id}`,
      payload.completed,
    );
    return response.data;
  },
};

export default tasksService;
