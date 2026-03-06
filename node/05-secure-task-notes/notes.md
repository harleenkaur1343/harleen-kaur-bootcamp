# Task Notes API — Secure REST API

This project extends the 03-express-foundation project, after the **Task Notes REST API** by adding authentication, authorization, database persistence, and production-grade security features.

The API is built using **Node.js, TypeScript, Express, SQLite, and Drizzle ORM**.
It supports task management with **user authentication, role-based access control, and secure endpoints**.

---

# Overview

The API allows users to:

* Register and log in
* Receive a JWT authentication token
* Create, read, update, and delete tasks
* Access tasks based on role permissions
* Query tasks with pagination, filtering, and sorting

The project also includes:

* Input validation
* Structured logging
* API documentation
* Metrics endpoint
* Security middleware
* Graceful shutdown handling

---

# Tech Stack

* Node.js
* TypeScript
* Express
* SQLite
* Drizzle ORM
* better-sqlite3
* Zod
* bcrypt
* JWT
* Helmet
* CORS
* Express Rate Limit

---

# Database

The API uses **SQLite** with **Drizzle ORM**.

## Users Table

```
id INTEGER PRIMARY KEY AUTOINCREMENT
name TEXT NOT NULL
email TEXT UNIQUE NOT NULL
password_hash TEXT NOT NULL
role TEXT DEFAULT 'user'
```

## Tasks Table

```
id TEXT PRIMARY KEY
title TEXT NOT NULL
description TEXT
completed BOOLEAN
created_at TEXT
user_id INTEGER
```

Each task is associated with a user via `user_id`.

---

# Database Initialization

A database initialization script prepares the schema for a fresh setup.

Run:

```
pnpm db:init
```

This will create the required tables.

The SQLite database file is excluded from version control via `.gitignore`.

---

# Authentication

The API uses **JWT authentication**.

## User Registration

```
POST /api/auth/register
```

Registers a new user.

Passwords are securely hashed using **bcrypt**.

Example request:

```
{
  "name": "Aruni",
  "email": "aruni@example.com",
  "password": "password123"
}
```

---

## User Login

```
POST /api/auth/login
```

Returns a **JWT token** when credentials are valid.

Example response:

```
{
  "token": "JWT_TOKEN"
}
```

The token includes:

* userId
* role
* expiration (1 hour)

---

# Authorization

Protected routes require a valid token.

Header format:

```
Authorization: Bearer <JWT_TOKEN>
```

Authentication middleware verifies the token and attaches the user to the request.

---

# Role-Based Access Control

The API supports two roles:

### Admin

* Can access all tasks
* Can view tasks created by any user

### User

* Can access only their own tasks

Access control is enforced at the service layer.

---

# Task API

Base route:

```
/api/tasks
```

All task routes require authentication.

---

## Create Task

```
POST /api/tasks
```

Example request:

```
{
  "title": "Finish API project",
  "description": "Complete the backend implementation",
  "completed": false
}
```

---

## List Tasks

```
GET /api/tasks
```

Supports:

* Pagination
* Filtering
* Sorting

Query parameters:

```
?page=1
&limit=10
&completed=true
&sort=createdAt
```

Example response:

```
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25
  }
}
```

---

## Get Task

```
GET /api/tasks/:id
```

Returns a specific task.

Users can only access their own tasks.

---

## Update Task

```
PUT /api/tasks/:id
```

Updates task fields.

---

## Delete Task

```
DELETE /api/tasks/:id
```

Removes the task.

---

# Validation

All input data is validated using **Zod** schemas.

Invalid inputs return structured error responses.

---

# Error Handling

The API returns errors in **RFC 7807 Problem Details format**.

Example error:

```
{
  "type": "about:blank",
  "title": "Validation Error",
  "status": 400,
  "detail": "Invalid request body"
}
```

---

# Security Features

The API includes several security protections.

### Helmet

Adds secure HTTP headers to protect against common vulnerabilities.

### CORS

Controls cross-origin access to the API.

### Rate Limiting

Limits requests per IP to prevent abuse and brute-force attacks.

---

# Logging

The API includes structured request logging.

Each request includes:

* Request ID
* Method
* Path
* Status
* Response time

---

# Metrics Endpoint

The API exposes a basic metrics endpoint.

```
GET /metrics
```

Provides request statistics and response metrics.

---

# API Documentation

OpenAPI documentation is available at:

```
/docs
```

It provides details about all API endpoints and request/response formats.

---

# Graceful Shutdown

The application gracefully shuts down on:

```
SIGINT
SIGTERM
```

During shutdown:

1. HTTP server stops accepting new connections
2. Database connection is closed
3. Process exits safely

This prevents database corruption and ensures a clean shutdown.

---

# Running the Project

Install dependencies:

```
pnpm install
```

Initialize database:

```
pnpm db:init
```

Run development server:

```
pnpm dev
```

Build project:

```
pnpm build
```

Start production server:

```
pnpm start
```

---

# Summary

This project demonstrates a **secure, production-style REST API** with:

* Authentication and JWT authorization
* Role-based access control
* SQLite database with Drizzle ORM
* Input validation
* Secure middleware
* Structured logging
* OpenAPI documentation
* Metrics endpoint
* Graceful shutdown handling

It provides a strong foundation for building scalable backend services using **Node.js and TypeScript**.
