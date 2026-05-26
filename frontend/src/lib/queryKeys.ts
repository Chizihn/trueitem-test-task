export const queryKeys = {
  tasks: (clientId: string, page: number) => ["tasks", clientId, page],

  tasksByClient: (clientId: string) => ["tasks", clientId],
};
