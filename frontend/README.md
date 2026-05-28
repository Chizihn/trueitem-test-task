# 🎨 TrueItem - Frontend Web Application

A premium, single-page client interface built with **React 19**, **Vite**, **TypeScript**, and **TailwindCSS**. It provides a sleek, dark-themed responsive user experience with real-time feedback, optimistic animations, and zero-auth client isolation.

---

## ✨ Features

* **Sleek UI/UX**: Handcrafted dark mode palette (`#0f0f0f` background) with glowing orange accent colors and responsive layouts.
* **Progress Tracking**: Real-time progress bar demonstrating task completion percentage with fluid CSS animations.
* **Task Pagination**: Clean paginated navigation (10 tasks per page) that dynamically updates depending on total records.
* **Zustand State Isolation**: Persistence of browser client ID inside local storage, enabling client isolation instantly.
* **TanStack Query Integrations**: Optimistic feedback, state management, cached page pre-fetching, and instant cache invalidation upon task CRUD operations.
* **Adaptive Skeletons**: Tailored loading skeletons to ensure premium first-paint times and user experience.
* **Strict Type Safety**: Fully typed interfaces from the API models down to component props.

---

## 🛠️ Technology Stack

| Library | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.2.6` | Core UI Component Library |
| **Vite** | `^8.0.12` | Ultra-fast build tool and bundler |
| **TanStack React Query** | `^5.100.14`| Server state management & cache orchestration |
| **Zustand** | `^5.0.13` | Client-side light state management (`clientId`) |
| **Axios** | `^1.16.1` | HTTP Request client with custom interceptors |
| **TailwindCSS** | `^3.4.19` | Utility-first responsive CSS styling |
| **Lucide React** | `^1.16.0` | Elegant SVG iconography |

---

## 📂 Directory Layout

```directory
frontend/
├── public/                 # Static assets (favicons, etc.)
└── src/
    ├── api/                # API communication tier
    │   ├── api.ts          # Axios configuration & interceptors
    │   ├── index.ts        # Service hub
    │   └── tasks.ts        # CRUD functions to interface with backend
    ├── assets/             # Global visual assets
    ├── components/         # Visual widgets
    │   ├── ui/             # Core atomic design elements (e.g. Button)
    │   ├── TaskForm.tsx    # Add new task form input
    │   ├── TaskList.tsx    # Task items list & interactive elements
    │   └── TaskSkeleton.tsx# Loading pulse blocks
    ├── hooks/              # Custom React hooks
    │   └── useTasks.ts     # Orchestrates queries/mutations to tasksService
    ├── lib/                # Shared utilities & helper libraries
    │   ├── generateClientId.ts # Cryptographic UUID generator
    │   └── queryClient.ts  # TanStack query orchestrator
    ├── store/              # Zustand global client stores
    │   └── clientStore.ts  # Client UUID initialization & storage hook
    ├── types/              # Unified TypeScript definitions
    ├── App.tsx             # Application wrapper, headers, progress, pagination
    └── main.tsx            # Core React bootstrapping with Providers
```

---

## 🔒 Client Isolation Strategy

To manage unique user tasks without forcing users to sign up:
1. `src/store/clientStore.ts` checks browser `localStorage` for `todo-client-id`.
2. If absent, `src/lib/generateClientId.ts` creates a unique standard UUIDv4.
3. This identifier is retained under Zustand store and injected automatically into every backend GET and POST request via parameters.
4. If you wish to simulate another client context, simply clear your browser's LocalStorage or open the application in an incognito window!

---

## 🔧 Setup & Local Running

### 📋 Prerequisites
Ensure you have Node.js (version 18+ recommended) and npm installed.

### 1️⃣ Set up Environment Variables
Create a `.env` file in the root of the `frontend` folder (one is pre-configured):
```env
VITE_API_URL=http://localhost:4000
```
This points the frontend app to the backend Express server.

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Launch Development Server
Start the local server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will launch at **[http://localhost:5173](http://localhost:5173)**.

### 4️⃣ Production Compilation
Compile a optimized production build of the application in the `dist` directory:
```bash
npm run build
```

To preview the compiled production build locally:
```bash
npm run preview
```

---

## 🔗 Hook Integration: `useTasks`
All server-side interactions are encapsulated in the custom hook `useTasks()`. This decouples the visual components from fetch/mutation details:

```typescript
const {
  tasks,            // Array of current page tasks
  total,            // Total tasks owned by this client
  page,             // Current active page (1-indexed)
  setPage,          // Page state modifier
  isLoading,        // Server fetching state
  isError,          // Server fetching error flag
  error,            // Axios / Query error body
  addTask,          // Mutation method: (title: string) => void
  removeTask,       // Mutation method: (id: string) => void
  toggleTask,       // Mutation method: ({ id: string, completed: boolean }) => void
  isAddingTask,     // Form spinner helper flag
  refetch           // Refresh data triggers manually
} = useTasks();
```
