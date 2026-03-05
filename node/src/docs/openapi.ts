import swaggerJSDoc from "swagger-jsdoc";

export const openapiSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task API",
      version: "1.0.0",
      description: "Simple task management API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Task: {
          type: "object",
          properties: {
            id: { type: "string", example: "t1" },
            title: { type: "string", example: "Learn Node.js" },
            completed: { type: "boolean", example: false },
            userId: { type: "string", example: "u1" },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        CreateTaskInput: {
          type: "object",
          required: ["title", "userId"],
          properties: {
            title: { type: "string", example: "Write API docs" },
            userId: { type: "string", example: "u1" },
          },
        },
      },
    },
  },

  apis: ["src/routes/*.ts"],
  paths: {
    "/tasks": {
      post: {
        summary: "Create a task",
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
            description: "Task created",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Task",
                },
              },
            },
          },
        },
      },
    },
  },
  responses: {
    201: {
      description: "Task created",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/Task",
          },
          example: {
            id: "t5",
            title: "Learn OpenAPI",
            completed: false,
            userId: "u1",
            createdAt: "2026-03-05T10:00:00Z",
          },
        },
      },
    },
  }, // where swagger comments live
});
