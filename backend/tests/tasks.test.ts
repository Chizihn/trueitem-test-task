jest.mock("../src/config/prisma", () => ({
  task: {
    findMany: jest.fn(),
    count: jest.fn(),
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

import request from "supertest";
import app from "../src/app";
import prisma from "../src/config/prisma";

const mockPrisma = prisma as jest.Mocked<typeof prisma>;

const mockTask = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Test task",
  completed: false,
  clientId: "123e4567-e89b-12d3-a456-426614174001",
  createdAt: new Date().toISOString(),
};

beforeEach(() => jest.clearAllMocks());

// Get tasks mock
describe("GET /tasks", () => {
  it("returns paginated tasks for a clientId", async () => {
    (mockPrisma.task.findMany as jest.Mock).mockResolvedValue([mockTask]);
    (mockPrisma.task.count as jest.Mock).mockResolvedValue(1);

    const res = await request(app)
      .get("/tasks")
      .query({ clientId: mockTask.clientId, page: 1, limit: 10 });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.total).toBe(1);
  });
});

// Create task mock
describe("POST /tasks", () => {
  it("creates a task successfully", async () => {
    (mockPrisma.task.create as jest.Mock).mockResolvedValue(mockTask);

    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test task", clientId: mockTask.clientId });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe("Test task");
  });

  it("returns 400 if title is missing", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ clientId: mockTask.clientId });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Validation error");
  });

  it("returns 400 if clientId is missing", async () => {
    const res = await request(app).post("/tasks").send({ title: "Test task" });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

// Toggle task mock
describe("PATCH /tasks/:id", () => {
  it("toggles a task completed status", async () => {
    (mockPrisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);
    (mockPrisma.task.update as jest.Mock).mockResolvedValue({
      ...mockTask,
      completed: true,
    });

    const res = await request(app)
      .patch(`/tasks/${mockTask.id}`)
      .send({ completed: true });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.completed).toBe(true);
  });

  it("returns 404 if task not found", async () => {
    (mockPrisma.task.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .patch(`/tasks/${mockTask.id}`)
      .send({ completed: true });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Task not found");
  });
});

// Delete task mock
describe("DELETE /tasks/:id", () => {
  it("deletes a task successfully", async () => {
    (mockPrisma.task.findUnique as jest.Mock).mockResolvedValue(mockTask);
    (mockPrisma.task.delete as jest.Mock).mockResolvedValue(mockTask);

    const res = await request(app).delete(`/tasks/${mockTask.id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Task deleted");
  });

  it("returns 404 if task not found", async () => {
    (mockPrisma.task.findUnique as jest.Mock).mockResolvedValue(null);

    const res = await request(app).delete(`/tasks/${mockTask.id}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Task not found");
  });
});
