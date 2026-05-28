import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import tasksService from "../api/tasks";
import { useClientStore } from "../store/clientStore";
import { queryClient, queryKeys } from "../lib";

export const useTasks = () => {
  const clientId = useClientStore((state) => state.clientId);

  const [page, setPage] = useState<number>(1);

  // Fetch client tasks
  const tasksQuery = useQuery({
    queryKey: queryKeys.tasks(clientId, page),
    queryFn: () => tasksService.getTasks(clientId, page),
    placeholderData: (previousData) => previousData,
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: (title: string) =>
      tasksService.createTask({
        clientId,
        title,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", clientId],
      });
    },
  });

  // Delete task mutation
  const removeTaskMutation = useMutation({
    mutationFn: (id: string) => tasksService.deleteTask(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", clientId],
      });
    },
  });

  // Toggle task mutation
  const toggleTaskMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      tasksService.toggleTask({
        id,
        completed,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", clientId],
      });
    },
  });

  return {
    // Data
    tasks: tasksQuery.data?.data ?? [],
    total: tasksQuery.data?.total ?? 0,

    // Pagination
    page,
    setPage,

    // Query state
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    error: tasksQuery.error,
    refetch: tasksQuery.refetch,

    // Mutations
    addTask: addTaskMutation.mutate,
    removeTask: removeTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,

    // Mutation loading states
    isAddingTask: addTaskMutation.isPending,
    isRemovingTask: removeTaskMutation.isPending,
    isTogglingTask: toggleTaskMutation.isPending,

    // Optional access to full mutation objects
    addTaskMutation,
    removeTaskMutation,
    toggleTaskMutation,
  };
};
