# Database Operations Toolkit

A production-ready database operations toolkit for applications using PostgreSQL and TypeScript.

This project provides scripts, monitoring tools, testing infrastructure, and operational utilities required to manage a relational database in development and production environments.

---

# Features

### Core Database Scripts

* Create database and user
* Run migrations
* Seed development data
* Reset database
* Backup and restore database

### Testing Infrastructure

* SQLite test database configuration
* Test data factories with realistic relationships
* Integration test setup and teardown helpers
* Performance benchmarking tests

### Monitoring & Operations

* Database health check endpoint
* Query performance logging
* PostgreSQL metrics collection
* Admin monitoring dashboard

### Environment Support

* Development database configuration
* Test database setup
* Production configuration
* Docker database setup

---

# Tech Stack

Database:

* PostgreSQL

Backend:

* Node.js
* TypeScript

Testing:

* Vitest
* SQLite (test environment)

Infrastructure:

* Docker

Package Manager:

* pnpm

---

# Project Structure

```
04-db-operations-toolkit

src/
   db/
       config.ts
       connection.ts
       migrations/
       seeds/

   monitoring/
       db-health.ts
       metrics.ts
       slow-query-logger.ts

   admin/
       db-status.route.ts
       db-status.view.ts

scripts/
   db/
       create-db.ts
       migrate.ts
       seed.ts
       reset.ts
       backup.ts
       restore.ts

tests/
   helpers/
       setup.ts
       test-db.ts
       factories/

   performance/
       db-benchmark.test.ts

docker/
   docker-compose.yml

README.md
```

---

# Installation

Clone the repository.

```
git clone <repository-url>
cd db/04-db-operations-toolkit
```

Install dependencies.

```
pnpm install
```

---

# Environment Configuration

Create environment files:

```
.env.development
.env.test
.env.production
```

Example configuration:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=toolkit_dev
```

Environment is selected using:

```
NODE_ENV=development
NODE_ENV=test
NODE_ENV=production
```

---

# Running PostgreSQL with Docker

Start the database container.

```
docker compose -f docker/docker-compose.yml up
```

This launches a PostgreSQL container with persistent storage.

---

# Database Scripts

Create database and user:

```
pnpm db:create
```

Run migrations:

```
pnpm db:migrate
```

Seed development data:

```
pnpm db:seed
```

Reset database:

```
pnpm db:reset
```

Create database backup:

```
pnpm db:backup
```

Restore from backup:

```
pnpm db:restore <file>
```

Backups are timestamped and stored for recovery purposes.

---

# Monitoring Dashboard

The system includes a monitoring dashboard for observing database health and performance.

Open in browser:

```
http://localhost:3000/admin/db-status
```

The dashboard displays:

* Database health status
* Query latency
* Active connections
* Transaction statistics
* Cache metrics

---

# Database Health Check

Health checks run a lightweight query to verify database connectivity.

Example response:

```
{
  status: "healthy",
  latency: "3ms"
}
```

This endpoint can be used by load balancers or uptime monitoring tools.

---

# Query Performance Logging

Queries exceeding a threshold are logged as slow queries.

Example log:

```
⚠️ Slow Query Detected
Query: SELECT * FROM tasks
Duration: 134ms
```

This helps detect inefficient database operations.

---

# Testing Infrastructure

The toolkit includes a complete testing environment.

Testing uses:

* SQLite in-memory database
* Vitest test runner
* Test factories for generating realistic data

Run tests:

```
pnpm test
```

---

# Test Data Factories

Factories create consistent test data for integration tests.

Examples:

* user.factory.ts
* project.factory.ts
* task.factory.ts

These simulate real database relationships.

---

# Performance Benchmarks

Performance tests measure database throughput and latency.

Run benchmark tests:

```
pnpm vitest tests/performance
```

Example benchmark:

Insert 10,000 tasks

Result:

```
Insert time: ~59ms
```

---

# Optimization Techniques

The following optimizations are useful:

Indexes:

```
CREATE INDEX idx_tasks_project
ON tasks(project_id);
```

Batch inserts using transactions.

Connection pooling to limit open connections.

Monitoring slow queries.

---

# Backup Strategy

Database backups are created using timestamped files.

Example backup name:

```
backup-2026-03-11.sql
```

Backups can be restored using:

```
pnpm db:restore backup-file.sql
```

Regular backups protect against data loss.

---

# Development Workflow

Typical workflow:

Start database


```
docker compose -f docker/ocker-compose.yml up
docker exec -it toolkit_db psql -U postgres -d toolkit_dev
```

Run migrations

```
pnpm db:migrate
```

Seed development data

```
pnpm db:seed
```

Run application server

```
pnpm dev
```

Run tests

```
pnpm test
```

---

# Production Considerations

Recommended production practices:

* Use connection pooling
* Enable PostgreSQL query logging
* Schedule automated backups
* Monitor slow queries
* Restrict database credentials
* Use separate environments for development, testing, and production

---

# Deliverables Implemented

This toolkit implements the following required components:

Core Scripts

* Database creation
* Migration system
* Seed data loading
* Backup and restore

Testing Infrastructure

* SQLite test environment
* Test factories
* Integration tests
* Performance benchmarks

Monitoring & Operations

* Health check endpoint
* Query performance logging
* Metrics collection
* Admin monitoring dashboard

Environment Support

* Development configuration
* Test configuration
* Production configuration
* Docker database setup

---

# Conclusion

This project demonstrates how to build a complete database operations toolkit around PostgreSQL. It includes automation scripts, monitoring tools, testing infrastructure, and operational practices used in real production systems.
