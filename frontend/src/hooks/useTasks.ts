import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, createTask, deleteTask } from "../api/tasks";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const tasks = useQuery({ queryKey: ["tasks"], queryFn: getTasks });

  const add = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const remove = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return { tasks, add, remove };
};
