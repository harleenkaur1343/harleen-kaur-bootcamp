# Task Notes REST API

This project extends the Express foundation server with additional REST APIs for managing tasks.

The API implements full CRUD functionality for tasks, input validation, pagination, filtering, sorting, structured logging, API documentation, and metrics.

---

## Base URL

```
http://localhost:3001
```

---

# Task API

All task endpoints are available under:

```
/api/tasks
```

## Task Object Structure

```
{
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
}
```

`createdAt` is stored as an ISO date string.

---

# Endpoints

## Create Task

```
POST /api/tasks
```

Creates a new task.

### Request Body

```
{
  "title": "Finish REST API",
  "description": "Implement CRUD endpoints",
  "completed": false
}
```

### Response

```
201 Created
```

```
{
  "id": "generated-uuid",
  "title": "Finish REST API",
  "description": "Implement CRUD endpoints",
  "completed": false,
  "createdAt": "2026-03-05T10:00:00.000Z"
}
```

---

## Get All Tasks

```
GET /api/tasks
```

Returns a paginated list of tasks.

### Query Parameters

| Parameter | Description                           |
| --------- | ------------------------------------- |
| page      | Page number (default 1)               |
| limit     | Number of tasks per page (default 10) |
| completed | Filter tasks by completion status     |
| sort      | Sort results (example: createdAt)     |

### Example

```
GET /api/tasks?page=1&limit=5&completed=false
```

### Response

```
{
  "data": [...tasks],
  "meta": {
    "page": 1,
    "limit": 5,
    "total": 20
  }
}
```

---

## Get Single Task

```
GET /api/tasks/:id
```

Returns a specific task.

### Response

```
200 OK
```

```
{
  "id": "1",
  "title": "Finish Express project",
  "description": "Add REST API",
  "completed": false,
  "createdAt": "2026-03-05T10:00:00.000Z"
}
```

---

## Update Task

```
PUT /api/tasks/:id
```

Updates an existing task.

### Request Body

```
{
  "title": "Updated title",
  "completed": true
}
```

### Response

```
200 OK
```

Returns the updated task.

---

## Delete Task

```
DELETE /api/tasks/:id
```

Deletes a task.

### Response

```
204 No Content
```

---

# Input Validation

All incoming request bodies are validated using Zod schemas.

Invalid requests return structured validation errors.

---

# Error Handling

Errors follow the RFC7807 Problem Details format.

Example:

```
{
  "type": "about:blank",
  "title": "Validation Error",
  "status": 400,
  "detail": "Invalid request body",
  "instance": "/api/tasks"
}
```

---

# Structured Logging

Each request logs structured information including:

* request ID
* HTTP method
* request path
* response status
* request latency

Example log:

```
{
  "requestId": "abc123",
  "method": "GET",
  "path": "/api/tasks",
  "status": 200,
  "latency": "12ms"
}
```

---

# API Documentation

Interactive API documentation is available at:

```
/docs
```

This endpoint exposes OpenAPI documentation for testing and exploring API routes.

---

# Metrics Endpoint

Basic server metrics are available at:

```
/metrics
```

Example output:

```
http_requests_total 25
http_requests_success 23
http_requests_error 2
avg_response_time_ms 15
```

---

# Running the Project

Install dependencies

```
pnpm install
```

Run development server

```
pnpm dev
```

Build project

```
pnpm build
```

Start production server

```
pnpm start
```

---

# Features Implemented

* REST API for tasks
* Full CRUD operations
* Request validation using Zod
* Pagination, filtering, and sorting
* RFC7807 structured error responses
* Structured request logging
* OpenAPI documentation endpoint
* Metrics endpoint
