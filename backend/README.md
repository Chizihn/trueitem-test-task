# Backend API Service

A modern, highly structured REST API built using **Node.js**, **Express**, **TypeScript**, and **Prisma ORM** backed by a **PostgreSQL** database. The service features automatic input validation via **Zod**, custom global error handling, structural request logging with **Winston**, and integration test coverage.

---

## Key Features

* **Modular Domain Architecture**: The codebase is partitioned by domains (e.g., the `task` module) separating routes, controllers, services, and validation schemas cleanly.
* **Prisma ORM**: Modern database client mapping for PostgreSQL with custom schema files and automated migrations.
* **Indexed Client Isolation**: High performance query fetching using custom indices (`@@index([clientId])`) in PostgreSQL, allowing task separation across thousands of virtual client spaces.
* **Payload Validation**: Standard middleware using **Zod** schema parsers to reject malformed payloads before request controller execution.
* **Structured Logging**: Context-rich Winston logging reporting HTTP verbs, request execution latency, status codes, and environment states.
* **Unified Error Mapping**: Centralized middleware parsing error stack traces, resolving custom `ApiError` patterns, and mapping appropriate REST HTTP codes.
* **End-to-End Test Suite**: Complete integration tests utilizing **Jest** and **Supertest** to mock REST requests and validate database CRUD behavior.

---

## Technology Stack

* **Runtime & Language**: Node.js, TypeScript (v5.5.4), `tsx` (for fast live-reloading)
* **Web Framework**: Express (v4)
* **Database & ORM**: PostgreSQL, Prisma (v6.16.0)
* **Validation**: Zod (v4.4.3)
* **Logging**: Winston logger middleware
* **Testing**: Jest (v30), Supertest (v7.2)

---

## Core Directory Structure

```directory
backend/
├── prisma/                 # Database tier
│   ├── migrations/         # SQL migration files
│   └── schema.prisma       # Database design model mapping
├── src/
│   ├── app.ts              # Express application setup and middleware chaining
│   ├── server.ts           # Bootstrapping and network listener activation
│   ├── config/             # Config system (Environment & Prisma Client hubs)
│   ├── middlewares/        # Express standard middlewares
│   │   ├── errorHandler.ts # Custom exception interceptor
│   │   ├── logger.ts       # Winston logger setup
│   │   └── validate.ts     # Zod schema validation middleware
│   ├── modules/            # Domain models (Modular approach)
│   │   └── task/           # Task domain files
│   │       ├── index.ts
│   │       ├── task.controller.ts # Request controller maps
│   │       ├── task.service.ts    # Service/ORM transactions
│   │       ├── task.validate.ts   # Zod validations schemas
│   │       └── tasks.route.ts     # Express routes registrations
│   └── utils/              # Shared helper modules (ApiError, etc.)
└── tests/                  # Jest & Supertest integration tests
```

---

## Database Schema Model

The database holds a central `Task` schema defined in `prisma/schema.prisma`:

```prisma
model Task {
  id        String   @id @default(uuid())
  title     String
  completed Boolean  @default(false)
  clientId  String
  createdAt DateTime @default(now())

  @@index([clientId])
}
```

> [!NOTE]
> The `@@index([clientId])` config creates a database B-Tree index on PostgreSQL, ensuring that filtering tasks for a specific client is always fast (O(log N)), even as the number of tasks in the database grows.

---

## API Documentation

The backend service includes built-in interactive **Swagger API Documentation**. When the server is running, you can access the interactive UI to test all HTTP endpoints directly from your browser:
* **Interactive UI Route**: [http://localhost:4000/docs](http://localhost:4000/docs)

All routes are registered under the `/tasks` namespace:

### `GET /tasks`
Retrieves a paginated list of tasks filtered by `clientId`.
* **Query Parameters**:
  * `clientId` (string, required): The unique client UUID.
  * `page` (number, optional, default: `1`): The page index.
  * `limit` (number, optional, default: `10`): Max tasks per page.
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "e305e94b-d54b-4fc8-9f20-1a7ee5f79a9b",
      "title": "Build premium documentation",
      "completed": false,
      "clientId": "c19b-23f4-49ab",
      "createdAt": "2026-05-28T12:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

### `POST /tasks`
Creates a brand new task.
* **Request Body**:
```json
{
  "clientId": "c19b-23f4-49ab",
  "title": "Explore Prisma studio"
}
```
* **Success Response (201 Created)**:
```json
{
  "success": true,
  "data": {
    "id": "7df41eb5-51fb-449e-b816-831ea236021f",
    "title": "Explore Prisma studio",
    "completed": false,
    "clientId": "c19b-23f4-49ab",
    "createdAt": "2026-05-28T12:05:00.000Z"
  }
}
```

### `PATCH /tasks/:id`
Toggles a task's completion status.
* **Request Body**:
```json
{
  "completed": true
}
```
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "id": "7df41eb5-51fb-449e-b816-831ea236021f",
    "title": "Explore Prisma studio",
    "completed": true,
    "clientId": "c19b-23f4-49ab",
    "createdAt": "2026-05-28T12:05:00.000Z"
  }
}
```

### `DELETE /tasks/:id`
Deletes a task by ID.
* **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## 🔧 Installation & Local Setup

### Run Database Container
Make sure Docker is running on your machine, then run:
```bash
docker-compose up -d
```
*This will pull PostgreSQL 16 Alpine and run it on port `5432`.*

### Environment Variables
Prepare your `.env` file (preloaded at path `backend/.env`):
```env
DATABASE_URL="postgresql://postgres:Chiboy8341@localhost:5432/trueitem?schema=public"
PORT=4000
NODE_ENV=development
```

### Set Up DB Schemas
Apply database schema migrations and construct standard types:
```bash
npm install
npm run db:migrate
npm run db:generate
```

### Start Development Server
```bash
npm run dev
```
The API is now running locally on **[http://localhost:4000](http://localhost:4000)**!

### Launch Interactive DB Viewer
Prisma Studio provides a gorgeous browser GUI to directly view, delete, or create rows in your Postgres DB:
```bash
npm run db:studio
```
*This opens a database UI in your browser at [http://localhost:5555](http://localhost:5555).*

---

## Integration Testing

The backend includes comprehensive integration tests. 

To run the entire suite:
```bash
npm run test
```
This runs `jest` using the `tests/tasks.test.ts` file, validating endpoint payloads, edge validation schemas, correct route responses, and error handlers.
