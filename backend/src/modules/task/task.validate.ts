import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .max(120, "Title cannot exceed 120 characters")
      .trim(),
    clientId: z.string().uuid("clientId must be a valid UUID"),
  }),
});

export const toggleTaskSchema = z.object({
  body: z.object({
    completed: z.boolean(),
  }),
  params: z.object({
    id: z.string().uuid("Task ID must be a valid UUID"),
  }),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>["body"];
export type ToggleTaskInput = z.infer<typeof toggleTaskSchema>["body"];
