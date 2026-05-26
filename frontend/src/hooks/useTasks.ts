import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import tasksService from "../api/tasks";

export const useTasks = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState<number>(1);

  const tasksQuery = useQuery({
    queryKey: ["tasks", page],
    queryFn: () => tasksService.getTasks(page),
  });

  const addTask = useMutation({
    mutationFn: (title: string) => tasksService.createTask(title),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const removeTask = useMutation({
    mutationFn: (id: string) => tasksService.deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const toggleTask = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      tasksService.toggleTask(id, completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return {
    tasks: tasksQuery.data?.data ?? [],
    total: tasksQuery.data?.total ?? 0,
    page,
    setPage,
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    addTask,
    removeTask,
    toggleTask,
  };
};
