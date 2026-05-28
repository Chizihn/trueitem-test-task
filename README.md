# Todo Task

A full-stack, type-safe Task (Todo) management application designed with a **monorepo-style** layout. It leverages a unique **Zero-Auth Client Isolation** architecture to separate tasks across different browser instances or devices without requiring a full sign-in/identity provider flow.

---

## Architecture Overview

The application is structured into two main components:
1. **Frontend**: A high-performance, single-page React app built with Vite, styled with TailwindCSS, and managed using Zustand and TanStack React Query.
2. **Backend**: A modular Express REST API built with Node.js & TypeScript, using Prisma ORM to interact with a PostgreSQL database, documented interactively with Swagger UI.

### Zero-Auth Client Isolation
To provide immediate utility without the overhead of user sign-up/login:
* When a user visits the site, the frontend checks `localStorage` for a unique client identifier (`todo-client-id`).
* If not found, it generates a fresh **cryptographically secure UUIDv4** and saves it.
* Every API request to fetch or create tasks attaches this `clientId` as a query parameter or body payload.
* The backend PostgreSQL database indexes tasks by `clientId`, allowing complete data isolation between different clients.

---

## Project Directory Structure

```directory
trueitem-test-task/
├── backend/                # Express API with Prisma & Postgres
│   ├── prisma/             # Schema definitions and migrations
│   ├── src/                # TypeScript Source files (modular design)
│   └── tests/              # Jest & Supertest API tests
├── frontend/               # React (Vite) + Tailwind CSS Single-Page App
│   ├── public/             # Static assets
│   └── src/                # TypeScript React application
│       ├── api/            # Axios API client & services
│       ├── components/     # Reusable UI components
│       ├── hooks/          # React hooks (useTasks)
│       └── store/          # Zustand client store
└── README.md               # Master Documentation (This file)
```

---

## Quick Start (Complete Stack)

To run the entire system locally, follow these 4 simple steps:

### Spin up the PostgreSQL Database
Make sure you have Docker installed. Navigate to the `backend` folder and start the database:
```bash
cd backend
docker-compose up -d
```
*This starts a PostgreSQL instance on port `5432`.*

### Configure & Migrate the Backend
In the `backend` folder, install the dependencies, apply the Prisma database migrations, and generate the Prisma Client:
```bash
# Install packages
npm install

# Run database migrations
npm run db:migrate

# Generate the Prisma client
npm run db:generate
```

### Start the Backend Server
Start the Express API server in development mode:
```bash
npm run dev
```
*The server will start running at [http://localhost:4000](http://localhost:4000).*

### Install and Launch the Frontend
In a new terminal window, navigate to the `frontend` folder, install dependencies, and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
*The React application will launch at [http://localhost:5173](http://localhost:5173).*

---

## Running the Test Suite

The backend contains a robust integration test suite verifying the REST API contracts, error boundaries, and input validation schemas.

To run the tests:
```bash
cd backend
npm run test
```

---

## Tech Stack Matrix

* **Frontend**: React 19, Vite, TypeScript, TailwindCSS, Zustand, Axios, TanStack React Query v5, Lucide Icons.
* **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Zod Validation, Winston Logger, Swagger UI.
* **Testing**: Jest, Supertest.
