import prisma from "../../config/prisma";
import ApiError from "../../utils/ApiError";

interface GetTasksParams {
  clientId: string;
  page: number;
  limit: number;
}

const taskService = {
  getTasks: async ({ clientId, page, limit }: GetTasksParams) => {
    const skip = (page - 1) * limit;

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: { clientId },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.task.count({
        where: { clientId },
      }),
    ]);

    return {
      data: tasks,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  createTask: async (clientId: string, title: string) => {
    return prisma.task.create({
      data: { title, clientId },
    });
  },

  toggleTask: async (id: string, completed: boolean) => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new ApiError(404, "Task not found");

    return prisma.task.update({
      where: { id },
      data: { completed },
    });
  },

  deleteTask: async (id: string) => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) throw new ApiError(404, "Task not found");

    await prisma.task.delete({ where: { id } });
  },
};

export default taskService;
