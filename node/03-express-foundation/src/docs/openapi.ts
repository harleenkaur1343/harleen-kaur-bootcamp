export const openapiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Task Notes API",
    version: "1.0.0",
    description: "Simple REST API for managing tasks"
  },

  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server"
    }
  ],

  paths: {
    "/api/tasks": {
      get: {
        summary: "List all tasks",
        tags: ["Tasks"],
        responses: {
          "200": {
            description: "List of tasks",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Task" }
                }
              }
            }
          }
        }
      },

      post: {
        summary: "Create a new task",
        tags: ["Tasks"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string" },
                  description: { type: "string" }
                }
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Task created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" }
              }
            }
          }
        }
      }
    },

    "/api/tasks/{id}": {
      get: {
        summary: "Get task by ID",
        tags: ["Tasks"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": {
            description: "Task found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Task" }
              }
            }
          },
          "404": {
            description: "Task not found"
          }
        }
      },

      put: {
        summary: "Update a task",
        tags: ["Tasks"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Task" }
            }
          }
        },
        responses: {
          "200": {
            description: "Task updated"
          },
          "404": {
            description: "Task not found"
          }
        }
      },

      delete: {
        summary: "Delete a task",
        tags: ["Tasks"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "204": {
            description: "Task deleted"
          },
          "404": {
            description: "Task not found"
          }
        }
      }
    }
  },

  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "1"
          },
          title: {
            type: "string",
            example: "Finish Node assignment"
          },
          description: {
            type: "string",
            example: "Complete REST API drills"
          },
          completed: {
            type: "boolean",
            example: false
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2026-03-05T10:00:00Z"
          }
        }
      }
    }
  }
};