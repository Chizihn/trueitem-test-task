import type { JsonObject } from "swagger-ui-express";
import { env } from "./env";

export const swaggerDocument: JsonObject = {
  openapi: "3.0.0",
  info: {
    title: "Todo Task API",
    version: "1.0.0",
    description: "Interactive Swagger API documentation for the Todo Manager.",
  },
  servers: [
    {
      url: env.apiUrl,
      description: "Local Development Server",
    },
  ],
  paths: {
    "/tasks": {
      get: {
        summary: "Get paginated tasks for a client",
        description: "Fetches a paginated list of tasks filtered by a specific client's unique UUID.",
        parameters: [
          {
            name: "clientId",
            in: "query",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
            description: "Unique identifier for the client session (UUIDv4 format).",
          },
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              default: 1,
            },
            description: "The page number to fetch.",
          },
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
              default: 10,
            },
            description: "Maximum number of tasks to return per page.",
          },
        ],
        responses: {
          200: {
            description: "A paginated list of tasks.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PaginatedTasks",
                },
              },
            },
          },
          400: {
            description: "Invalid query parameters.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a new task",
        description: "Creates a new task associated with a specific client.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateTaskInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "The task was successfully created.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SingleTaskResponse",
                },
              },
            },
          },
          400: {
            description: "Malformed body or failed Zod validation.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/tasks/{id}": {
      patch: {
        summary: "Toggle task status",
        description: "Updates the completion status (completed) of a specific task.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
            description: "The unique UUID of the task to update.",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ToggleTaskInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "The task was successfully updated.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SingleTaskResponse",
                },
              },
            },
          },
          400: {
            description: "Malformed body or invalid UUID format.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Task with the specified ID could not be found.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Delete a task",
        description: "Removes a specific task permanently from the database.",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "string",
              format: "uuid",
            },
            description: "The unique UUID of the task to delete.",
          },
        ],
        responses: {
          200: {
            description: "Task was successfully deleted.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Task deleted successfully",
                    },
                  },
                },
              },
            },
          },
          404: {
            description: "Task with the specified ID could not be found.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: {
            type: "string",
            format: "uuid",
            example: "d3b07384-d113-4956-a5ea-e1dd5b9d5c4d",
          },
          title: {
            type: "string",
            example: "Complete coding assessment",
          },
          completed: {
            type: "boolean",
            example: false,
          },
          clientId: {
            type: "string",
            format: "uuid",
            example: "7e50529e-9d29-4cc4-b49b-7cc20366eb99",
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-05-28T12:00:00.000Z",
          },
        },
      },
      CreateTaskInput: {
        type: "object",
        required: ["clientId", "title"],
        properties: {
          clientId: {
            type: "string",
            format: "uuid",
            example: "7e50529e-9d29-4cc4-b49b-7cc20366eb99",
          },
          title: {
            type: "string",
            minLength: 1,
            example: "Configure Swagger integration",
          },
        },
      },
      ToggleTaskInput: {
        type: "object",
        required: ["completed"],
        properties: {
          completed: {
            type: "boolean",
            example: true,
          },
        },
      },
      SingleTaskResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          data: {
            $ref: "#/components/schemas/Task",
          },
        },
      },
      PaginatedTasks: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          data: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Task",
            },
          },
          total: {
            type: "integer",
            example: 25,
          },
          page: {
            type: "integer",
            example: 1,
          },
          limit: {
            type: "integer",
            example: 10,
          },
          totalPages: {
            type: "integer",
            example: 3,
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Internal Server Error or Validation Failure",
          },
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: {
                  type: "string",
                  example: "title",
                },
                message: {
                  type: "string",
                  example: "Title is required and must not be empty",
                },
              },
            },
          },
        },
      },
    },
  },
};
