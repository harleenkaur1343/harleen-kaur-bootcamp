# TypeScript Notes

## Foundations

### Basic Types

**What:** Define the kind of value a variable can hold.  
**Why:** Prevent invalid assignments.  
**When:** For all variables that are part of a contract or unclear from context.

```ts
let age: number;
let name: string;
```

> Types are value filters.

---

### Type Inference

**What:** TypeScript automatically detects types from values.  
**Why:** Cleaner code without losing safety.  
**When:** Default for local variables.

```ts
const total = 100;
```

> Inference for implementation, explicit types for APIs.

---

### Type Assertions

**What:** Override TypeScript's understanding of a type.  
**Why:** Useful when working with DOM or external libraries.  
**When:** Only when you are certain.

```ts
const input = document.querySelector("input") as HTMLInputElement;
```

> You take responsibility for safety.

---

### Type Narrowing

**What:** Convert a union into a specific type using checks.  
**Why:** Enables safe operations on multiple possible types.  
**When:** Whenever using unions.

```ts
if (typeof value === "string") value.toUpperCase();
```

> Runtime checks inform the type system.

---

### Unknown vs Any

**What:** Two ways to handle unknown data.  
**Why:** `unknown` keeps safety, `any` removes it.  
**When:** Use `unknown` for external data.

```ts
let data: unknown;
```

> Unknown = "prove it first".

---

### Strict Mode

**Why:** Forces handling of nulls, undefined, and unsafe assumptions.  
**Outcome:** More compile-time errors → fewer runtime bugs.

---

### Array Types

**What:** Define what kind of elements an array can hold.  
**Why:** Prevent mixed or invalid data.

```ts
const ids: number[] = [1, 2, 3];
```

---

### Object Shape

**What:** Define required and optional fields.  
**Why:** Enforce consistent data structures.

```ts
type User = { id: string; name?: string };
```

---

## Functions & Control Flow

### Function Basics

**What:** Typed inputs and outputs.  
**Why:** Predictable behavior.  
**When:** Always for reusable logic.

```ts
function add(a: number, b: number): number {}
```

> Function = contract.

---

### Optional & Default Parameters

**Why:** Flexible function calls without breaking type safety.

```ts
function greet(name = "guest") {}
```

---

### Rest Parameters

**Why:** Accept multiple values safely.

```ts
function sum(...nums: number[]) {}
```

---

### Function Overloading

**What:** Multiple valid call signatures.  
**Why:** Different input → different return type.

> One implementation, many contracts.

---

### Unions in Functions

**Why:** Handle multiple input types safely.

```ts
function format(value: string | number) {}
```

---

### Control Flow with Types

Types guide which logic path is valid.

> Invalid path → compile-time error.

---

### Higher-Order Functions

**What:** Functions that take or return functions.  
**Why:** Reusable behavior.

```ts
function process(fn: (n: number) => number) {}
```

---

### Callback Typing

**Why:** Ensures caller and implementer agree on data flow.

---

## OOPs

### Class Basics

Used for stateful systems with controlled lifecycle.

### Access Modifiers

**Why:** Protect internal state.

> Public → API | Private → implementation

### Getters & Setters

**Why:** Add validation without changing how the property is used.

### Static Members & Factory Functions

**Why:** Controlled object creation and shared utilities.

### Inheritance vs Composition

- **Inheritance:** fixed hierarchy
- **Composition:** flexible and scalable

> Rule: Prefer composition for real systems.

### Abstract Contracts

**What:** Define what must exist.  
**Why:** Enforce consistent architecture.

### Generic Classes & Invariants

**Why:** Reusable classes that maintain valid internal state.

---

## Generics

### Generic Functions

**What:** Logic that works for many types.  
**Why:** Reuse + exact return types.

```ts
function identity<T>(value: T): T {}
```

---

### Constraints

**Why:** Require certain properties.

```ts
<T extends { id: string }>
```

---

### Default Type Parameters

**Why:** Make generics easier to use.

---

### Keyof & Lookup Types

**Why:** Link types together instead of duplicating.

```ts
type Id = User["id"];
```

---

### Mapped Types

**What:** Transform existing types.

> Type-level loops.

---

### Conditional Types

**What:** Types that change based on input.

---

### Utility Types

**Why:** Common transformations without rewriting logic.

---

## Advanced Types

### Union Types

A value can be one of several types.

### Intersection Types

Combine multiple requirements.

### Discriminated Unions

Best for: API states & state machines.

> Each state has a unique tag → exhaustive checking.

### Type Guards

Runtime checks that inform TypeScript.

### Template Literal Types

Create types from string patterns.

### Recursive Types

Used for nested dynamic structures (e.g., JSON).

---

## Async & Concurrency

### Promise Fundamentals

Represents a future value.

### async / await

Write async logic in readable sequential style.

### Sequential vs Parallel

- **Sequential** → order matters
- **Parallel** → performance matters

### Timeouts

Prevent infinite waiting.

### Retries with Backoff

Handle temporary failures safely.

### Cancellation

Stop work that is no longer needed.

### Concurrency Limits

Control how many async tasks run at once.

> Queue extra work → protect resources.

### Error Handling Patterns

Errors should be: typed, predictable, handled at the right layer.

### Fire-and-Forget

Background tasks that must still log failures.

### Typing Async APIs

External data is untrusted → must be typed and validated.

## Modules

- Common JS and ES Modules

  **Common JS** -
  - Node’s original module system
  - Loads modules dynamically at runtime - even inside the if statements - **loads synchronously which is blocking**

- ESModules
  - import {express} from ‘express’ -
  - export function fetchUser() {}
  - Imports are static and at top of the file - no dynamic loading
  - Known at compile time as they are static, bundlers can analyse exactly what to use and drop the rest
  - CJS - is dynamic so they have to include everything
  - TypeScript and your IDE can better understand static imports, giving smarter autocomplete and catching errors earlier.
  - Loads asynchronously (non-blocking)
  - In package.json - “type” : “module” and in tsconfig.json - module : ESNext
- Private registries and scoped packages

  **Scoped Packages**
  - Packages which belong to a org or a user
  - prefixed with @ - like types/node - @company/ui-librry
  - @scope - groups the related packages, prevents naming conflicts
  - For eg 2 companies have same utils package but can diff using @com1/utils and @com2/utils

  **Private registries**
  - By default pnpm pulls packages from the public npm registry (registry.npm.org)
  - For company internal packages, are hosted in private registries (not puclic)
  - .npmrc - config file which tells pnpm from where to download the packages, npm register and the website links for a scoped package
  - ```markdown
    .npmrc
    registry=https://registry.npmjs.org # default public registry
    tell pnpm to fetch @mycompany packages from private registry
    @mycompany:registry=https://npm.mycompany.com
    auth token for private registry
    [//npm.mycompany.com/:\_authToken=your-secret-token](https://npm.mycompany.com/:_authToken=your-secret-token)
    ```

- Monorepos

  Monorepo - single git repo contains multiple packages
  - polyrepo
  - github/mycompany/frontend ← separate repo
    github/mycompany/backend ← separate repo
    github/mycompany/ui-library ← separate repo
    github/mycompany/shared-types ← separate repo
  - Monorepo
  - github/mycompany/everything
    packages/
    frontend/
    backend/
    ui-library/
    shared-types/

  Benfits of monorepos
  - Shared code for frontend and backend
  - No need to coordinate changes across multiple repos
  - One eslint config, one TypeScript config, one CI pipeline for everything.

  Cons
  - Large size
  - Complex struct

## Ecosystem Toolkit

### Commander.js — CLI Builder
**What:** Library for creating command-line interfaces.
**Why:** Parses arguments, provides subcommands, help, and validation.
**When:** Any time you build a production-grade CLI.

```ts
program.command("users:import")
```

> It turns terminal input into structured function calls.

---

### yaml — YAML Parsing
**What:** Convert YAML ↔ JavaScript objects.
**Why:** Human-readable configuration files.
**When:** Config files, workflows, metadata.

> YAML = config for humans.

---

### fs-extra — File Utilities
**What:** Better `fs` with promises + extra helpers.
**Why:** Simplifies file handling and ensures directories exist.
**When:** Reading/writing JSON, copying files, bootstrapping data.

> Safe and convenient file system operations.

---

### lowdb — Lightweight JSON DB
**What:** Local JSON-based database.
**Why:** Simple persistence without a real DB.
**When:** Prototyping, small tools, caching.

> Your JS object saved to disk.

---

### better-sqlite3 — SQLite Client
**What:** Fast synchronous SQLite driver.
**Why:** Reliable local database with zero setup.
**When:** Real persistence for CLI tools or local apps.

> Direct, fast SQL access from Node.

---

### drizzle-orm — Type-Safe ORM
**What:** SQL with full TypeScript safety.
**Why:** Schema → types → queries all connected.
**When:** When you want SQL + type safety + migrations.

> Your database becomes part of your type system.

---

### dotenv — Environment Loader
**What:** Loads `.env` into `process.env`.
**Why:** Keep secrets and config outside code.
**When:** Any app with environment-based config.

> Config depends on environment, not source code.

---

### zod — Schema Validation
**What:** Runtime validation with static type inference.
**Why:** External data is untrusted.
**When:** APIs, CLI input, config files, CSV/JSON parsing.

```ts
schema.parse(data)
```

> Validate once → trust everywhere.

---

### pino — Structured Logging
**What:** High-performance JSON logger.
**Why:** Log levels, machine-readable logs, production-ready.
**When:** Any serious application.

> Logs are data, not console text.

---

### date-fns — Date Utilities
**What:** Small, pure functions for date operations.
**Why:** Native Date is hard to use correctly.
**When:** Formatting, parsing, date math.

> Each function does one safe date operation.

---

### nanoid — Unique IDs
**What:** Generates short, collision-resistant IDs.
**Why:** Safer and smaller than UUID for many use cases.
**When:** File names, DB keys, request IDs.

```ts
nanoid()
```

> Fast unique identifiers without a database.

---

### csv-parse / csv-stringify — CSV Handling
**What:** Convert CSV ↔ structured data.
**Why:** CSV is a common data exchange format.
**When:** Import/export pipelines.

> Structured rows → typed objects → validated → stored.

---

TypeScript helps you:

- Make invalid states impossible
- Move bugs to compile time
- Design clear data contracts
- Refactor safely
- Scale code confidently


