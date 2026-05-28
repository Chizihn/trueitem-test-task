import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskSkeleton from "./components/TaskSkeleton";
import Button from "./components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTasks } from "./hooks/useTasks";

const LIMIT = 10;

export default function App() {
  const {
    tasks,
    total,
    page,
    setPage,
    isLoading,
    isError,
    error,
    addTask,
    removeTask,
    toggleTask,
    isAddingTask,
    refetch,
  } = useTasks();

  const totalPages = Math.ceil(total / LIMIT);
  const completed = tasks.filter((t) => t.completed).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10 font-sans">
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight">My Tasks</h1>
          </div>
          <div className="mb-8">
            <div className="h-8 w-40 bg-neutral-800 rounded animate-pulse" />
            <div className="h-4 w-32 bg-neutral-800 rounded animate-pulse mt-2" />
            <div className="mt-3 h-1 w-full bg-neutral-800 rounded-full" />
          </div>
          <div className="h-11 w-full bg-neutral-900 border border-neutral-700 rounded-lg mb-6 animate-pulse" />
          <TaskSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col gap-3 items-center justify-center ">
        <p className="text-md text-red-400">
          Failed to load tasks: {error?.message ?? "Unknown error"}
        </p>

        <Button onClick={() => refetch()} className="ml-4">
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-10 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">My Tasks</h1>
          <p className="text-sm text-neutral-400 mt-1">
            {completed} of {total} completed
          </p>

          {/* Progress bar */}
          <div className="mt-3 h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-500"
              style={{
                width: total ? `${(completed / total) * 100}%` : "0%",
              }}
            />
          </div>
        </div>

        {/* Add Task Form */}
        <TaskForm onAdd={(title) => addTask(title)} disabled={isAddingTask} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onDelete={(id) => removeTask(id)}
          onToggle={(id, completed) => toggleTask({ id, completed })}
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
