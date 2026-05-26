// src/api/tasks.ts
import type { Task } from "../types";
import api from "./api";

export const getTasks = (): Promise<Task[]> =>
  api.get<Task[]>("/tasks").then((r) => r.data);

export const createTask = (title: string): Promise<Task> =>
  api.post<Task>("/tasks", { title }).then((r) => r.data);

export const deleteTask = (id: string): Promise<void> =>
  api.delete(`/tasks/${id}`).then((r) => r.data);

export const toggleTask = (id: string, completed: boolean): Promise<Task> =>
  api.patch<Task>(`/tasks/${id}`, { completed }).then((r) => r.data);
