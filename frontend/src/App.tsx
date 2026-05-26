import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types";
import Button from "./components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Set up project structure",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Build the API layer",
    completed: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Connect frontend to backend",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Write unit tests",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [page, setPage] = useState(1);
  const LIMIT = 5;

  const paginated = tasks.slice((page - 1) * LIMIT, page * LIMIT);
  const totalPages = Math.ceil(tasks.length / LIMIT);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id: string, completed: boolean) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t)),
    );
  };

  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">My Tasks</h1>
          <p className="text-sm text-neutral-400 mt-1">
            {completed} of {tasks.length} completed
          </p>

          {/* Progress bar */}
          <div className="mt-3 h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{
                width: tasks.length
                  ? `${(completed / tasks.length) * 100}%`
                  : "0%",
              }}
            />
          </div>
        </div>

        {/* Add Task Form */}
        <TaskForm onAdd={addTask} />

        {/* Task List */}
        <TaskList
          tasks={paginated}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 text-sm text-neutral-400">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex justify-center items-center gap-2"
              disabled={page === 1}
            >
              <ChevronLeft className="w-4 h-4" /> <span>Prev </span>
            </Button>

            <span>
              Page {page} of {totalPages}
            </span>

            <Button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex justify-center items-center gap-2"
              disabled={page === totalPages}
            >
              <span>Next </span> <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
