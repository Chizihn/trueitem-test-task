export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Creating task payload
export interface CreateTaskPayload {
  clientId: string;
  title: string;
}

// Toggle task payload
export interface ToggleTaskPayload {
  id: string;
  completed: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
